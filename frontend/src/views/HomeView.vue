<script setup lang="ts">
import JobsList from '@/components/JobsList.vue'
import { useJobStore } from '@/stores/job'
import { storeToRefs } from 'pinia'

const { jobs } = storeToRefs(useJobStore())
</script>

<template>
  <JobsList :jobs="jobs" />
</template>
