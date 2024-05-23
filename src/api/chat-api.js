import { noAuthAxios, authAxios } from '@/util/http-commons'

const BASE_API_PATH = '/chats'

export async function getChatRoomList(success, fail) {
  await authAxios()
    .get(BASE_API_PATH + '/rooms')
    .then(success)
    .catch(fail)
}

export async function getMessageList(chatRoomId, success, fail) {
  await authAxios().get(`${BASE_API_PATH}/${chatRoomId}`).then(success).catch(fail)
}

export async function getChatRoomId(receiverId, success, fail) {
  await authAxios().get(`${BASE_API_PATH}/rooms/${receiverId}`).then(success).catch(fail)
}
