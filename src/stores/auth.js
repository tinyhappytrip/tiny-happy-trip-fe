import router from '@/router'
import { getAccessToken, getRefreshToken, removeCookie, setCookie } from '@/util/cookie'
import { authAxios } from '@/util/http-commons'
import { connectWebSocket, disconnectWebSocket, subscribeNotification } from '@/util/web-socket'
import { jwtDecode } from 'jwt-decode'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    userId: '',
    role: '',
    userImage: '',
    nickname: '',
    socialType: ''
  }),

  actions: {
    async login(data) {
      setCookie(data)
      const { sub: userId, auth: role } = jwtDecode(getAccessToken())
      this.setAuth(true, userId, role.split('_')[1])
      this.userImage = (await authAxios().get(`/users/${this.userId}`)).data.userImage
      this.nickname = (await authAxios().get(`/users/${this.userId}`)).data.nickname
      this.socialType = (await authAxios().get(`/users/${this.userId}`)).data.socialType
    },
    logout() {
      removeCookie()
      this.setAuth(false, '', '')
      this.userImage = ''
      this.nickname = ''
      disconnectWebSocket()
      // router.replace('/')
    },
    setAuth(isLoggedIn, userId, role) {
      this.isLoggedIn = isLoggedIn
      this.userId = userId
      this.role = role
    },
    async checkAuth() {
      if (getAccessToken()) {
        const { sub: userId, auth: role } = jwtDecode(getAccessToken())
        this.setAuth(true, userId, role.split('_')[1])
        this.userImage = (await authAxios().get(`/users/${this.userId}`)).data.userImage
        this.nickname = (await authAxios().get(`/users/${this.userId}`)).data.nickname
        connectWebSocket(this.userId)
        subscribeNotification(this.userId)
      } else {
        if (this.isLoggedIn) {
          this.logout()
        }
      }
    }
  }
})
