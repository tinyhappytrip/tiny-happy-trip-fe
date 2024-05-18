import { noAuthAxios, authAxios } from '@/util/http-commons'
import { useAuthStore } from '@/stores/auth'
import { sendPassword } from './mail-api'
import Cookies from 'js-cookie'

const BASE_API_PATH = '/users'
const store = useAuthStore()

export async function login(data, success, fail) {
  noAuthAxios()
    .post(BASE_API_PATH + '/login', data)
    .then(success)
    .catch(fail)
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

export async function signup(signupUser, success, fail) {
  await noAuthAxios()
    .post(BASE_API_PATH + '/signup', signupUser)
    .then(success)
    .catch(fail)
}

export async function getUserInfo(userId, success, fail) {
  await noAuthAxios()
    .get(BASE_API_PATH + '/' + userId)
    .then(success)
    .catch(fail)
}

export async function followUser(userId, success, fail) {
  await authAxios()
    .post(BASE_API_PATH + '/follow/' + userId)
    .then(success)
    .catch(fail)
}

export async function unFollowUser(userId, success, fail) {
  await authAxios()
    .delete(BASE_API_PATH + '/follow/' + userId)
    .then(success)
    .catch(fail)
}

export async function followList(userId, success, fail) {
  await noAuthAxios()
    .get(BASE_API_PATH + '/follow/' + userId + '?type=follower')
    .then(success)
    .catch(fail)
}
