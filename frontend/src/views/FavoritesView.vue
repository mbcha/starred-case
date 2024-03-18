<script setup lang="ts">
import JobsList from '@/components/JobsList.vue'
import { useJobStore } from '@/stores/job'
import { storeToRefs } from 'pinia'

const { favoriteJobs: jobs } = storeToRefs(useJobStore())
</script>

<template>
  <JobsList v-if="jobs.length" :jobs="jobs" />
  <p v-else class="no-favorites">No favorite jobs</p>
</template>

<style>
.no-favorites {
  text-align: center;
}
</style>
