import { Location } from '@/types/local'
export interface Config {
  locationControl?: boolean
  cityListControl?: boolean
  contextMenu?: boolean
  markerIcon?: string | null
  markerList: Location[]
  polygon: {
    points: Location[]
  }
  polyline: {
    points: Location[]
  }
}

export const defaultConfig: Config = {
  locationControl: false,
  cityListControl: false,
  contextMenu: false,
  markerIcon: null,
  markerList: [],
  polygon: {
    points: [],
  },
  polyline: {
    points: [],
  },
}
