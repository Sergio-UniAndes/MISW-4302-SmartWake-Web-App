import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import calendarIcon from '../../assets/icons/calendar.svg'
import checkCircleIcon from '../../assets/icons/check-circle.svg'
import prepSunriseIcon from '../../assets/icons/prep-sunrise.svg'
import speedIcon from '../../assets/icons/speed.svg'
import { AssetIcon, type IconAsset } from '../../components/AssetIcon'
import { StatusTag } from '../../components/StatusTag'
import { ShellTopBar } from '../../layout/ShellTopBar'

type Period = '7 días' | '30 días' | '90 días'

type Metric = {
  label: string
  value: string
  detail: string
  icon: IconAsset
  tone: 'primary' | 'secondary' | 'tertiary'
}

const metrics: Metric[] = [
  { label: 'Puntualidad', value: '92%', detail: '+8% vs. período anterior', icon: { src: checkCircleIcon, width: 14, height: 14 }, tone: 'primary' },
  { label: 'Tiempo de preparación', value: '38 min', detail: '-4 min esta semana', icon: { src: prepSunriseIcon, width: 14, height: 14 }, tone: 'secondary' },
  { label: 'Alarmas cumplidas', value: '12 de 14', detail: '2 alarmas pospuestas', icon: { src: speedIcon, width: 14, height: 14 }, tone: 'tertiary' },
]

const trend = [
  { day: 'Lun', value: 76 },
  { day: 'Mar', value: 88 },
  { day: 'Mié', value: 68 },
  { day: 'Jue', value: 94 },
  { day: 'Vie', value: 84 },
  { day: 'Sáb', value: 58 },
  { day: 'Dom', value: 92 },
]

const routines = [
  { name: 'Rutina de trabajo', days: 'Lunes a viernes', time: '38 min', completion: 94 },
  { name: 'Rutina de fin de semana', days: 'Sábados y domingos', time: '42 min', completion: 78 },
]

const metricBackgrounds = {
  primary: 'primary.container',
  secondary: 'secondary.container',
  tertiary: 'tertiary.container',
} as const

export function StatisticsPage() {
  const [period, setPeriod] = useState<Period>('7 días')

  return (
    <>
      <ShellTopBar title="Dashboard">
        <StatusTag sx={{ px: 1, fontWeight: 600 }}>Resumen de actividad</StatusTag>
      </ShellTopBar>

      <Box component="main" sx={{ flex: 1, px: { xs: 2, sm: 4, md: 6 }, pt: { xs: 3, sm: 4 }, pb: { xs: 4, sm: 6 }, display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 1200, width: '100%', boxSizing: 'border-box' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 2, flexWrap: 'wrap' }}>
          <Box>
            <Typography variant="h1" sx={{ fontSize: { xs: 28, sm: 32 }, lineHeight: '40px' }}>Estadísticas</Typography>
            <Typography sx={{ mt: 0.75, color: 'text.secondary', fontSize: 14 }}>Conoce tus hábitos de descanso y mejora tus mañanas.</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 1.5, py: 1, border: 1, borderColor: 'divider', borderRadius: 2, color: 'text.secondary' }}>
            <AssetIcon icon={{ src: calendarIcon, width: 14, height: 14 }} tinted />
            <Typography sx={{ fontSize: 13 }}>Este período</Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 0.5, p: 0.5, bgcolor: 'surfaceContainer', border: 1, borderColor: 'divider', borderRadius: 2, width: 'fit-content', maxWidth: '100%' }} aria-label="Período de estadísticas">
          {(['7 días', '30 días', '90 días'] as Period[]).map((option) => (
            <ButtonBase key={option} onClick={() => setPeriod(option)} sx={{ px: { xs: 1.5, sm: 2 }, py: 1, borderRadius: 1.5, color: period === option ? 'primary.onContainer' : 'text.secondary', bgcolor: period === option ? 'primary.container' : 'transparent', fontSize: 13, fontWeight: period === option ? 700 : 500 }}>
              {option}
            </ButtonBase>
          ))}
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 230px), 1fr))', gap: 2 }}>
          {metrics.map((metric) => (
            <Card key={metric.label}>
              <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
                  <Typography sx={{ color: 'text.secondary', fontSize: 13 }}>{metric.label}</Typography>
                  <Box sx={{ width: 36, height: 36, display: 'grid', placeItems: 'center', borderRadius: 2, bgcolor: metricBackgrounds[metric.tone] }}>
                    <AssetIcon icon={metric.icon} />
                  </Box>
                </Box>
                <Typography sx={{ mt: 1.5, fontSize: 28, lineHeight: '34px', fontWeight: 700 }}>{metric.value}</Typography>
                <Typography sx={{ mt: 0.75, fontSize: 12, color: metric.tone === 'primary' ? '#7DD3A7' : 'text.secondary' }}>{metric.detail}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.35fr) minmax(280px, 1fr)', gap: 2, alignItems: 'stretch', '@media (max-width: 760px)': { gridTemplateColumns: '1fr' } }}>
          <Card component="section" aria-labelledby="trend-title">
            <CardContent sx={{ p: { xs: 2, sm: 3 }, '&:last-child': { pb: { xs: 2, sm: 3 } } }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2 }}>
                <Box>
                  <Typography id="trend-title" variant="h2">Puntualidad semanal</Typography>
                  <Typography sx={{ mt: 0.5, color: 'text.secondary', fontSize: 13 }}>Porcentaje de alarmas atendidas a tiempo</Typography>
                </Box>
                <Typography sx={{ color: 'primary.main', fontSize: 13, fontWeight: 700 }}>92% promedio</Typography>
              </Box>
              <Box sx={{ mt: 4, height: 190, display: 'flex', alignItems: 'flex-end', gap: { xs: 1, sm: 2 }, borderBottom: 1, borderColor: 'divider' }}>
                {trend.map(({ day, value }) => (
                  <Box key={day} sx={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>{value}%</Typography>
                    <Box sx={{ width: 'min(32px, 70%)', height: `${value}%`, minHeight: 16, borderRadius: '6px 6px 0 0', bgcolor: day === 'Dom' ? 'primary.main' : 'primary.container', transition: 'height 300ms ease' }} />
                    <Typography sx={{ fontSize: 11, color: 'text.secondary', transform: 'translateY(25px)' }}>{day}</Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>

          <Card component="section" aria-labelledby="summary-title">
            <CardContent sx={{ p: { xs: 2, sm: 3 }, '&:last-child': { pb: { xs: 2, sm: 3 } } }}>
              <Typography id="summary-title" variant="h2">Tu progreso</Typography>
              <Typography sx={{ mt: 0.5, color: 'text.secondary', fontSize: 13 }}>Un vistazo a tu consistencia</Typography>
              <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ width: 92, height: 92, borderRadius: '50%', display: 'grid', placeItems: 'center', background: 'conic-gradient(#FF8C69 0 92%, #4A2012 92% 100%)', position: 'relative' }}>
                  <Box sx={{ width: 70, height: 70, borderRadius: '50%', display: 'grid', placeItems: 'center', bgcolor: 'background.paper' }}><Typography sx={{ fontWeight: 700, fontSize: 20 }}>92%</Typography></Box>
                </Box>
                <Box><Typography sx={{ fontWeight: 700 }}>¡Muy buen ritmo!</Typography><Typography sx={{ mt: 0.5, color: 'text.secondary', fontSize: 12, lineHeight: '18px' }}>Has mejorado tu puntualidad durante las últimas semanas.</Typography></Box>
              </Box>
              <Box sx={{ mt: 3, pt: 2, borderTop: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between' }}><Typography sx={{ fontSize: 13, color: 'text.secondary' }}>Mejor día</Typography><Typography sx={{ fontSize: 13, fontWeight: 700 }}>Jueves · 94%</Typography></Box>
            </CardContent>
          </Card>
        </Box>

        <Card component="section" aria-labelledby="routines-title">
          <CardContent sx={{ p: { xs: 2, sm: 3 }, '&:last-child': { pb: { xs: 2, sm: 3 } } }}>
            <Typography id="routines-title" variant="h2">Rendimiento por rutina</Typography>
            <Typography sx={{ mt: 0.5, color: 'text.secondary', fontSize: 13 }}>Cómo se comportan tus rutinas guardadas</Typography>
            <Box sx={{ mt: 2 }}>
              {routines.map((routine, index) => (
                <Box key={routine.name} sx={{ display: 'grid', gridTemplateColumns: 'minmax(150px, 1fr) 100px minmax(100px, 1.5fr)', alignItems: 'center', gap: 2, py: 1.75, borderTop: index === 0 ? 1 : 0, borderBottom: 1, borderColor: 'divider', '@media (max-width: 600px)': { gridTemplateColumns: '1fr 80px', '& .routine-progress': { gridColumn: '1 / -1' } } }}>
                  <Box><Typography sx={{ fontSize: 14, fontWeight: 600 }}>{routine.name}</Typography><Typography sx={{ mt: 0.25, fontSize: 12, color: 'text.secondary' }}>{routine.days}</Typography></Box>
                  <Typography sx={{ textAlign: 'right', fontSize: 13, color: 'text.secondary' }}>{routine.time}</Typography>
                  <Box className="routine-progress" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><Box sx={{ flex: 1, height: 8, borderRadius: 4, bgcolor: 'tertiary.container', overflow: 'hidden' }}><Box sx={{ width: `${routine.completion}%`, height: '100%', bgcolor: 'primary.main', borderRadius: 4 }} /></Box><Typography sx={{ width: 32, fontSize: 12, fontWeight: 700, textAlign: 'right' }}>{routine.completion}%</Typography></Box>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  )
}