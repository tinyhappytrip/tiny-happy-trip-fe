import { noAuthAxios, authAxios } from '@/util/http-commons'

const BASE_API_PATH = '/goto-list'

export async function createGotoList(title, success, fail) {
  await authAxios().post(`${BASE_API_PATH}?title=${title}`).then(success).catch(fail)
}

export async function createGotoItem(formData, success, fail) {
  await authAxios.post(`${BASE_API_PATH}/${formData.gotoListId}`)
}
