<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useJobStore } from './stores/job';
import { useUserStore } from './stores/user';
import { storeToRefs } from 'pinia';

const { fetchAllJobs } = useJobStore()
const { currentUser } = storeToRefs(useUserStore())

fetchAllJobs()
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Jobs</RouterLink>
        <RouterLink to="/favorites" v-if="currentUser">Favorites</RouterLink>
        <RouterLink to="/login" v-else>Login</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  margin-bottom: 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  color: var(--color-text);
  cursor: pointer;
  color: hsla(160, 100%, 37%, 1);
}

nav a.router-link-active {
  color: var(--color-text);
}

nav a:not(.router-link-exact-active):hover {
  background-color: hsla(160, 100%, 37%, 0.2);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
    width: 100%;
  }

  nav {
    display: flex;
    justify-content: center;
    text-align: left;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
