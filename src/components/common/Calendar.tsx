import React, { forwardRef } from 'react'
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers"
import { TextFieldProps, textFieldClasses } from "@mui/material"

type CalendarProps = DatePickerProps<Date> & {
  textFieldProps?: TextFieldProps;
}

export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(({
  textFieldProps,
  ...props
}, ref) => {
  return (
    <DatePicker
      {...props}
      ref={ref}
      disablePast

      slotProps={{
        textField: {
          ...textFieldProps,
          sx: {
            [ `&.${textFieldClasses.root}` ]: {
              maxWidth: 250,
              minWidth: 150,
              '& input': {
                textAlign: 'center',
              },
            },
            ...textFieldProps?.sx,
          },
        }
      }}
    />
  )
})
