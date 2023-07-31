import React, { useCallback, useEffect, useMemo } from 'react'
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { format } from "date-fns";

import { calculateDistances, fetch } from "../../fakeApi";
import { CityType } from "../../models/CityType";
import { CalculatedDestinations } from "../CalculatedDestinations";
import { TextLine } from "../common/TextLine";
import { CalculationResultsType } from "../../models/CalculationResults";

export const SearchPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [ searchParams ] = useSearchParams();
  const [ citiesData, setCitiesData ] = React.useState<CityType[]>([]);
  const [ calculatedDestinations, setCalculatedDestinations ] = React.useState<CalculationResultsType[]>([]);
  const [ error, setError ] = React.useState<string | null>(null);
  const config = useMemo(() => {
    const originName = searchParams.get('originName');
    const destinations = searchParams.get('destinations')?.split(',');
    const date = searchParams.get('date');
    const passengers = searchParams.get('passengers');

    return {
      originName,
      destinations,
      date,
      passengers
    }
  }, [ searchParams ]);

  const isSearchParamsValid = useMemo(() => {
    return !!config.originName &&
      !!config.destinations &&
      config.destinations.length > 0 &&
      !!config.date &&
      !!config.passengers &&
      !error;
  }, [ config.date, config.destinations, config.originName, config.passengers, error ]);

  const date = useMemo(() => {
    if (config.date) {
      const date = new Date(config.date);
      return format(date, 'MMM d, yyyy');
    }
    return '';
  }, [ config.date ]);

  const totalDistance = useMemo(() => {
    return (
      calculatedDestinations
        .reduce((acc, curr) =>
          acc + curr.distanceToNextCity,
          0
        ) / 1000
    ).toFixed(2) + ' km';
  }, [ calculatedDestinations ]);

  useEffect(() => {
    (async () => {
      if (isSearchParamsValid && config.destinations && config.originName) {
        const promises: Promise<CityType[]>[] = [ fetch(config.originName) ];
        config.destinations.forEach((destination) => {
          promises.push(fetch(destination));
        });
        const citiesData = await Promise.allSettled(promises);
        if (citiesData.some((cityData) => cityData.status === 'rejected')) {
          setError('Invalid search params');
          return;
        }
        const cities: CityType[] = [];
        citiesData.forEach((cityData) => {
          if (cityData.status === 'fulfilled' && cityData.value.length > 0) {
            cities.push(cityData.value[ 0 ]);
          }
        });
        setCitiesData(cities);
      }
    })();
  }, [ config.destinations, config.originName, isSearchParamsValid ]);

  useEffect(() => {
    (async () => {
      if (isSearchParamsValid && citiesData.length > 0) {
        const distances = await calculateDistances(citiesData)
        setCalculatedDestinations(distances);
      }
    })();
  }, [ citiesData, isSearchParamsValid ]);

  const onClickBackButton = useCallback(() => {
    navigate(-1);
  }, [ navigate ])

  return (
    <Box display='flex' flexDirection='column' gap={5}>
      {isSearchParamsValid ? (
        <Box
          display='flex'
          flexDirection='column'
          gap={2}
        >
          {citiesData.length > 0 && calculatedDestinations.length > 0 ? (
            <>
              <CalculatedDestinations distances={calculatedDestinations} />
              <Box
                display='flex'
                flexDirection='column'
                alignItems='center'
                gap={2}
              >
                <TextLine
                  coloredText={totalDistance}
                  color={theme.palette.primary.light}
                  text='is the total distance'
                />
                <TextLine
                  coloredText={config.passengers || ''}
                  color={theme.palette.primary.light}
                  text='passengers'
                />
                <TextLine
                  coloredText={date}
                  color={theme.palette.primary.light}
                />
              </Box>
            </>
          ) : (
            <Typography variant='h4' textAlign='center'>
              Loading data...
            </Typography>
          )}
        </Box>
      ) : (
        <Typography variant='h4' textAlign='center'>
          Invalid search params
        </Typography>
      )}
      <Box display='flex' justifyContent='center'>
        <Button
          variant='contained'
          onClick={onClickBackButton}
        >
          Back
        </Button>
      </Box>
    </Box>
  )
}
