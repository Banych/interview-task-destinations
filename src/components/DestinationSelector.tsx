import React, { useCallback } from 'react'
import { Timeline, timelineItemClasses, timelineConnectorClasses, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, timelineClasses } from "@mui/lab";
import { Box, Tooltip, IconButton, Button, useTheme } from "@mui/material";
import { useFormContext, useFieldArray, Controller, useController } from "react-hook-form";
import PlaceIcon from '@mui/icons-material/Place';
import CircleIcon from '@mui/icons-material/CircleOutlined';
import PlusIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveIcon from '@mui/icons-material/CancelOutlined';

import { SearchFormModel } from "../models/searchForm";
import { CityAutocomplete } from "./CityAutocomplete";

export const DestinationSelector = () => {
  const theme = useTheme();
  const { control } = useFormContext<SearchFormModel>();
  const {
    fields: destinations,
    append,
    remove,
  } = useFieldArray({
    name: 'destinations',
    control,
  });

  const { fieldState: { error } } = useController({ control, name: 'destinations' })

  const onClickAddDestination = useCallback(() => {
    append({ lat: 0, lon: 0, name: '' })
  }, [ append ]);

  const onClickRemoveDestination = useCallback(
    (index: number) => () => remove(index),
    [ remove ]
  );

  return (
    <Box display='flex' flexDirection='column'>
      <Timeline
        sx={{
          [ `&.${timelineClasses.root}` ]: {
            margin: 0,
            paddingY: 0,
          },
          [ `& .${timelineItemClasses.missingOppositeContent}::before` ]: {
            flex: 0,
            padding: 0,
          },
          [ `& .${timelineConnectorClasses.root}` ]: {
            background: 'radial-gradient(ellipse at center, #b9b9b9 0%, #b9b9b9 30%, transparent 30%)',
            backgroundRepeat: 'repeat-y',
            backgroundPosition: 'center',
            backgroundSize: '15px 15px',
            width: '15px',
          },
          [ `& .${timelineItemClasses.root}:first-of-type .${timelineConnectorClasses.root}:first-of-type` ]: {
            opacity: 0,
          },
          [ `& .${timelineItemClasses.root}:last-child .${timelineConnectorClasses.root}:last-child` ]: {
            opacity: 0,
          }
        }}
      >
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
                    onItemChange={onChange}
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
              <PlaceIcon style={{ fill: theme.palette.error.main }} />
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
                      onItemChange={onChange}
                      value={value}
                      error={!!error?.message}
                      helperText={error?.message}
                      fullWidth
                    />
                  )}
                />
                <Tooltip title='Remove destination'>
                  <IconButton onClick={onClickRemoveDestination(index)}>
                    <RemoveIcon />
                  </IconButton>
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
        {error?.message && (
          <Box color={theme.palette.error.main}>
            {error.message}
          </Box>
        )}
        <IconButton onClick={onClickAddDestination}>
          <PlusIcon style={{ fill: theme.palette.primary.main }} />
        </IconButton>
        <Button onClick={onClickAddDestination}>
          Add destination
        </Button>
      </Box>
    </Box>
  )
}
