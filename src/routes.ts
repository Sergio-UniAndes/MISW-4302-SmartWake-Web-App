export const paths = {
  linkDevice: '/vincular',
  alarms: '/alarmas',
  collections: '/colecciones',
  locations: '/ubicaciones',
  statistics: '/estadisticas',
} as const

/** Router state that asks the destination page to show a one-time message. */
export type NoticeState = { notice?: string }
