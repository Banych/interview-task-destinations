import React from 'react';
import { CalculationResultsType } from "../models/CalculationResults";
import { Timeline } from "./common/Timeline";
import { TimelineConnector, TimelineContent, TimelineItem, TimelineOppositeContent, TimelineSeparator } from "@mui/lab";
import { Box, Chip, useTheme } from "@mui/material";
import PlaceIcon from '@mui/icons-material/Place';
import CircleIcon from '@mui/icons-material/CircleOutlined';

type CalculatedDestinationsProps = {
  distances: CalculationResultsType[];
}

export const CalculatedDestinations: React.FC<CalculatedDestinationsProps> = ({
  distances
}) => {
  const theme = useTheme();
  return (
    <Timeline>
      {distances.map((destination, index) => (
        <TimelineItem key={destination.city.name}>
          <TimelineOppositeContent
            display='flex'
            alignItems='center'
            justifyContent='end'
          >
            {destination.distanceToNextCity > 0 && (
              <Chip
                label={`${(destination.distanceToNextCity / 1000).toFixed(2)} km`}
                color='primary'
                size='small'
                sx={{
                  marginBottom: -8.5,
                }}
              />
            )}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            {index === distances.length - 1
              ? <PlaceIcon style={{ fill: theme.palette.error.main }} />
              : <CircleIcon style={{ fill: theme.palette.primary.main }} />
            }
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Box
              display='flex'
              alignItems='center'
              justifyContent='start'
              height='100%'
              width='100%'
            >
              {destination.city.name}
            </Box>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  )
}
