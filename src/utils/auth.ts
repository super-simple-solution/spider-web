import Cookies from 'js-cookie'
const TokenKey = 'bus_admin_token'

export function getToken(): string | undefined {
  return Cookies.get(TokenKey)
}

export function setToken(token: string) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

const gyPath: { [char: string]: string } = {
  test: 'http://gongyi-test.zhcslyg.com/newbus',
  pre: 'http://gongyi-pre.zhcslyg.com',
  online: 'http://online.zhcslyg.com/newbus',
}

export function getGyPath(): string {
  let envStr = 'online'
  if (location.hostname.includes('-test') || location.hostname === 'localhost') {
    envStr = 'test'
  } else if (location.hostname.includes('-pre')) {
    envStr = 'pre'
  }
  return gyPath[envStr]
}

export function toLogin() {
  const href = encodeURIComponent(location.href)
  location.href = `${getGyPath()}/?redirect=${href}&from=network#/login`
}

export function toHome() {
  location.href = `${getGyPath()}/#/navigation`
}
