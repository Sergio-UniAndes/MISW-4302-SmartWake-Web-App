import { createBrowserRouter, Navigate } from 'react-router'
import { AlarmsPage } from './features/alarms/AlarmsPage'
import { LinkDevicePage } from './features/link-device/LinkDevicePage'
import { LocationsPage } from './features/locations/LocationsPage'
import { StatisticsPage } from './features/statistics/StatisticsPage'
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
      { path: paths.locations, element: <LocationsPage /> },
      { path: paths.statistics, element: <StatisticsPage /> },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
])
