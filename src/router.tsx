import { createBrowserRouter, Navigate } from 'react-router'
import { AlarmsPage } from './features/alarms/AlarmsPage'
import { ComingSoonPage } from './features/coming-soon/ComingSoonPage'
import { LinkDevicePage } from './features/link-device/LinkDevicePage'
import { TasksPage } from './features/tasks/TasksPage'
import { AppShell } from './layout/AppShell'
import { paths } from './routes'

export const router = createBrowserRouter([
  // Prototype flow starts at "Vincular Dispositivo".
  { path: '/', element: <Navigate to={paths.linkDevice} replace /> },
  { path: paths.linkDevice, element: <LinkDevicePage /> },
  {
    element: <AppShell />,
    children: [
      { path: paths.alarms, element: <AlarmsPage /> },
      { path: paths.collections, element: <TasksPage /> },
      { path: paths.locations, element: <ComingSoonPage title="Ubicaciones" /> },
      { path: paths.statistics, element: <ComingSoonPage title="Estadísticas" /> },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
])
