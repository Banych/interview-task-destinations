import React, { forwardRef, useCallback } from 'react'
import { TextField, IconButton, TextFieldProps, textFieldClasses } from '@mui/material'
import MinusIcon from '@mui/icons-material/Remove';
import PlusIcon from '@mui/icons-material/Add';

type NumberInputProps = TextFieldProps;

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(({
  ...props
}, ref) => {
  const { onChange } = props;

  const onClickMinus = useCallback(() => {
    if (onChange) {
      onChange({
        target: {
          value: Number(props.value) - 1,
        }
      } as any);
    }
  }, [ onChange, props.value ]);

  const onClickPlus = useCallback(() => {
    if (onChange) {
      onChange({
        target: {
          value: Number(props.value) + 1,
        }
      } as any);
    }
  }, [ onChange, props.value ]);

  return (
    <TextField
      {...props}
      ref={ref}
      fullWidth
      variant='outlined'
      label='Passengers'
      type='number'
      sx={{
        [ `&.${textFieldClasses.root}` ]: {
          minWidth: 150,
          maxWidth: 250,
          '& input[type=number]': {
            textAlign: 'center',
          }
        },
      }}
      InputProps={{
        startAdornment: (
          <IconButton
            onClick={onClickMinus}
            disabled={Number(props.value) === 0}
          >
            <MinusIcon />
          </IconButton>
        ),
        endAdornment: (
          <IconButton
            onClick={onClickPlus}
            disabled={Number(props.value) === 30}
          >
            <PlusIcon />
          </IconButton>
        ),
      }}
    />
  )
});

NumberInput.displayName = 'NumberInput';

export {
  NumberInput
}