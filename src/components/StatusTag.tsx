import Box from '@mui/material/Box'
import type { SxProps, Theme } from '@mui/material/styles'
import type { ReactNode } from 'react'

type StatusTagProps = {
  children: ReactNode
  sx?: SxProps<Theme>
}

/** Pill-shaped overline tag on the secondary container color. */
export function StatusTag({ children, sx }: StatusTagProps) {
  return (
    <Box
      component="span"
      sx={[
        {
          display: 'inline-flex',
          width: 'fit-content',
          px: 1.5,
          py: 0.5,
          borderRadius: '9999px',
          bgcolor: 'secondary.container',
          color: 'secondary.onContainer',
          typography: 'overline',
          whiteSpace: 'nowrap',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Box>
  )
}
