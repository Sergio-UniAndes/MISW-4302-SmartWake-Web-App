import type { Alarm, AlarmStatus } from './mockAlarms'

export type AlarmFilter = 'todas' | 'activas' | 'pausadas'

export const alarmFilters: { value: AlarmFilter; label: string; status?: AlarmStatus }[] = [
  { value: 'todas', label: 'Todas' },
  { value: 'activas', label: 'Activas', status: 'active' },
  { value: 'pausadas', label: 'Pausadas', status: 'paused' },
]

/** URL search param that holds the selected filter, e.g. /alarmas?estado=activas. */
export const FILTER_PARAM = 'estado'

export function parseAlarmFilter(value: string | null): AlarmFilter {
  return alarmFilters.some((filter) => filter.value === value) ? (value as AlarmFilter) : 'todas'
}

export function filterAlarms(alarms: Alarm[], filter: AlarmFilter): Alarm[] {
  const status = alarmFilters.find((f) => f.value === filter)?.status
  return status ? alarms.filter((alarm) => alarm.status === status) : alarms
}
