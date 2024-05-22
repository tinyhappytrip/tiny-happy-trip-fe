import { noAuthAxios, authAxios } from '@/util/http-commons'

const BASE_API_PATH = '/collections'

async function writeCollection(collection, success, fail) {
  await authAxios().post(BASE_API_PATH, collection).then(success).catch(fail)
}

async function listCollectionBySearchKeyword(searchKeyword, success, fail) {
  await authAxios()
    .get(BASE_API_PATH + '/search/' + searchKeyword)
    .then(success)
    .catch(fail)
}

async function listRecommendCollections(success, fail) {
  await noAuthAxios()
    .get(BASE_API_PATH + '/recommend')
    .then(success)
    .catch(fail)
}

async function userCollection(userId, success, fail) {
  await authAxios()
    .get(BASE_API_PATH + '/user/' + userId)
    .then(success)
    .catch(fail)
}

async function detailCollection(collectionId, success, fail) {
  await authAxios()
    .get(BASE_API_PATH + '/' + collectionId)
    .then(success)
    .catch(fail)
}
export { writeCollection, listCollectionBySearchKeyword, listRecommendCollections, userCollection, detailCollection }
