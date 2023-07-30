import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Autocomplete, Skeleton, TextField, TextFieldProps } from "@mui/material"
import { CityType } from "../models/CityType"
import { fetch } from "../fakeApi";
import { debounce } from "lodash";

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

  const onChange = useCallback((event: React.SyntheticEvent<Element, Event>, value: Partial<CityType> | string | null) => {
    onItemChange && typeof value !== 'string' && onItemChange(value)
  }, [ onItemChange ]);

  const onInputChange = useCallback((event: React.SyntheticEvent<Element, Event>, value: string) => {
    setSearch(value);
    setItems([]);
    setIsLoading(true);
  }, []);

  const debounced = useMemo(() => debounce(async () => {
    const result = await fetch(search);
    setIsLoading(false);
    setItems(result)
  }, 300), [ search ])

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
            ((items.length === 0 && search.length > 0 && !isLoading) || error)
              ? helperText
              : label
          }
          fullWidth
          error={(items.length === 0 && search.length > 0 && !isLoading) || error}
        />
      }
    />
  )
}
