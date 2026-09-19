import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { AssetIcon } from '../../components/AssetIcon'
import type { Alarm, AlarmSchedule, TimelineSegment } from './mockAlarms'

const DAY_LABELS = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
const DAY_NAMES = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo']
const listFormat = new Intl.ListFormat('es', { type: 'conjunction' })

// Category chip colors as drawn in Figma; they are not part of the Warm Dawn token table.
const categoryChip = { bg: '#E7E4E9', border: '#3C3836', text: '#33291F' }

// Explicit px: in sx, sizes between 0 and 1 are read as percentages.
const visuallyHidden = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  p: 0,
  m: '-1px',
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
  border: 0,
} as const

type AlarmCardProps = {
  alarm: Alarm
}

// Figma: "CARD n" inside "AlarmsCardGrid" (Gestión de Alarmas).
export function AlarmCard({ alarm }: AlarmCardProps) {
  const paused = alarm.status === 'paused'
  const titleId = `alarm-${alarm.id}-title`

  return (
    <Box
      component="article"
      aria-labelledby={titleId}
      sx={{
        p: '25px',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper',
        border: 1,
        borderColor: 'divider',
        borderRadius: '24px',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.05)',
        opacity: paused ? 0.85 : 1,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1.5 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, minWidth: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
              <Typography id={titleId} component="h2" sx={{ fontSize: 16, fontWeight: 700, lineHeight: '24px' }}>
                {alarm.title}
              </Typography>
              <Box
                component="span"
                sx={{
                  px: '11px',
                  py: '3px',
                  borderRadius: '9999px',
                  border: `1px solid ${categoryChip.border}`,
                  bgcolor: categoryChip.bg,
                  color: categoryChip.text,
                  fontSize: 11,
                  fontWeight: 600,
                  lineHeight: '16.5px',
                  whiteSpace: 'nowrap',
                }}
              >
                {alarm.category}
              </Box>
            </Box>
            <Typography sx={{ fontSize: 12, lineHeight: '16px', color: 'text.secondary' }}>{alarm.description}</Typography>
          </Box>
          <StatusPill paused={paused} />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'flex-end', flexWrap: 'wrap', rowGap: 1 }}>
          <Box
            component="time"
            dateTime={to24Hour(alarm.time, alarm.period)}
            sx={{
              fontSize: 36,
              fontWeight: 700,
              lineHeight: '40px',
              letterSpacing: '-0.9px',
              color: paused ? 'text.secondary' : 'text.primary',
            }}
          >
            {alarm.time}
          </Box>
          <Box component="span" sx={{ ml: 1, fontSize: 18, fontWeight: 600, lineHeight: '28px', color: 'text.secondary' }}>
            {alarm.period}
          </Box>
          <Box
            component="span"
            sx={{
              ml: 2,
              px: '10px',
              py: 0.5,
              borderRadius: '6px',
              fontSize: 12,
              fontWeight: 500,
              lineHeight: '16px',
              bgcolor: paused ? 'tertiary.container' : 'primary.container',
              color: paused ? 'text.secondary' : 'primary.onContainer',
            }}
          >
            {alarm.timeLabel}
          </Box>
        </Box>

        <Box
          sx={{
            pt: '19px',
            pb: '15px',
            px: '15px',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            bgcolor: 'surfaceContainer',
            border: 1,
            borderColor: 'divider',
            borderRadius: '16px',
          }}
        >
          <Box
            sx={{
              px: 0.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              columnGap: 1.5,
              rowGap: 0.5,
            }}
          >
            {alarm.timeline.items.map((item) => (
              <Box
                key={item.label}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  fontSize: 12,
                  lineHeight: '16px',
                  fontWeight: item.emphasis ? 500 : 400,
                  color: item.emphasis ? 'text.primary' : 'text.secondary',
                }}
              >
                <AssetIcon icon={item.icon} />
                {item.label}
              </Box>
            ))}
          </Box>
          <Box
            aria-hidden
            sx={{
              display: 'flex',
              height: 6,
              overflow: 'hidden',
              borderRadius: '9999px',
              bgcolor: '#EEEEEE',
              opacity: paused ? 0.6 : 1,
            }}
          >
            {alarm.timeline.segments.map((segment, index) => (
              <Box key={index} sx={{ width: `${segment.percent}%`, bgcolor: segmentColor(segment, paused) }} />
            ))}
          </Box>
        </Box>

        <Box sx={{ pt: 0.5, display: 'flex', flexDirection: 'column', gap: 1 }}>
          {alarm.details.map((detail) => (
            <Box key={detail.text} sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: 12, lineHeight: '16px' }}>
              <AssetIcon icon={detail.icon} />
              <Box component="span" sx={{ minWidth: 0, color: detail.emphasis ? 'text.primary' : 'text.secondary' }}>
                {detail.text}
              </Box>
              {detail.meta && (
                <Box
                  sx={{
                    ml: 'auto',
                    pl: 2,
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2px',
                    fontSize: 11,
                    fontWeight: 500,
                    color: 'text.secondary',
                  }}
                >
                  <AssetIcon icon={detail.meta.icon} />
                  {detail.meta.text}
                </Box>
              )}
            </Box>
          ))}
        </Box>
      </Box>

      <Box sx={{ mt: 3, pt: 2, borderTop: 1, borderColor: 'divider' }}>
        <Schedule schedule={alarm.schedule} />
      </Box>
    </Box>
  )
}

function StatusPill({ paused }: { paused: boolean }) {
  return (
    <Box
      sx={{
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
        px: '11px',
        py: '5px',
        borderRadius: '9999px',
        border: 1,
        borderColor: 'divider',
        bgcolor: 'tertiary.container',
        fontSize: 11,
        fontWeight: 500,
        lineHeight: '16.5px',
        color: paused ? 'text.secondary' : 'primary.onContainer',
      }}
    >
      <Box
        aria-hidden
        sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: paused ? 'text.secondary' : 'primary.main' }}
      />
      {paused ? 'Pausada' : 'Activa'}
    </Box>
  )
}

function Schedule({ schedule }: { schedule: AlarmSchedule }) {
  if (schedule.kind === 'once') {
    return (
      <Typography sx={{ fontSize: 12, fontWeight: 500, fontStyle: 'italic', lineHeight: '16px', color: 'text.secondary' }}>
        {schedule.label}
      </Typography>
    )
  }

  const repeatText = `Se repite: ${listFormat.format(schedule.days.map((day) => DAY_NAMES[day]))}`
  return (
    <Box sx={{ display: 'flex', gap: 0.5 }}>
      <Box component="span" sx={visuallyHidden}>
        {repeatText}
      </Box>
      {DAY_LABELS.map((label, day) => {
        const on = schedule.days.includes(day)
        const primary = schedule.tone === 'primary'
        return (
          <Box
            key={day}
            aria-hidden
            sx={{
              width: 24,
              height: 24,
              display: 'grid',
              placeItems: 'center',
              borderRadius: '50%',
              fontSize: 11,
              lineHeight: '16.5px',
              fontWeight: on ? 700 : 500,
              bgcolor: on ? (primary ? 'primary.container' : 'grey.800') : 'tertiary.container',
              color: on ? (primary ? 'primary.onContainer' : 'common.white') : 'text.secondary',
            }}
          >
            {label}
          </Box>
        )
      })}
    </Box>
  )
}

function segmentColor(segment: TimelineSegment, paused: boolean) {
  switch (segment.kind) {
    case 'prep':
      return paused ? 'text.secondary' : 'primary.main'
    case 'travel':
      return 'text.secondary'
    case 'slack':
      return 'divider'
  }
}

function to24Hour(time: string, period: 'AM' | 'PM') {
  const [hours, minutes] = time.split(':').map(Number)
  const h24 = (hours % 12) + (period === 'PM' ? 12 : 0)
  return `${String(h24).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}
