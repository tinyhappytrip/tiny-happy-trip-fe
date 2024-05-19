import { noAuthAxios } from '@/util/http-commons'

const BASE_API_PATH = '/mail'

export async function sendPassword(email) {
  return await noAuthAxios().post(`${BASE_API_PATH}/find/${email}`)
}

export async function sendCode(email) {
  return await noAuthAxios().post(`${BASE_API_PATH}/signup/${email}`)
}
