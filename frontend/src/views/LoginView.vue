<script setup lang="ts">
import { useJobStore } from '@/stores/job'
import { useUserStore } from '@/stores/user'
import axios from 'axios';
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const { currentUser } = storeToRefs(useUserStore())
const { fetchUserFavoriteJobs } = useJobStore()
const errorMessage = ref('')
const password = ref('')
const email = ref('')

const login = () => {
  axios.post('http://localhost:3000/users/login', {
    email: email.value,
    password: password.value
  }).then(response => {
    fetchUserFavoriteJobs(response.data.data.id)
    currentUser.value = response.data.data
    router.push('/')
  }).catch(error => {
    if (error.response) {
      errorMessage.value = error.response.data.message
    } else {
      errorMessage.value = 'An error occurred'
    }
  })
}
</script>

<template>
  <form @submit.prevent="login">
    <input
      v-model="email"
      type="text"
      placeholder="Email"
    />
    <input
      v-model="password"
      type="password"
      placeholder="Password"
    />
    <button type="submit">Login</button>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </form>
</template>

<style>
form {
  display: flex;
  flex-direction: column;
  place-items: center;
  width: 100%;
}

input {
  margin: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
}

button {
  margin: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
  background-color: var(--color-primary);
  color: var(--color-text);
  cursor: pointer;
}

button:hover {
  box-shadow: 0 0 15px rgb(248, 248, 248, 0.1);
}

.error-message {
  color: var(--color-error);
}
</style>
