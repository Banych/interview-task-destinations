import React, { ChangeEvent, ForwardedRef, ReactNode, forwardRef, useCallback, useEffect, useState } from 'react'
import { Input, InputProps } from "./Input"
import { cn } from "../utils";

type AutocompleteProps<T> = Omit<InputProps, 'onLoad'> & {
  onClickItem?: (value: T) => void;
  onLoad: (value: string) => Promise<T[]>;
  getLabel: (item: T) => ReactNode;
  getKey: (item: T) => string;
}

export const Autocomplete = <T,>({
  onClickItem,
  onLoad,
  getLabel,
  getKey,
  ...props
}: AutocompleteProps<T>) => {
  const [ search, setSearch ] = useState('');
  const [ items, setItems ] = useState<T[]>([]);
  const [ isLoading, setIsLoading ] = useState(false)

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      console.log("load items for ", search);
      setIsLoading(true);
      const results = await onLoad(search);
      setIsLoading(false);
      setItems(results)
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [ search, setSearch, onLoad ]);

  const onItemChange = useCallback((item: T) => {
    setSearch(getLabel(item) as string);
    onClickItem && onClickItem(item);
  }, [ getLabel, onClickItem, setSearch ])

  const onInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  }, [ setSearch ])

  return (
    <div className="flex flex-col gap-2 relative group">
      <Input
        {...props}
        className=""
        value={search}
        onChange={onInputChange}
      />
      <div className="bg-white border border-purple-200 p-2 rounded-md flex flex-col gap-[6.5px] absolute bottom-[-8px] ">
        {isLoading && <div>Loading...</div>}
        {!!items.length && (
          items.map(item => (
            <div
              key={getKey(item)}
              onClick={() => onItemChange(item)}
              className={cn(
                isLoading && 'bg-cyan-100 rounded-s',
                'hover:bg-purple-200'
              )}
            >
              {getLabel(item)}
            </div>
          ))
        )}
      </div>
    </div>
  )
};