import React, { useCallback } from 'react'
import { Controller, useFormContext, useFieldArray } from "react-hook-form"
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator, timelineConnectorClasses, timelineItemClasses, timelineOppositeContentClasses } from '@mui/lab';
import { Button, Box, IconButton, useTheme, Tooltip, Grid } from '@mui/material';

import { CityAutocomplete } from "./CityAutocomplete"
import { SearchFormModel } from "../models/searchForm";
import { DestinationSelector } from "./DestinationSelector";
import { OtherSearchParams } from "./OtherSearchParams";

export const SearchForm = () => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={9}>
        <DestinationSelector />
      </Grid>
      <Grid item xs={12} md={3}>
        <OtherSearchParams />
      </Grid>
    </Grid>
  )
}
