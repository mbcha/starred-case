<script setup lang="ts">
import type { Job } from '@/types'
import { useJobStore } from '@/stores/job'
import HeartIcon from '@/components/icons/Heart.vue'
import EmptyHeartIcon from '@/components/icons/EmptyHeart.vue'
import ChevronIcon from '@/components/icons/ChevronIcon.vue'
import { ref } from 'vue'
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const { currentUser } = storeToRefs(useUserStore())
const { addFavoriteJob, removeFavoriteJob } = useJobStore()

const expanded = ref(false)

defineProps({
  job: {
    type: Object as () => Job,
    required: true
  }
});
</script>

<template>
  <div class="card">
    <div>
      <h2>{{ job.title }}</h2>
      <p v-if="expanded">{{ job.description }}</p>
      <p class="state">{{ job.state }}</p>
    </div>
    <div class="actions">
      <div v-if="currentUser">
        <HeartIcon
          v-if="job.favorite"
          @click="removeFavoriteJob(1, job.id)"
        />
        <EmptyHeartIcon
          v-else
          @click="addFavoriteJob(1, job.id)"
        />
      </div>
      <ChevronIcon @handleExpanded="expanded = !expanded" />
    </div>
  </div>
</template>

<style>
.card {
  padding: 1rem;
  border: 1px solid var(--color-border);
  margin: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  width: 80%;
  display: flex;
  justify-content: space-between;
}

.card:hover {
  cursor: pointer;
  box-shadow: 0 0 15px rgb(248, 248, 248, 0.1);
}

.state {
  font-style: italic;
}

.actions {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
</style>
