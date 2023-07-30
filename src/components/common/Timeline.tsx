import React, { PropsWithChildren, forwardRef } from 'react';
import {
  Timeline as MuiTimeline,
  TimelineProps as MuiTimelineProps,
  timelineClasses,
  timelineConnectorClasses,
  timelineItemClasses
} from "@mui/lab";

type TimelineProps = PropsWithChildren<MuiTimelineProps>;

export const Timeline = forwardRef<HTMLUListElement, TimelineProps>(({
  children,
  sx,
  ...props
}, ref) => {
  return (
    <MuiTimeline
      {...props}
      ref={ref}
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
        },
        ...sx,
      }}
    >
      {children}
    </MuiTimeline>
  )
})