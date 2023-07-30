import React from 'react'
import { Box } from "@mui/material"
import { NumberInput } from "./NumberInput"
import { Controller, useFormContext } from "react-hook-form"
import { SearchFormModel } from "../models/searchForm"

export const OtherSearchParams = () => {
  const { control } = useFormContext<SearchFormModel>();



  return (
    <Box>
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
    </Box>
  )
}
