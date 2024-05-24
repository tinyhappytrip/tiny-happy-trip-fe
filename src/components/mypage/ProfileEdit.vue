<template>
  <div class="container">
    <label for="email" class="label">이메일</label>
    <div class="email-input-group">
      <input :value="user.email" id="email" name="email" type="text" required :placeholder="user.email" disabled />
      <span class="social-type">{{ user.socialType }}</span>
    </div>
    <hr />
    <label for="nickname" class="label">닉네임</label>
    <div class="description">소확행에서 사용할 닉네임입니다.(3자 ~ 10자)</div>
    <div class="input-group">
      <input v-model="nickname" @input="updateNickname" id="nickname" name="nickname" type="text" required placeholder="닉네임" />
      <div class="error-message">{{ nicknameError }}</div>
    </div>
    <label for="description" class="label">소개글</label>
    <div class="description">소확행에서 사용할 소개글입니다.</div>
    <div class="input-group">
      <input v-model="description" @input="updateDescription" id="description" name="description" type="text" required placeholder="소개글" />
    </div>

    <button @click="editProfile" type="submit" class="edit-btn" :disabled="!canEdit" :class="{ active: canEdit, inactive: !canEdit }">회원정보 수정</button>
  </div>
</template>

<script setup>
import { ref, defineProps, watch, computed } from 'vue'
import { updateUserInfo } from '@/api/user-api'

const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})

const user = props.user
const nickname = ref(user.nickname || '')
const description = ref(user.description || '')
const nicknameError = ref('')
const isFormValid = ref(false)
const isChanged = ref(false)

const canEdit = computed(() => {
  return isChanged.value && isFormValid.value
})
const updateNickname = (event) => {
  nickname.value = event.target.value
  validateForm()
}

const updateDescription = (event) => {
  description.value = event.target.value
  validateForm()
}

const validateForm = () => {
  // 초기화
  nicknameError.value = ''
  isFormValid.value = false

  // 닉네임 길이 유효성 검사
  if (nickname.value.length < 3 || nickname.value.length > 8) {
    nicknameError.value = '닉네임은 3자에서 8자 사이여야 합니다.'
    return
  }

  isFormValid.value = true

  // 변경 되었는지 확인

  isChanged.value = nickname.value != user.nickname || description.value != user.description
}

const editProfile = () => {
  updateUserInfo(
    nickname.value,
    description.value,
    () => {
      window.location.reload()
    },
    (error) => {
      console.log(error)
    }
  )
}

watch(
  () => props.user,
  (newUser) => {
    nickname.value = newUser.nickname || ''
    description.value = newUser.description || ''
  },
  { immediate: true }
)
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  min-width: 800px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 50px;
  height: 627px;
}

.container > * {
  margin-inline: 10px;
}

.label {
  font-weight: bold;
  margin-top: 30px;
  color: #0c081e;
  text-align: left;
  width: 100%;
}

.description {
  font-size: 14px;
  color: #777;
  text-align: left;
  width: 100%;
}

.email-input-group {
  display: flex;
  align-items: center;
  width: 100%;
  background-color: #f0f2f5;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.email-input-group input {
  border: none;
  background: none;
  width: 100%;
}

.social-type {
  margin-left: 10px;
  background-color: #e0e0e0;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  color: #555;
}

.input-group {
  width: 100%;
  text-align: left;
}

.input-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 5px;
  box-sizing: border-box;
}

.error-message {
  color: #f44336;
  font-size: 12px;
  margin-top: 5px;
}

.edit-btn {
  background-color: #af8f6f;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
}

.edit-btn:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

.edit-btn.active {
  background-color: #af8f6f;
}

.edit-btn.inactive {
  background-color: #555;
}

.edit-btn:hover:not(:disabled) {
  background-color: #74512d;
}
</style>
