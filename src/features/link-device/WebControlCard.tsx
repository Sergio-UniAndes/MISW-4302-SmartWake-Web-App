import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import monitorIcon from '../../assets/icons/monitor.svg'

export function WebControlCard() {
  return (
    <Card
      component="section"
      aria-labelledby="web-control-title"
      sx={{ p: { xs: 3, md: 4 }, display: 'flex', flexDirection: 'column', gap: 2.5 }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            flexShrink: 0,
            display: 'grid',
            placeItems: 'center',
            borderRadius: 1.5,
            bgcolor: 'secondary.container',
          }}
        >
          <Box component="img" src={monitorIcon} alt="" sx={{ width: 24, height: 24, display: 'block' }} />
        </Box>
        <Typography id="web-control-title" variant="h2">
          Control Web Total
        </Typography>
      </Box>

      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        Configura secuencias, tiempos de preparación matutina inteligente, gestión de tiempo por medio de
        estadísticas y más opciones que mejoran tu forma de crear las alarmas, llevándote al siguiente nivel.
      </Typography>

      <Box
        sx={{
          p: 2.5,
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          bgcolor: 'surfaceContainer',
          border: 1,
          borderColor: 'divider',
          borderRadius: 1.5,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 8, height: 8, flexShrink: 0, borderRadius: '4px', bgcolor: 'primary.main' }} />
          <Typography variant="subtitle2">Sincronización en segundo plano activa</Typography>
        </Box>
        <Divider />
        <Box aria-hidden sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
          <Box sx={{ width: 120, height: 6, borderRadius: '3px', bgcolor: 'divider', opacity: 0.4 }} />
          <Box sx={{ width: 200, maxWidth: '100%', height: 6, borderRadius: '3px', bgcolor: 'divider', opacity: 0.2 }} />
        </Box>
      </Box>
    </Card>
  )
}
