import { ref, computed } from 'vue'
import axios from 'axios'
import { defineStore } from 'pinia'
import type { Job } from '@/types'

export const useJobStore = defineStore('job', () => {
  const jobs = ref<Job[]>([])
  const favoriteJobs = computed(() => jobs.value.filter(job => job.favorite))

  const fetchAllJobs = () => {
    axios.get('http://localhost:3000/jobs').then(response => {
      jobs.value = response.data.data
    }).catch(error => console.error(error))
  }

  const fetchUserFavoriteJobs = (userId: number) => {
    axios.get(`http://localhost:3000/users/${userId}/favorite-jobs`).then(response => {
      const favoriteJobsIds = response.data.data.map((job: Job) => job.id)
      favoriteJobsIds.forEach((id: number) => {
        const job = jobs.value.find(job => job.id === id)
        if (job) {
          job.favorite = true
        }
      })
    }).catch(error => console.error(error))
  }

  const addFavoriteJob = (userId: number, jobId: number) => {
    axios.post("http://localhost:3000/jobs/favorite", {
      userId,
      jobId
    }).then(() => {
      const job = jobs.value.find(job => job.id === jobId)
      if (job) {
        job.favorite = true
      }
    }).catch(error => console.error(error))
  }

  const removeFavoriteJob = (userId: number, jobId: number) => {
    axios.delete("http://localhost:3000/jobs/favorite", {
      data: {
        userId,
        jobId
      }
    }).then(() => {
      const job = jobs.value.find(job => job.id === jobId)
      if (job) {
        job.favorite = false
      }
    }).catch(error => console.error(error))
  }

  return {
    jobs,
    favoriteJobs,
    fetchAllJobs,
    fetchUserFavoriteJobs,
    addFavoriteJob,
    removeFavoriteJob
  }
})
