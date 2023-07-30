import { FormProvider, useForm } from "react-hook-form"
import { Box, Button, Grid } from "@mui/material"
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams, useRoutes, useNavigate } from "react-router-dom";

import { SearchFormModel } from "../../models/searchForm"
import { SearchForm } from "../SearchForm"
import { SearchFormSchema } from "../../models/searchFormSchema";

import { useSearchParams } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();
  const [ searchParams, setSearchParams ] = useSearchParams();
  const form = useForm<SearchFormModel>({
    defaultValues: {
      date: new Date().toISOString(),
      passengers: 2,
      origin: {},
      destinations: [ {} ]
    },
    resolver: yupResolver<SearchFormModel>(SearchFormSchema),
    mode: 'all',
    criteriaMode: 'all'
  })
  const { handleSubmit } = form;


  const onHandleSubmit = handleSubmit((value) => {
    console.log(value);
    const params = new URLSearchParams();
    params.append('originName', value.origin.name);
    let destinations: string[] = [];
    value.destinations.forEach((destination, index) => {
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
        <Box display='flex' flexDirection='column' alignItems='center'>
          <Box width='100%'>
            <SearchForm />
          </Box>
          {JSON.stringify(form.formState.errors)}
          <Button
            type='submit'
            disabled={!form.formState.isValid}
          >
            Submit
          </Button>
        </Box>
      </form>
    </FormProvider >
  )
}
