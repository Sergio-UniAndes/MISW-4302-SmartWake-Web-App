import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useEffect } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router'
import { AssetIcon } from '../../components/AssetIcon'
import { useNotice } from '../../components/useNotice'
import { ShellTopBar } from '../../layout/ShellTopBar'
import type { NoticeState } from '../../routes'
import { ActionButton } from './ActionButton'
import { AlarmCard } from './AlarmCard'
import { AlarmFilterChips } from './AlarmFilterChips'
import { FILTER_PARAM, filterAlarms, parseAlarmFilter, type AlarmFilter } from './alarmFilters'
import { alarmIcons } from './alarmIcons'
import { alarms, nextAlarm } from './mockAlarms'
import { NextAlarmBanner } from './NextAlarmBanner'

const counts: Record<AlarmFilter, number> = {
  todas: alarms.length,
  activas: filterAlarms(alarms, 'activas').length,
  pausadas: filterAlarms(alarms, 'pausadas').length,
}

// Figma: "Gestión de Alarmas - Web (M3)" — Todas (310:1604), Activas (337:1286), Pausadas (337:1645).
export function AlarmsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const filter = parseAlarmFilter(searchParams.get(FILTER_PARAM))
  const visibleAlarms = filterAlarms(alarms, filter)

  const { show: showNotice, element: notice } = useNotice()
  const location = useLocation()
  const navigate = useNavigate()
  const arrivalNotice = (location.state as NoticeState | null)?.notice

  useEffect(() => {
    if (!arrivalNotice) return
    showNotice(arrivalNotice)
    // Clear the one-time message so it doesn't come back on reload or back navigation.
    navigate({ search: location.search }, { replace: true, state: null })
  }, [arrivalNotice, showNotice, navigate, location.search])

  const handleFilterChange = (next: AlarmFilter) => {
    setSearchParams(next === 'todas' ? {} : { [FILTER_PARAM]: next })
  }

  return (
    <>
      <ShellTopBar title="Dashboard">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            px: '13px',
            py: '5px',
            borderRadius: '9999px',
            border: 1,
            borderColor: 'divider',
            bgcolor: 'tertiary.container',
            color: 'primary.onContainer',
            fontSize: 12,
            fontWeight: 500,
            lineHeight: '16px',
            whiteSpace: 'nowrap',
          }}
        >
          <AssetIcon icon={alarmIcons.predictiveMode} />
          Modo Predictivo Activo
        </Box>
      </ShellTopBar>

      <Box
        component="main"
        sx={{
          flex: 1,
          px: { xs: 2, sm: 4 },
          pt: { xs: 2.5, sm: '28px' },
          pb: { xs: 3, sm: '60px' },
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          containerType: 'inline-size',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 3 }}>
          <Box sx={{ flex: '1 1 320px', maxWidth: 820, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Typography
              variant="h1"
              sx={{ fontSize: { xs: 26, sm: 30 }, fontWeight: 700, lineHeight: '36px', letterSpacing: '-0.75px' }}
            >
              Alarmas Guardadas
            </Typography>
            <Typography sx={{ fontSize: 14, lineHeight: '20px', color: 'text.secondary' }}>
              Consulta tus rutinas activas y tiempos calculados en tiempo real. Esta vista es de solo lectura; para
              crear, editar o ajustar tus alarmas, utiliza la app móvil de SmartWake.
            </Typography>
          </Box>
          <ActionButton
            tone="surface"
            icon={alarmIcons.tune}
            onClick={() => showNotice('Los ajustes de despertar estarán disponibles próximamente.')}
          >
            Ajustes de
            <br />
            Despertar
          </ActionButton>
        </Box>

        <AlarmFilterChips value={filter} counts={counts} onChange={handleFilterChange} />

        <NextAlarmBanner
          alarm={nextAlarm}
          onViewRoute={() => showNotice('La ruta predictiva estará disponible próximamente.')}
        />

        {visibleAlarms.length > 0 ? (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr)',
              alignItems: 'start',
              gap: '20px',
              '@container (min-width: 860px)': { gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' },
            }}
          >
            {visibleAlarms.map((alarm) => (
              <AlarmCard key={alarm.id} alarm={alarm} />
            ))}
          </Box>
        ) : (
          <Typography sx={{ py: 6, textAlign: 'center', color: 'text.secondary' }}>
            No hay alarmas en esta categoría.
          </Typography>
        )}
      </Box>

      {notice}
    </>
  )
}
