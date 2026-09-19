import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import { NavLink } from 'react-router'
import { AssetIcon } from '../components/AssetIcon'
import { navItems } from './navItems'

export const BOTTOM_NAV_HEIGHT = 80

/** M3 navigation bar used below the md breakpoint, in place of the navigation drawer. */
export function BottomNavBar() {
  return (
    <Box
      component="nav"
      aria-label="Navegación principal"
      sx={{
        display: { xs: 'grid', md: 'none' },
        gridTemplateColumns: `repeat(${navItems.length}, minmax(0, 1fr))`,
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 'appBar',
        height: `calc(${BOTTOM_NAV_HEIGHT}px + env(safe-area-inset-bottom))`,
        pb: 'env(safe-area-inset-bottom)',
        bgcolor: 'background.paper',
        borderTop: 1,
        borderColor: 'divider',
      }}
    >
      {navItems.map((item) => (
        <ButtonBase
          key={item.to}
          component={NavLink}
          to={item.to}
          sx={{
            flexDirection: 'column',
            gap: 0.5,
            color: 'text.secondary',
            fontSize: 12,
            fontWeight: 500,
            lineHeight: '16px',
            '& .indicator': {
              width: 56,
              height: 32,
              display: 'grid',
              placeItems: 'center',
              borderRadius: '16px',
            },
            '&[aria-current="page"]': {
              color: 'primary.onContainer',
              fontWeight: 600,
              '& .indicator': { bgcolor: 'primary.container' },
            },
          }}
        >
          <span className="indicator">
            <AssetIcon icon={item.icon} tinted />
          </span>
          {item.label}
        </ButtonBase>
      ))}
    </Box>
  )
}
