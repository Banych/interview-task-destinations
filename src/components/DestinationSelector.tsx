import React, { useCallback } from 'react'
import { TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent } from '@mui/lab';
import { Box, Tooltip, IconButton, Button, useTheme } from '@mui/material';
import { useFormContext, useFieldArray, Controller } from 'react-hook-form';
import PlaceIcon from '@mui/icons-material/Place';
import CircleIcon from '@mui/icons-material/CircleOutlined';
import PlusIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveIcon from '@mui/icons-material/CancelOutlined';

import { SearchFormModel } from '../models/searchForm';
import { CityAutocomplete } from './CityAutocomplete';
import { Timeline } from './common/Timeline';

export const DestinationSelector = () => {
  const theme = useTheme();
  const { control, trigger } = useFormContext<SearchFormModel>();
  const {
    fields: destinations,
    append,
    remove,
  } = useFieldArray({
    name: 'destinations',
    control,
  });

  const onClickAddDestination = useCallback(() => {
    append({});
  }, [ append ]);

  const onClickRemoveDestination = useCallback((index: number) => {
    remove(index);
  }, [ remove ]);

  return (
    <Box display='flex' flexDirection='column'>
      <Timeline>
        <TimelineItem key='origin'>
          <TimelineSeparator>
            <TimelineConnector />
            <CircleIcon style={{ fill: theme.palette.primary.main }} />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Box pr={5}>
              <Controller
                name="origin"
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <CityAutocomplete
                    label="City of origin"
                    onItemChange={(item) => {
                      onChange(item);
                      trigger('origin');
                    }}
                    value={value}
                    error={!!error?.message}
                    helperText={error?.message}
                  />
                )}
              />
            </Box>
          </TimelineContent>
        </TimelineItem>
        {destinations.map((destination, index) => (
          <TimelineItem
            key={destination.id}
          >
            <TimelineSeparator>
              <TimelineConnector />
              {index === destinations.length - 1
                ? <PlaceIcon style={{ fill: theme.palette.error.main }} />
                : <CircleIcon style={{ fill: theme.palette.primary.main }} />
              }
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Box display='flex' alignItems='center' width='100%'>
                <Controller
                  name={`destinations.${index}`}
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <CityAutocomplete
                      label="City of destination"
                      onItemChange={(item) => {
                        onChange(item);
                        trigger('destinations');
                      }}
                      value={value}
                      error={!!error?.message}
                      helperText={error?.message}
                      fullWidth
                    />
                  )}
                />
                <Tooltip title={
                  destinations.length === 1 && index === 0
                    ? 'You cannot remove the only destination'
                    : 'Remove destination'
                }>
                  <span>
                    <IconButton
                      onClick={() => onClickRemoveDestination(index)}
                      disabled={destinations.length === 1 && index === 0}
                    >
                      <RemoveIcon />
                    </IconButton>
                  </span>
                </Tooltip>
              </Box>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline >
      <Box
        display='flex'
        alignItems='center'
        justifyContent='start'
        gap={1}
        pl={1}
      >
        <IconButton onClick={onClickAddDestination}>
          <PlusIcon style={{ fill: theme.palette.primary.main }} />
        </IconButton>
        <Button onClick={onClickAddDestination}>
          Add destination
        </Button>
      </Box>
    </Box >
  )
}
