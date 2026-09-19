import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import { hoverLayer } from '../../theme'
import { alarmFilters, type AlarmFilter } from './alarmFilters'

type AlarmFilterChipsProps = {
  value: AlarmFilter
  counts: Record<AlarmFilter, number>
  onChange: (filter: AlarmFilter) => void
}

// Figma: "M3 Filter Chips Row". Each chip switches between the Todas / Activas / Pausadas frames.
export function AlarmFilterChips({ value, counts, onChange }: AlarmFilterChipsProps) {
  return (
    <Box
      role="group"
      aria-label="Filtrar alarmas por estado"
      sx={{ display: 'flex', gap: '10px', overflowX: 'auto', pb: 0.5 }}
    >
      {alarmFilters.map((filter) => {
        const selected = filter.value === value
        return (
          <ButtonBase
            key={filter.value}
            aria-pressed={selected}
            onClick={() => onChange(filter.value)}
            sx={{
              flexShrink: 0,
              gap: '6px',
              px: '15px',
              py: '6px',
              borderRadius: '9999px',
              border: 1,
              fontSize: 12,
              lineHeight: '16px',
              '&:hover': { backgroundImage: hoverLayer },
              ...(selected
                ? {
                    bgcolor: 'primary.container',
                    borderColor: 'primary.container',
                    color: 'primary.onContainer',
                    fontWeight: 600,
                    boxShadow: '0 1px 1px rgba(0, 0, 0, 0.05)',
                  }
                : {
                    bgcolor: 'tertiary.container',
                    borderColor: 'divider',
                    color: 'text.primary',
                    fontWeight: 500,
                  }),
            }}
          >
            {filter.label}
            <Box
              component="span"
              sx={{
                px: '6px',
                py: '2px',
                borderRadius: '9999px',
                fontSize: 10,
                lineHeight: '16px',
                bgcolor: selected ? 'rgba(255, 236, 229, 0.1)' : 'tertiary.container',
              }}
            >
              {counts[filter.value]}
            </Box>
          </ButtonBase>
        )
      })}
    </Box>
  )
}
