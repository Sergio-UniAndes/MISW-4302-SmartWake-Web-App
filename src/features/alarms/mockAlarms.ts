import type { IconAsset } from '../../components/AssetIcon'
import { alarmIcons } from './alarmIcons'

export type AlarmStatus = 'active' | 'paused'

export type TimelineItem = {
  icon: IconAsset
  label: string
  /** Highlighted with the primary text color. */
  emphasis?: boolean
}

/** A slice of the morning timeline: preparation, travel, or slack before arrival. */
export type TimelineSegment = {
  kind: 'prep' | 'travel' | 'slack'
  percent: number
}

export type AlarmDetail = {
  icon: IconAsset
  text: string
  emphasis?: boolean
  /** Short value aligned to the right, e.g. the usual travel time. */
  meta?: { icon: IconAsset; text: string }
}

export type AlarmSchedule =
  | { kind: 'weekly'; days: number[]; tone: 'neutral' | 'primary' } // days: 0 = lunes … 6 = domingo
  | { kind: 'once'; label: string }

export type Alarm = {
  id: string
  title: string
  category: string
  description: string
  time: string
  period: 'AM' | 'PM'
  status: AlarmStatus
  timeLabel: string
  timeline: { items: TimelineItem[]; segments: TimelineSegment[] }
  details: AlarmDetail[]
  schedule: AlarmSchedule
}

export type NextAlarm = {
  countdown: string
  summary: string
}

// Mock data mirroring the Figma "Gestión de Alarmas" frames until the backend exists.
export const alarms: Alarm[] = [
  {
    id: 'oficina',
    title: 'Oficina - Jornada Laboral',
    category: 'Trabajo',
    description: 'Ruta matutina con cálculo dinámico de tráfico',
    time: '06:45',
    period: 'AM',
    status: 'active',
    timeLabel: 'Hora despertar',
    timeline: {
      items: [
        { icon: alarmIcons.prepSunrise, label: 'Prep: 45 min' },
        { icon: alarmIcons.car, label: 'Salida: 07:30 AM' },
        { icon: alarmIcons.checkCircle, label: 'Llegada: 08:15 AM', emphasis: true },
      ],
      segments: [
        { kind: 'prep', percent: 35 },
        { kind: 'travel', percent: 45 },
        { kind: 'slack', percent: 20 },
      ],
    },
    details: [
      {
        icon: alarmIcons.apartment,
        text: 'Av. Paseo de la Reforma 250, Juárez, CDMX',
        emphasis: true,
        meta: { icon: alarmIcons.speed, text: '35 min habitual' },
      },
      { icon: alarmIcons.volume, text: 'Aviso sonoro anticipado de salida (10 min antes)' },
    ],
    schedule: { kind: 'weekly', days: [0, 1, 2, 3, 4], tone: 'neutral' },
  },
  {
    id: 'gimnasio',
    title: 'Entrenamiento Matutino',
    category: 'Salud',
    description: 'Sesión fitness previa a la jornada laboral',
    time: '05:30',
    period: 'AM',
    status: 'active',
    timeLabel: 'Hora despertar',
    timeline: {
      items: [
        { icon: alarmIcons.prepSunrise, label: 'Prep: 20 min' },
        { icon: alarmIcons.bike, label: 'Salida: 05:50 AM' },
        { icon: alarmIcons.checkCircle, label: 'Llegada: 06:15 AM', emphasis: true },
      ],
      segments: [
        { kind: 'prep', percent: 25 },
        { kind: 'travel', percent: 55 },
        { kind: 'slack', percent: 20 },
      ],
    },
    details: [
      {
        icon: alarmIcons.fitnessCenter,
        text: 'Insurgentes Sur 1234, Del Valle - Gimnasio Central',
        emphasis: true,
        meta: { icon: alarmIcons.navigation, text: '18 min' },
      },
      { icon: alarmIcons.backpack, text: 'Tarea ligada: "Preparar maleta de deporte noche anterior"' },
    ],
    schedule: { kind: 'weekly', days: [0, 2, 4], tone: 'neutral' },
  },
  {
    id: 'vuelo',
    title: 'Vuelo a Guadalajara',
    category: 'Viaje',
    description: 'Salida puntual de vuelo nacional AM-142',
    time: '04:15',
    period: 'AM',
    status: 'paused',
    timeLabel: 'Pausada',
    timeline: {
      items: [
        { icon: alarmIcons.luggage, label: 'Prep: 60 min' },
        { icon: alarmIcons.taxi, label: 'Salida: 05:15 AM' },
        { icon: alarmIcons.flightLand, label: 'Llegada: 06:30 AM' },
      ],
      segments: [
        { kind: 'prep', percent: 40 },
        { kind: 'travel', percent: 35 },
        { kind: 'slack', percent: 25 },
      ],
    },
    details: [
      { icon: alarmIcons.connectingAirports, text: 'Terminal 2, Aeropuerto Internacional CDMX (AICM)' },
      { icon: alarmIcons.calendar, text: 'Frecuencia: Una sola vez (28 de octubre)' },
    ],
    schedule: { kind: 'once', label: 'Programada para fecha específica' },
  },
  {
    id: 'descanso',
    title: 'Despertar Tranquilo',
    category: 'Descanso',
    description: 'Sin traslados ni apuros; activación progresiva',
    time: '08:30',
    period: 'AM',
    status: 'active',
    timeLabel: 'Fin de semana',
    timeline: {
      items: [
        { icon: alarmIcons.selfImprovement, label: 'Rutina suave: 30 min' },
        { icon: alarmIcons.coffee, label: 'Sin traslados requeridos', emphasis: true },
      ],
      segments: [{ kind: 'prep', percent: 100 }],
    },
    details: [
      { icon: alarmIcons.home, text: 'C. Amsterdam 50, Condesa, CDMX (Casa)', emphasis: true },
      { icon: alarmIcons.musicNote, text: 'Alarma gradual con sonido ambiental "Brisa de Bosque"' },
    ],
    schedule: { kind: 'weekly', days: [5, 6], tone: 'primary' },
  },
]

export const nextAlarm: NextAlarm = {
  countdown: 'En 8h 12m',
  summary:
    'Mañana 06:45 AM hacia "Oficina Reforma" • Salida estimada a las 07:30 AM con tráfico moderado en tiempo real.',
}
