import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Footer } from '../../components/Footer'
import { StatusTag } from '../../components/StatusTag'
import { TopBar } from '../../components/TopBar'
import { LinkSetupCard } from './LinkSetupCard'
import { WebControlCard } from './WebControlCard'

// Figma: Web Mockups › "Vista Vincular Dispositivo" (node 310:915)
export function LinkDevicePage() {
  return (
    <Box sx={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      <TopBar statusLabel="Modo vinculación activo" />

      <Box
        component="main"
        sx={{ flex: 1, p: { xs: 2, sm: 4, md: 6 }, display: 'flex', flexDirection: 'column', gap: 4 }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <StatusTag>Sincronización web</StatusTag>
          <Typography variant="h1">Vincular Dispositivo</Typography>
          <Typography sx={{ maxWidth: 800, color: 'text.secondary' }}>
            Conecta tu teléfono inteligente para habilitar la predicción de tráfico en tiempo real y sincronización
            bidireccional entre tus rutinas.
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
            alignItems: 'start',
            gap: { xs: 3, md: 4 },
          }}
        >
          <WebControlCard />
          <LinkSetupCard />
        </Box>
      </Box>

      <Footer />
    </Box>
  )
}
