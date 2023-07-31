import React, { forwardRef } from 'react'
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers'
import { TextFieldProps, textFieldClasses } from '@mui/material'

type CalendarProps = DatePickerProps<Date> & {
  textFieldProps?: TextFieldProps;
}

const Calendar = forwardRef<HTMLDivElement, CalendarProps>(({
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
          fullWidth: true,
          sx: {
            [ `&.${textFieldClasses.root}` ]: {
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

Calendar.displayName = 'Calendar';

export {
  Calendar
}