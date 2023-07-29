import { FormProvider, useForm } from "react-hook-form"
import { Box, Button, Grid } from "@mui/material"
import { yupResolver } from '@hookform/resolvers/yup';

import { SearchFormModel } from "../../models/searchForm"
import { SearchForm } from "../SearchForm"
import { SearchFormSchema } from "../../models/searchFormValidationModel";

export const HomePage = () => {
  const form = useForm<SearchFormModel>({
    defaultValues: {
      // date: new Date(),
      // passengers: 2,
      origin: {},
      destinations: [ {} ]
    },
    resolver: yupResolver(SearchFormSchema),
    mode: 'all',
    criteriaMode: 'all'
  })
  const { handleSubmit } = form;

  const onHandleSubmit = handleSubmit((value) => {
    console.log(value);
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={onHandleSubmit}>
        <Box display='flex' flexDirection='column' alignItems='center'>
          <Box width='100%'>
            <SearchForm />
          </Box>
          <Button
            type='submit'
          // disabled={!form.formState.isValid}
          >
            Submit
          </Button>
        </Box>
      </form>
    </FormProvider >
  )
}