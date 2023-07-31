import React from 'react'
import { Box, Button } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { DeepPartial, FormProvider, useForm } from 'react-hook-form';

import { SearchFormSchema } from '../models/searchFormSchema';
import { SearchForm } from './SearchForm';
import { SearchFormModel } from '../models/searchForm';

type SearchViewProps = {
  defaultValues?: DeepPartial<SearchFormModel>;
}

export const SearchView: React.FC<SearchViewProps> = ({
  defaultValues
}) => {
  const navigate = useNavigate();
  const [ _, setSearchParams ] = useSearchParams();

  const form = useForm<SearchFormModel>({
    defaultValues: {
      origin: defaultValues?.origin || {},
      destinations: defaultValues?.destinations || [ {} ],
      date: defaultValues?.date || new Date().toISOString(),
      passengers: defaultValues?.passengers || 1,
    },
    resolver: yupResolver<SearchFormModel>(SearchFormSchema),
    mode: 'all',
  })
  const { handleSubmit, watch } = form;

  watch(({ date, destinations, origin, passengers }) => {
    const params = new URLSearchParams();
    if (origin?.name) {
      params.append('originName', origin.name);
    }
    if (destinations && destinations.length > 0) {
      const destinationsArray: string[] = [];
      destinations.forEach((destination) => {
        if (destination?.name) {
          destinationsArray.push(destination.name);
        }
      });
      params.append('destinations', destinationsArray.join(','));
    }
    if (date) {
      params.append('date', date);
    }
    if (passengers) {
      params.append('passengers', passengers.toString());
    }
    setSearchParams(params);
  });


  const onHandleSubmit = handleSubmit((value) => {
    const params = new URLSearchParams();
    params.append('originName', value.origin.name);
    const destinations: string[] = [];
    value.destinations.forEach((destination) => {
      if (destination.name) {
        destinations.push(destination.name);
      }
    });
    params.append('destinations', destinations.join(','));
    params.append('date', value.date);
    params.append('passengers', value.passengers.toString());
    navigate(`/search?${params.toString()}`);
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={onHandleSubmit}>
        <Box display='flex' flexDirection='column' alignItems='center' gap={2}>
          <Box width='100%'>
            <SearchForm />
          </Box>
          <Button
            type='submit'
            variant='contained'
            disabled={!form.formState.isValid}
          >
            Submit
          </Button>
        </Box>
      </form>
    </FormProvider >
  )
}