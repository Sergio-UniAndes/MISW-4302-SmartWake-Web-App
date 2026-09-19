import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import { NavLink } from 'react-router'
import logo from '../assets/logo-smartwake.png'
import { AssetIcon } from '../components/AssetIcon'
import { hoverLayer } from '../theme'
import { navItems } from './navItems'

// Figma: "Aside - NavigationDrawer" (310:1553) / "Left Nav Rail" (310:994). Shown from the md breakpoint up.
export function NavigationDrawer() {
  return (
    <Box
      component="aside"
      sx={{
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: 256,
        flexShrink: 0,
        position: 'sticky',
        top: 0,
        height: '100dvh',
        overflowY: 'auto',
        px: 2,
        py: 3,
        bgcolor: 'background.paper',
        borderRight: 1,
        borderColor: 'divider',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
          <Box
            component="img"
            src={logo}
            alt=""
            sx={{ width: 48, height: 47, objectFit: 'cover', display: 'block' }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2px', lineHeight: 'normal' }}>
            <Box component="span" sx={{ fontSize: 22, fontWeight: 700 }}>
              SmartWake
            </Box>
            <Box component="span" sx={{ fontSize: 12, color: 'text.secondary' }}>
              Intelligent Morning
            </Box>
          </Box>
        </Box>

        <Box component="nav" aria-label="Navegación principal" sx={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {navItems.map((item) => (
            <ButtonBase
              key={item.to}
              component={NavLink}
              to={item.to}
              sx={{
                justifyContent: 'flex-start',
                gap: 1.5,
                px: 2,
                py: 1.5,
                borderRadius: '9999px',
                color: 'text.secondary',
                fontSize: 14,
                fontWeight: 500,
                lineHeight: '20px',
                '&:hover': { backgroundImage: hoverLayer },
                '&[aria-current="page"]': {
                  bgcolor: 'primary.container',
                  color: 'primary.onContainer',
                  fontWeight: 600,
                  borderRadius: '12px',
                  boxShadow: '0 1px 1px rgba(0, 0, 0, 0.05)',
                },
              }}
            >
              <AssetIcon icon={item.icon} tinted />
              {item.label}
            </ButtonBase>
          ))}
        </Box>
      </Box>

      <Box
        sx={{
          pt: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 0.5,
          borderTop: 1,
          borderColor: 'divider',
          lineHeight: 'normal',
        }}
      >
        <Box component="span" sx={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', color: 'secondary.main' }}>
          M3 Warm Dawn
        </Box>
        <Box component="span" sx={{ fontSize: 10, color: 'text.secondary', opacity: 0.6 }}>
          v2.4
        </Box>
      </Box>
    </Box>
  )
}
