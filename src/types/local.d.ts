export interface OpOption {
  name: Op
  option: object
}

export type Op = 'add' | 'edit' | 'search' | 'delete'

interface TableConfig {
  selection?: boolean
  index?: boolean
  indexText?: string
  list: any[]
  operations?: string[]
}

interface TableAttrs {
  class?: string
}

interface RowInfo {
  id?: string | number
  [key: string]: any
}

interface Location {
  lng: number
  lat: number
}

type DataOptions = {
  [key: string]: string | number | boolean | null
}
