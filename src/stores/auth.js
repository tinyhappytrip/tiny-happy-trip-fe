import { getAccessToken, getRefreshToken, removeCookie, setCookie } from '@/util/cookie'
import { authAxios } from '@/util/http-commons'
import { jwtDecode } from 'jwt-decode'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    userId: '',
    role: '',
    userImage: ''
  }),

  actions: {
    async login(data) {
      setCookie(data)
      const { sub: userId, auth: role } = jwtDecode(getAccessToken())
      this.setAuth(true, userId, role.split('_')[1])
      this.userImage = (await authAxios().get(`/users/${this.userId}`)).data.userImage
    },
    logout() {
      removeCookie()
      this.setAuth(false, '', '')
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
        console.log(this.userImage)
      } else {
        this.logout()
      }
    }
  }
})
