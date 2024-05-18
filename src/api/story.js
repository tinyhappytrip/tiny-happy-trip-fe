import { noAuthAxios, authAxios } from '@/util/http-commons'

const BASE_API_PATH = '/stories'

function listStory(success, fail) {
  authAxios().get(BASE_API_PATH).then(success).catch(fail)
}

function detailStory(storyId, success, fail) {
  authAxios()
    .get(BASE_API_PATH + '/detail/' + storyId)
    .then(success)
    .catch(fail)
}

function writeStory(story, success, fail) {
  authAxios().post(BASE_API_PATH, story).then(success).catch(fail)
}

function likeStory(storyId, success, fail) {
  authAxios()
    .post(BASE_API_PATH + '/like/' + storyId)
    .then(success)
    .catch(fail)
}

function commentStory(storyId, comment, success, fail) {
  authAxios()
    .post(BASE_API_PATH + '/comments/' + storyId, comment)
    .then(success)
    .catch(fail)
}

function replyStory(commentId, reply, success, fail) {
  authAxios()
    .post(BASE_API_PATH + '/replies/' + commentId, reply)
    .then(success)
    .catch(fail)
}

function removeStory(storyId, success, fail) {
  authAxios()
    .delete(BASE_API_PATH + '/' + storyId)
    .then(success)
    .catch(fail)
}

function editStory(storyId, story, success, fail) {
  authAxios()
    .patch(BASE_API_PATH + '/' + storyId, story)
    .then(success)
    .catch(fail)
}

function userStory(userId, success, fail) {
  authAxios()
    .get(BASE_API_PATH + '/' + userId)
    .then(success)
    .catch(fail)
}

export { listStory, detailStory, writeStory, likeStory, commentStory, replyStory, removeStory, editStory, userStory }
