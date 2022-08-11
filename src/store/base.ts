import { defineStore } from 'pinia'
import { listAll as listEmployee } from '@/api/employee'
import { listAll as listCompany } from '@/api/company'
import { listAll as listStation } from '@/api/station'
import { listAll as listBus } from '@/api/bus'
import { listAll as listLine } from '@/api/line'

interface State {
  employeeList: any[]
  companyList: any[]
  stationList: any[]
  busList: any[]
  lineList: any[]
}

export const useBaseStore = defineStore('base', {
  state: (): State => ({
    companyList: [],
    employeeList: [],
    stationList: [],
    busList: [],
    lineList: [],
  }),
  getters: {
    companyMap: (state): any => {
      return state.companyList.reduce((map, item) => {
        map[item.id] = item
        return map
      }, {})
    },
    employeeMap: (state): any => {
      return state.employeeList.reduce((map, item) => {
        map[item.id] = item
        return map
      }, {})
    },
    busMap: (state): any => {
      return state.busList.reduce((map, item) => {
        map[item.id] = item
        return map
      }, {})
    },
    stationMap: (state): any => {
      return state.stationList.reduce((map, item) => {
        map[item.id] = item
        return map
      }, {})
    },
  },
  actions: {
    getBase() {
      return Promise.all([
        this.getCompanyList(),
        this.getEmployeeList(),
        this.getStationList(),
        this.getBusList(),
        this.getLineList(),
      ])
    },
    getCompanyList() {
      return listCompany().then((res) => {
        if (res) {
          this.companyList = res
        }
      })
    },
    getEmployeeList() {
      return listEmployee().then((res) => {
        if (res) {
          this.employeeList = res
        }
      })
    },
    getStationList() {
      return listStation().then((res) => {
        if (res) {
          this.stationList = res
        }
      })
    },
    getBusList() {
      return listBus().then((res) => {
        if (res) {
          this.busList = res
        }
      })
    },
    getLineList() {
      return listLine().then((res) => {
        if (res) {
          this.lineList = res
        }
      })
    },
  },
})
