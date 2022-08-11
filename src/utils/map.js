export const mapProps = {
  center: { lng: 119.228145, lat: 34.602267 },
  zoom: 12,
  wheelZoom: true,
}

export function translatePointToBMPoint(BMap, point, moreOptions = {}) {
  let bmPoint = new BMap.Point(point.longitude, point.latitude)
  bmPoint.id = point.id
  Object.keys(moreOptions).forEach((key) => {
    bmPoint[key] = moreOptions[key]
  })
  return bmPoint
}
export function getRotation(BMap, map, startPoint, endPoint) {
  let disL = map.getDistance(startPoint, endPoint)
  let disX = map.getDistance(
    new BMap.Point(startPoint.lng, startPoint.lat),
    new BMap.Point(startPoint.lng, endPoint.lat),
  )
  let rouCos = ((Math.asin(disX / disL) / 2 / Math.PI) * 360).toFixed(0)
  if (startPoint.lng < endPoint.lng && startPoint.lat < endPoint.lat) {
    return 180 - parseInt(rouCos) - 90
    // 第一象限
  } else if (startPoint.lng > endPoint.lng && startPoint.lat < endPoint.lat) {
    // 第二象限
    return parseInt(rouCos) - 90
  } else if (startPoint.lng < endPoint.lng && startPoint.lat > endPoint.lat) {
    // 第四象限
    return parseInt(rouCos) + 90
  } else if (startPoint.lng > endPoint.lng && startPoint.lat > endPoint.lat) {
    // 第三象限
    return 360 - parseInt(rouCos) - 90
  }
}

export function changeMapCenter(BMap, map, lng, lat, zoom = 14) {
  let point = new BMap.Point(lng, lat)
  const marker = new BMap.Marker(point)
  map.addOverlay(marker)
  map.centerAndZoom(point, zoom)
}

export function removeAllOverlays(map) {
  map.getOverlays().forEach((o) => {
    map.removeOverlay(o)
  })
}
