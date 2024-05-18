import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', {
  state: () => ({
    showModal: false
  }),

  actions: {
    setModal(newShowModal) {
      this.showModal = newShowModal
    },
    getModal() {
      return this.showModal
    }
  }
})
