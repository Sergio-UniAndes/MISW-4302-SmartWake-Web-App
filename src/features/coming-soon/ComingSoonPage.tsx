import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { StatusTag } from '../../components/StatusTag'
import { ShellTopBar } from '../../layout/ShellTopBar'

type ComingSoonPageProps = {
  title: string
}

/** Placeholder for sidebar destinations whose Figma screens are not implemented yet. */
export function ComingSoonPage({ title }: ComingSoonPageProps) {
  return (
    <>
      <ShellTopBar title={title} />
      <Box component="main" sx={{ flex: 1, p: { xs: 2, sm: 4 }, display: 'grid', placeItems: 'center' }}>
        <Box sx={{ maxWidth: 420, textAlign: 'center' }}>
          <StatusTag>Próximamente</StatusTag>
          <Typography variant="h2" component="h1" sx={{ mt: 2 }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
            Esta sección está en construcción.
          </Typography>
        </Box>
      </Box>
    </>
  )
}
