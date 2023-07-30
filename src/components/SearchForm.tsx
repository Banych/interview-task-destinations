import { Grid } from '@mui/material';

import { DestinationSelector } from "./DestinationSelector";
import { OtherSearchParams } from "./OtherSearchParams";

export const SearchForm = () => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={8}>
        <DestinationSelector />
      </Grid>
      <Grid item xs={12} md={4}>
        <OtherSearchParams />
      </Grid>
    </Grid>
  )
}
