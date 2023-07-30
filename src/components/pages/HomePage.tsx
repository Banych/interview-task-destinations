import { useEffect, useState } from "react";
import { Typography } from "@mui/material"
import { useSearchParams } from "react-router-dom";
import { DeepPartial } from "react-hook-form"

import { fetch, fetchCitiesByNames } from "../../fakeApi";
import { SearchFormModel } from "../../models/searchForm"
import { SearchView } from "../SearchView";

export const HomePage = () => {
  const [ searchParams ] = useSearchParams();
  const [ defaultValues, setDefaultValues ] = useState<DeepPartial<SearchFormModel>>({});
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    const originName = searchParams.get('originName');
    const destinations = searchParams.get('destinations')?.split(',');
    const date = searchParams.get('date');
    const passengers = searchParams.get('passengers');

    const originPromise = originName ? fetch(originName) : Promise.resolve([]);
    const destinationsPromise = destinations && destinations.length > 0 ? fetchCitiesByNames(destinations) : Promise.resolve([]);
    const datePromise = date ? Promise.resolve(date) : Promise.resolve(undefined);
    const passengersPromise = passengers && !isNaN(Number(passengers))
      ? Promise.resolve(Number(passengers))
      : Promise.resolve(undefined);

    Promise.allSettled([
      originPromise,
      destinationsPromise,
      datePromise,
      passengersPromise,
    ])
      .then(([ origin, destinations, date, passengers ]) => {
        const values: DeepPartial<SearchFormModel> = {};
        if (origin.status === 'fulfilled') {
          values.origin = origin.value[ 0 ];
        }
        if (destinations.status === 'fulfilled') {
          values.destinations = destinations.value;
        }
        if (date.status === 'fulfilled') {
          values.date = date.value;
        }
        if (passengers.status === 'fulfilled') {
          values.passengers = passengers.value;
        }
        setDefaultValues(values);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [])

  return (
    isLoading ? (
      <Typography variant="h6" textAlign='center'>Loading...</Typography>
    ) : (
      <SearchView defaultValues={defaultValues} />
    )
  )
}
