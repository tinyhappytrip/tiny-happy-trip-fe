import { noAuthAxios } from '@/util/http-commons'

const local = noAuthAxios()

function listStory(success, fail) {
  local.get(`/stories`).then(success).catch(fail)
}

function detailStory(storyId, success, fail) {
  local
    .get('/stories/detail/' + storyId)
    .then(success)
    .catch(fail)
}

function writeStory(story, success, fail) {
  local.post('/stories', story).then(success).catch(fail)
}

function likeStory(storyId, success, fail) {
  local
    .post('/stories/like/' + storyId)
    .then(success)
    .catch(fail)
}

function commentStory(storyId, comment, success, fail) {
  local
    .post('/stories/comments/' + storyId, comment)
    .then(success)
    .catch(fail)
}

function replyStory(commentId, reply, success, fail) {
  local
    .post('/stories/replies/' + commentId, reply)
    .then(success)
    .catch(fail)
}

function removeStory(storyId) {
  local
    .delete('stories' + storyId)
    .then(success)
    .catch(fail)
}

function editStory(storyId, story) {
  local
    .patch('stories' + storyId, story)
    .then(suceess)
    .catch(fail)
}
export { listStory, detailStory, writeStory, likeStory, commentStory, replyStory, removeStory, editStory }
