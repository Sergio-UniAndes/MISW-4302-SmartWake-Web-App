import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { AssetIcon } from '../../components/AssetIcon'
import { ActionButton } from './ActionButton'
import { alarmIcons } from './alarmIcons'
import type { NextAlarm } from './mockAlarms'

type NextAlarmBannerProps = {
  alarm: NextAlarm
  onViewRoute: () => void
}

// Figma: "Highlight Banner: Next Scheduled Alarm (Predictive Route Preview)".
export function NextAlarmBanner({ alarm, onViewRoute }: NextAlarmBannerProps) {
  return (
    <Box
      component="section"
      aria-labelledby="next-alarm-title"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexWrap: { xs: 'wrap', sm: 'nowrap' },
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        px: '25px',
        py: { xs: 2, sm: '1px' },
        bgcolor: 'background.paper',
        border: 1,
        borderColor: 'divider',
        borderRadius: '16px',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -4px rgba(0, 0, 0, 0.05)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, minWidth: 0 }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            flexShrink: 0,
            display: 'grid',
            placeItems: 'center',
            bgcolor: 'tertiary.container',
            border: 1,
            borderColor: 'divider',
            borderRadius: '16px',
          }}
        >
          <AssetIcon icon={alarmIcons.commute} />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              id="next-alarm-title"
              component="h2"
              sx={{
                fontSize: 12,
                fontWeight: 600,
                lineHeight: '16px',
                letterSpacing: '0.6px',
                textTransform: 'uppercase',
                color: 'secondary.main',
              }}
            >
              Próxima alarma
            </Typography>
            {/* Live indicator; emerald is not part of the Warm Dawn palette. */}
            <Box aria-hidden sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#34D399' }} />
            <Typography sx={{ fontSize: 12, lineHeight: '16px', color: 'text.secondary' }}>{alarm.countdown}</Typography>
          </Box>
          <Typography sx={{ fontSize: 14, fontWeight: 600, lineHeight: '20px' }}>{alarm.summary}</Typography>
        </Box>
      </Box>

      <ActionButton tone="primary" icon={alarmIcons.nearMe} onClick={onViewRoute}>
        Ver ruta
        <br />
        predictiva
      </ActionButton>

      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          top: -32,
          right: -32,
          width: 160,
          height: 160,
          borderRadius: '50%',
          bgcolor: 'rgba(255, 140, 105, 0.1)',
          filter: 'blur(20px)',
          pointerEvents: 'none',
        }}
      />
    </Box>
  )
}
