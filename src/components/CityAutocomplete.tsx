import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Autocomplete, Skeleton, TextField, TextFieldProps } from "@mui/material"
import { debounce } from "lodash";

import { fetch } from "../fakeApi";
import { CityType } from "../models/CityType"

type CityAutocompleteProps = Omit<TextFieldProps, 'defaultValue' | 'value'> & {
  defaultValue?: Partial<CityType>;
  value?: Partial<CityType>;
  onItemChange?: (item: Partial<CityType> | null) => void;
}

export const CityAutocomplete: React.FC<CityAutocompleteProps> = ({
  onItemChange,
  defaultValue,
  value,
  label,
  error,
  helperText,
  ...props
}) => {
  const [ search, setSearch ] = useState('');
  const [ items, setItems ] = useState<CityType[]>([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ innerError, setInnerError ] = useState(false);
  const [ innerHelperText, setInnerHelperText ] = useState('');

  const onChange = useCallback((event: React.SyntheticEvent<Element, Event>, value: Partial<CityType> | string | null) => {
    onItemChange && typeof value !== 'string' && onItemChange(value)
  }, [ onItemChange ]);

  const onInputChange = useCallback((event: React.SyntheticEvent<Element, Event>, value: string) => {
    setSearch(value);
    setItems([]);
    setIsLoading(true);
  }, []);

  const onBlur = useCallback(() => {
    setInnerError(false);
    setInnerHelperText('');
  }, []);

  const debounced = useMemo(() => debounce(async () => {
    try {
      const result = await fetch(search);
      setItems(result)
    } catch (e: any) {
      setInnerError(true);
      setInnerHelperText(e);
      console.log(e);
    }
    finally {
      setIsLoading(false);
    }
  }, 300), [ search ])

  const errorMessages = useMemo(() => {
    switch (true) {
      case error && !innerError:
        return helperText;
      case !error && innerError:
        return innerHelperText;
      case error && innerError:
        return `${helperText} ${innerHelperText}`;
      default:
        return '';
    }
  }, [ error, helperText, innerError, innerHelperText ]);

  useEffect(() => {
    debounced()
    return () => debounced.cancel();
  }, [ debounced, search ]);

  return (
    <Autocomplete
      fullWidth
      filterSelectedOptions
      freeSolo
      loading={isLoading}
      options={items}
      value={value}
      inputValue={search}
      noOptionsText='No cities found'
      onInputChange={onInputChange}
      onChange={onChange}
      clearOnBlur
      onBlur={onBlur}
      isOptionEqualToValue={
        (option, value) =>
          !!option && !!value && option.name === value.name
      }
      loadingText={
        Array.from(Array(5).keys()).map((item) => (
          <Skeleton variant="text" key={item} />
        ))
      }
      filterOptions={(item) => item}
      getOptionLabel={(item) => (typeof item !== 'string' && item?.name) || ''}
      renderInput={(params) =>
        <TextField
          {...props}
          {...params}
          label={
            (!isLoading && (error || innerError))
              ? errorMessages
              : label
          }
          fullWidth
          error={!isLoading && (error || innerError)}
        />
      }
    />
  )
}
