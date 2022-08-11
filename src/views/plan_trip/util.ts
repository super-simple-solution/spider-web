import { RowInfo } from '@/types/local'
import { hourFormat, dateFormat } from '@/utils/moment'
export function listProcess(list: RowInfo[], option: any = {}) {
  const { employeeMap, stationMap, busMap } = option
  list.forEach((item) => {
    item.exec_date_text = dateFormat(item.exec_date * 1000)
    item.plan_depart_time_text = hourFormat(item.plan_depart_time * 1000)
    item.driver_id_text = employeeMap[item.driver_id]?.name ?? '-'
    item.bus_id_text = busMap[item.bus_id]?.license_number ?? '-'
    item.begin_station_id_text = stationMap[item.begin_station_id]?.name ?? '-'
    item.end_station_id_text = stationMap[item.end_station_id]?.name ?? '-'
    item.is_edit_bus = false
    item.is_edit_driver = false
  })
}
