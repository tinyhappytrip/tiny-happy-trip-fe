import { noAuthAxios } from '@/util/http-commons'

const BASE_API_PATH = '/mail'

export async function sendPassword(data) {
  await noAuthAxios().post(`${BASE_API_PATH}/find/${data}`)
}
