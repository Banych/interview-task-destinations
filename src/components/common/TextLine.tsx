import { Typography } from '@mui/material';
import React from 'react'

type TextLineProps = {
  coloredText: string;
  text?: string;
  color?: string;
}

export const TextLine: React.FC<TextLineProps> = ({
  coloredText,
  text,
  color,
}) => {
  return (
    <Typography variant='body1'>
      <Typography
        variant='caption'
        color={color}
        fontSize='1rem'
        fontWeight={600}
      >
        {coloredText}
      </Typography> {text}
    </Typography>
  )
}
