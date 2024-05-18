import { noAuthAxios, authAxios } from '@/util/http-commons'
import { useAuthStore } from '@/stores/auth'
import { sendPassword } from './mail-api'
import Cookies from 'js-cookie'

const BASE_API_PATH = '/users'
const store = useAuthStore()

export async function login(data) {
  const response = await noAuthAxios().post(BASE_API_PATH + '/login', data)
  if (response.data !== undefined) {
    store.login(response.data)
  }
}

export async function logout() {
  store.logout()
  window.location.href = '/'
}

export async function getType(email) {
  await noAuthAxios()
    .get(`${BASE_API_PATH}/find/${email}`)
    .then(async (response) => {
      if (response.data === 'EMAIL') {
        await sendPassword(email).then(() => {
          return true
        })
      } else if (response.data === null) {
        return false
      } else {
        return response.data
      }
    })
}

export async function getHomeUserImage() {
  await authAxios.get
}

export async function socialSignup(data) {
  await noAuthAxios().post(BASE_API_PATH + '/signup', data)
  const socialType = Cookies.get('socialType')
  window.location.href = `http://localhost:8080/oauth2/authorization/${socialType.toLowerCase()}?redirect_uri=http://localhost:3000&mode=login`
}
