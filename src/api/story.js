import { noAuthAxios, authAxios } from '@/util/http-commons'

const BASE_API_PATH = '/stories'

async function listStory(success, fail) {
  await authAxios().get(BASE_API_PATH).then(success).catch(fail)
}

async function detailStory(storyId, success, fail) {
  await authAxios()
    .get(BASE_API_PATH + '/detail/' + storyId)
    .then(success)
    .catch(fail)
}

async function writeStory(story, success, fail) {
  console.log(story)
  await authAxios()
    .post(BASE_API_PATH, story, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(success)
    .catch(fail)
}

async function likeStory(storyId, success, fail) {
  await authAxios()
    .post(BASE_API_PATH + '/like/' + storyId)
    .then(success)
    .catch(fail)
}

async function commentStory(storyId, comment, success, fail) {
  console.log(comment)
  await authAxios()
    .post(BASE_API_PATH + '/comments/' + storyId, comment)
    .then(success)
    .catch(fail)
}

async function replyStory(commentId, reply, success, fail) {
  await authAxios()
    .post(BASE_API_PATH + '/replies/' + commentId, reply)
    .then(success)
    .catch(fail)
}

async function removeStory(storyId, success, fail) {
  await authAxios()
    .delete(BASE_API_PATH + '/' + storyId)
    .then(success)
    .catch(fail)
}

async function editStory(storyId, story, success, fail) {
  await authAxios()
    .patch(BASE_API_PATH + '/' + storyId, story)
    .then(success)
    .catch(fail)
}

async function userStory(userId, success, fail) {
  await authAxios()
    .get(BASE_API_PATH + '/' + userId)
    .then(success)
    .catch(fail)
}

async function listStoryBySearchKeyword(searchKeyword, success, fail) {
  await noAuthAxios()
    .get(BASE_API_PATH + '/search/' + encodeURIComponent(searchKeyword))
    .then(success)
    .catch(fail)
}
export { listStory, detailStory, writeStory, likeStory, commentStory, replyStory, removeStory, editStory, userStory, listStoryBySearchKeyword }
