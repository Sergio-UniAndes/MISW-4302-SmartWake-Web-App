import Box from '@mui/material/Box'
import logo from '../assets/logo-smartwake.png'
import { StatusTag } from './StatusTag'

type TopBarProps = {
  statusLabel: string
}

export function TopBar({ statusLabel }: TopBarProps) {
  return (
    <Box
      component="header"
      sx={{
        height: 64,
        flexShrink: 0,
        px: { xs: 2, sm: 4 },
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        bgcolor: 'surfaceContainer',
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Box
        component="img"
        src={logo}
        alt="SmartWake"
        sx={{ width: 48, height: 47, objectFit: 'cover', display: 'block' }}
      />
      <StatusTag sx={{ px: 1, fontWeight: 600 }}>{statusLabel}</StatusTag>
    </Box>
  )
}
