import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { StatusTag } from '../../components/StatusTag'

type CardHeaderProps = {
  id: string
  title: string
  subtitle: string
  badge: string
}

// Figma: "Feature Header" / "Setup Header" of the Tareas cards.
export function CardHeader({ id, title, subtitle, badge }: CardHeaderProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, minWidth: 0 }}>
        <Typography id={id} variant="h2">
          {title}
        </Typography>
        <Typography sx={{ fontSize: 14, lineHeight: 'normal', color: 'text.secondary' }}>{subtitle}</Typography>
      </Box>
      <StatusTag sx={{ fontSize: 12, fontWeight: 600, textTransform: 'none' }}>{badge}</StatusTag>
    </Box>
  )
}
