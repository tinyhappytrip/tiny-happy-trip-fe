import { noAuthAxios, authAxios } from '@/util/http-commons'
import { useAuthStore } from '@/stores/auth'
import { sendPassword } from './mail-api'
import router from '@/router'
import Cookies from 'js-cookie'

const BASE_API_PATH = '/users'

export async function login(data, success, fail) {
  return await noAuthAxios()
    .post(BASE_API_PATH + '/login', data)
    .then(success)
    .catch(fail)
}

export async function logout() {
  const store = useAuthStore()
  store.logout()
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

export async function getValidate(type, value) {
  return await noAuthAxios().get(`${BASE_API_PATH}/validate?type=${type}&value=${value}`)
}

export async function checkPassword(password, success, fail) {
  await authAxios()
    .post(BASE_API_PATH + '/password', password)
    .then(success)
    .catch(fail)
}

export async function socialSignup(data) {
  await noAuthAxios().post(BASE_API_PATH + '/signup', data)
  const socialType = Cookies.get('socialType')
  window.location.href = `http://192.168.0.243:8080/oauth2/authorization/${socialType.toLowerCase()}?redirect_uri=http://192.168.0.243:3000&mode=login`
}

export async function signup(signupUser, success) {
  await noAuthAxios()
    .post(BASE_API_PATH + '/signup', signupUser)
    .then(success)
}

export async function getUserInfo(userId, success, fail) {
  await authAxios()
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

export async function followingList(userId, success, fail) {
  await noAuthAxios()
    .get(BASE_API_PATH + '/follow/' + userId + '?type=following')
    .then(success)
    .catch(fail)
}

export async function userListBySearchKeyword(searchKeyword, success, fail) {
  await authAxios()
    .get(BASE_API_PATH + '/search/' + encodeURIComponent(searchKeyword))
    .then(success)
    .catch(fail)
}

export async function updateUserInfo(nickname, introduction, success, fail) {
  await authAxios().patch(BASE_API_PATH, { nickname: nickname, introduction: introduction }).then(success).catch(fail)
}
export async function updateUserPassword(password, success, fail) {
  console.log(password)
  await authAxios().patch(BASE_API_PATH, { password: password }).then(success).catch(fail)
}
export async function updateUserImage(image, success, fail) {
  console.log('image', image)
  await authAxios()
    .patch(
      BASE_API_PATH + '/image',
      { userImageFile: image },
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    .then(success)
    .catch(fail)
}

export async function updatePassword(password, success, fail) {
  await authAxios().patch(BASE_API_PATH, { password: password }).then(success).catch(fail)
}

export async function exitUser(success, fail) {
  await authAxios().delete(BASE_API_PATH).then(success).catch(fail)
}
