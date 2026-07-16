<script setup lang="ts">
defineProps<{
  question: string;
  options: string[];
  active?: boolean;
}>();

const emit = defineEmits<{
  vote: [optionIndex: number];
  close: [];
}>();
</script>

<template>
  <div v-if="active" class="cb-poll-overlay" role="dialog" aria-label="Poll">
    <div class="cb-poll-overlay__card">
      <h3 class="cb-poll-overlay__question">{{ question }}</h3>
      <div class="cb-poll-overlay__options" role="group" :aria-label="question">
        <button
          v-for="(opt, i) in options"
          :key="i"
          class="cb-btn cb-poll-overlay__option"
          @click="emit('vote', i)"
        >
          {{ opt }}
        </button>
      </div>
      <button class="cb-btn cb-btn--ghost cb-poll-overlay__dismiss" @click="emit('close')">
        Dismiss
      </button>
    </div>
  </div>
</template>

<style scoped>
.cb-poll-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(14, 26, 36, 0.7);
  backdrop-filter: blur(4px);
  z-index: 40;
  padding: 24px;
}

.cb-poll-overlay__card {
  background: var(--cb-surface-raised);
  border: 1px solid var(--cb-border-strong);
  border-radius: var(--cb-radius-lg);
  padding: 28px;
  max-width: 420px;
  width: 100%;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.4);
}

.cb-poll-overlay__question {
  font-family: var(--cb-font-display);
  font-size: 1.25rem;
  margin: 0 0 20px;
  text-align: center;
}

.cb-poll-overlay__options {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.cb-poll-overlay__option {
  width: 100%;
  justify-content: flex-start;
  text-align: start;
}

.cb-poll-overlay__dismiss {
  width: 100%;
  color: var(--cb-text-muted);
}
</style>
