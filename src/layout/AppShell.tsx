import Box from '@mui/material/Box'
import { Outlet } from 'react-router'
import { BOTTOM_NAV_HEIGHT, BottomNavBar } from './BottomNavBar'
import { NavigationDrawer } from './NavigationDrawer'

/** Layout for the signed-in area: navigation drawer (desktop) or bottom bar (mobile) around the page. */
export function AppShell() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100dvh', bgcolor: 'background.default' }}>
      <NavigationDrawer />
      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          pb: { xs: `calc(${BOTTOM_NAV_HEIGHT}px + env(safe-area-inset-bottom))`, md: 0 },
        }}
      >
        <Outlet />
      </Box>
      <BottomNavBar />
    </Box>
  )
}
