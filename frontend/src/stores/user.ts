import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/types'

export const useUserStore = defineStore('user', () => {
  const currentUser = ref<User>()

  return {
    currentUser
  }
})
