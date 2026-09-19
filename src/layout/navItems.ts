import navAlarm from '../assets/icons/nav-alarm.svg'
import navFolder from '../assets/icons/nav-folder.svg'
import navLocation from '../assets/icons/nav-location.svg'
import navStats from '../assets/icons/nav-stats.svg'
import type { IconAsset } from '../components/AssetIcon'
import { paths } from '../routes'

type NavItem = {
  to: string
  label: string
  icon: IconAsset
}

export const navItems: NavItem[] = [
  { to: paths.alarms, label: 'Alarmas', icon: { src: navAlarm, width: 24, height: 24 } },
  { to: paths.collections, label: 'Colecciones', icon: { src: navFolder, width: 24, height: 24 } },
  { to: paths.locations, label: 'Ubicaciones', icon: { src: navLocation, width: 24, height: 24 } },
  { to: paths.statistics, label: 'Estadísticas', icon: { src: navStats, width: 24, height: 24 } },
]
