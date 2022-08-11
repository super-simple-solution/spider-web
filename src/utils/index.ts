export function parseScssVariable(str: string): object {
  const reg = /(\w+):\s*([^;]+);/g
  const matchRes = [...str.matchAll(reg)]
  const res: any = {}
  matchRes.forEach((item) => {
    res[item[1]] = item[2]
  })
  return res
}

export function pickParams(obj: { [x: string]: any }) {
  const res: { [key: string]: string } = {}
  for (const key in obj) {
    if (obj[key] || obj[key] === 0) {
      res[key] = obj[key]
    }
  }
  return res
}
