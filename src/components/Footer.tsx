import Box from '@mui/material/Box'
import Link from '@mui/material/Link'

// Placeholder targets until these pages exist.
const legalLinks = [
  { label: 'Política de Privacidad', href: '#' },
  { label: 'Términos de Servicio', href: '#' },
  { label: 'Soporte y Ayuda', href: '#' },
]

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        minHeight: 64,
        flexShrink: 0,
        px: { xs: 2, sm: 4 },
        py: { xs: 2, md: 0 },
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'flex-start', md: 'center' },
        justifyContent: 'space-between',
        gap: { xs: 1.5, md: 3 },
        bgcolor: 'surfaceContainer',
        borderTop: 1,
        borderColor: 'divider',
        typography: 'caption',
        lineHeight: 'normal',
        color: 'text.secondary',
      }}
    >
      <span>SmartWake © 2024. Diseñado según Google Material 3 Design Kit.</span>
      <Box
        component="nav"
        aria-label="Enlaces legales"
        sx={{ display: 'flex', flexWrap: 'wrap', columnGap: 3, rowGap: 1 }}
      >
        {legalLinks.map((link) => (
          <Link key={link.label} href={link.href}>
            {link.label}
          </Link>
        ))}
      </Box>
    </Box>
  )
}
