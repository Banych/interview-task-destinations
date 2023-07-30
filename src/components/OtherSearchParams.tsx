import React from 'react'
import { Box, Grid, useTheme } from "@mui/material"
import { NumberInput } from "./NumberInput"
import { Controller, useFormContext } from "react-hook-form"
import { SearchFormModel } from "../models/searchForm"
import { Calendar } from "./Calendar"

export const OtherSearchParams = () => {
  const { control } = useFormContext<SearchFormModel>();

  return (
    <Grid
      container
      spacing={2}
      pt={'6px'}
      sx={(theme) => ({
        [ theme.breakpoints.down('md') ]: {
          paddingLeft: 7,
          paddingRight: 9,
        },
      })}
    >
      <Grid item xs={6} md={12}>
        <Controller
          name='passengers'
          control={control}
          render={({ field, fieldState: { invalid, error } }) => (
            <NumberInput
              {...field}
              label='Passengers'
              error={invalid}
              helperText={error?.message}
            />
          )}
        />
      </Grid>
      <Grid item xs={6} md={12}>
        <Controller
          name='date'
          control={control}
          render={({ field, fieldState: { invalid, error } }) => (
            <Calendar
              {...field}
              label='Date'
              textFieldProps={{
                error: invalid,
                helperText: error?.message,
              }}
            />
          )}
        />
      </Grid>
    </Grid >
  )
}
