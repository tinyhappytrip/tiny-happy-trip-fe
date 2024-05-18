import Cookies from 'js-cookie'

export function setCookie(data) {
  const { accessToken, refreshToken } = data
  const expirationSeconds = (1 * 60 * 60) / 2
  const expirationDate = new Date(new Date().getTime() + expirationSeconds * 1000)
  Cookies.set('accessToken', accessToken, { expires: expirationDate })
  Cookies.set('refreshToken', refreshToken)
}

export function removeCookie() {
  Cookies.remove('accessToken')
  Cookies.remove('refreshToken')
}

export function getAccessToken() {
  return Cookies.get('accessToken')
}

export function getRefreshToken() {
  return Cookies.get('refreshToken')
}
