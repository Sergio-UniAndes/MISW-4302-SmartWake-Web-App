import Box from '@mui/material/Box'
import type { ReactNode } from 'react'

type ShellTopBarProps = {
  title: string
  /** Extra content shown next to the title, such as a status pill. */
  children?: ReactNode
}

export function ShellTopBar({ title, children }: ShellTopBarProps) {
  return (
    <Box
      component="header"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 'appBar',
        height: 64,
        flexShrink: 0,
        px: { xs: 2, sm: 4 },
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        bgcolor: 'surfaceContainer',
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      {/* 18px bold, as in the design-system screens (Vista Gestión de Tareas). */}
      <Box component="p" sx={{ m: 0, fontSize: 18, fontWeight: 700, lineHeight: 'normal', whiteSpace: 'nowrap' }}>
        {title}
      </Box>
      {children}
    </Box>
  )
}
