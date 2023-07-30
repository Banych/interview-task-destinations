import React, { useEffect, useMemo } from 'react'
import { useSearchParams } from "react-router-dom";
import { useLocation, useParams } from "react-router";
import { fetchCitiesByNames } from "../../fakeApi";
import { CityType } from "../../models/CityType";
import { calculateDistanceBetweenCities } from "../../utils";

export const SearchPage = () => {
  const [ searchParams ] = useSearchParams();
  const [ citiesData, setCitiesData ] = React.useState<CityType[]>([]);
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
      !!config.passengers;
  }, [ config ]);

  const calculatedDestinations = useMemo(() => {
    if (isSearchParamsValid && citiesData.length > 0) {
      return calculateDistanceBetweenCities(citiesData);
    }
    return [];
  }, [ citiesData, isSearchParamsValid ]);

  useEffect(() => {
    (async () => {
      if (isSearchParamsValid && config.destinations && config.originName) {
        const citiesData = await fetchCitiesByNames([ config.originName, ...config.destinations ]);
        setCitiesData(citiesData);
      }
    })();
  }, [ config.destinations, config.originName, isSearchParamsValid ]);

  return (
    <div>
      SearchPage
      <br />
      {isSearchParamsValid ? 'valid' : 'invalid'}
      <br />
      {JSON.stringify(config)}
      <br />
      {JSON.stringify(citiesData)}
      <br />
      {JSON.stringify(calculatedDestinations)}
    </div>
  )
}
