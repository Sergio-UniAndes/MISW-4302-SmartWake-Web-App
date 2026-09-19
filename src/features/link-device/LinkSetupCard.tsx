import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { PairingForm } from './PairingForm'

const steps = [
  'Abre la app SmartWake en tu teléfono móvil.',
  'Ve a Ajustes > Dispositivos Web y copia tu código de vinculación (ej. ID: SW-4829).',
  'Pega el código de 6 caracteres abajo para emparejar tu sesión web al instante.',
]

export function LinkSetupCard() {
  return (
    <Card
      component="section"
      aria-labelledby="link-setup-title"
      sx={{ p: { xs: 3, md: 4 }, display: 'flex', flexDirection: 'column', gap: 3 }}
    >
      <div>
        <Typography id="link-setup-title" variant="h2">
          Cómo vincular tu móvil
        </Typography>
        <Typography variant="caption" component="p" sx={{ mt: 0.5, color: 'text.secondary', lineHeight: 'normal' }}>
          Pasos guiados de conexión
        </Typography>
      </div>

      <Box component="ol" sx={{ listStyle: 'none', m: 0, p: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {steps.map((step, index) => (
          <Box component="li" key={step} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
            <Box
              aria-hidden
              sx={{
                width: 24,
                height: 24,
                flexShrink: 0,
                display: 'grid',
                placeItems: 'center',
                borderRadius: '12px',
                bgcolor: 'secondary.container',
                color: 'primary.onContainer',
                typography: 'subtitle2',
              }}
            >
              {index + 1}
            </Box>
            <Typography variant="caption" component="p" sx={{ color: 'text.secondary' }}>
              {step}
            </Typography>
          </Box>
        ))}
      </Box>

      <PairingForm />
    </Card>
  )
}
