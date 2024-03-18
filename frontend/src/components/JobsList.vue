<script setup lang="ts">
import JobCard from '@/components/JobCard.vue'
import type { Job } from '@/types'

defineProps({
  jobs: {
    type: Array as () => Job[],
    required: true
  }
})
</script>

<template>
  <div class="list">
    <JobCard
      v-for="job in jobs"
      :key="job.id"
      :job="job"
    />
  </div>
</template>

<style>
.list {
  display: flex;
  flex-direction: column;
  place-items: center;
  width: 100%;
}
</style>
