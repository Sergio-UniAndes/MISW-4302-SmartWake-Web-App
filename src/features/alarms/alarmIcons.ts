import apartment from '../../assets/icons/apartment.svg'
import backpack from '../../assets/icons/backpack.svg'
import bike from '../../assets/icons/bike.svg'
import calendar from '../../assets/icons/calendar.svg'
import car from '../../assets/icons/car.svg'
import checkCircle from '../../assets/icons/check-circle.svg'
import coffee from '../../assets/icons/coffee.svg'
import commute from '../../assets/icons/commute.svg'
import connectingAirports from '../../assets/icons/connecting-airports.svg'
import fitnessCenter from '../../assets/icons/fitness-center.svg'
import flightLand from '../../assets/icons/flight-land.svg'
import home from '../../assets/icons/home.svg'
import luggage from '../../assets/icons/luggage.svg'
import musicNote from '../../assets/icons/music-note.svg'
import navigation from '../../assets/icons/navigation.svg'
import nearMe from '../../assets/icons/near-me.svg'
import prepSunrise from '../../assets/icons/prep-sunrise.svg'
import selfImprovement from '../../assets/icons/self-improvement.svg'
import speed from '../../assets/icons/speed.svg'
import predictiveMode from '../../assets/icons/status-predictive.svg'
import taxi from '../../assets/icons/taxi.svg'
import tune from '../../assets/icons/tune.svg'
import volume from '../../assets/icons/volume.svg'
import type { IconAsset } from '../../components/AssetIcon'

// Icons exported from Figma (Gestión de Alarmas, node 310:1604) at their drawn size.
export const alarmIcons = {
  apartment: { src: apartment, width: 12, height: 12 },
  backpack: { src: backpack, width: 10.667, height: 13.333 },
  bike: { src: bike, width: 15, height: 12.813 },
  calendar: { src: calendar, width: 12, height: 13.333 },
  car: { src: car, width: 11.25, height: 10 },
  checkCircle: { src: checkCircle, width: 12.5, height: 12.5 },
  coffee: { src: coffee, width: 11.25, height: 11.25 },
  commute: { src: commute, width: 20, height: 16 },
  connectingAirports: { src: connectingAirports, width: 13.333, height: 14.667 },
  fitnessCenter: { src: fitnessCenter, width: 13.2, height: 13.2 },
  flightLand: { src: flightLand, width: 12.925, height: 11.344 },
  home: { src: home, width: 10.667, height: 12 },
  luggage: { src: luggage, width: 8.75, height: 12.5 },
  musicNote: { src: musicNote, width: 8, height: 12 },
  navigation: { src: navigation, width: 8, height: 9.5 },
  nearMe: { src: nearMe, width: 12, height: 12 },
  predictiveMode: { src: predictiveMode, width: 9.333, height: 10.5 },
  prepSunrise: { src: prepSunrise, width: 15, height: 15 },
  selfImprovement: { src: selfImprovement, width: 11.25, height: 10 },
  speed: { src: speed, width: 10, height: 8 },
  taxi: { src: taxi, width: 11.25, height: 11.25 },
  tune: { src: tune, width: 12, height: 12 },
  volume: { src: volume, width: 12, height: 11.667 },
} satisfies Record<string, IconAsset>
