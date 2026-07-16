<script setup lang="ts">
defineProps<{
  open: boolean;
}>();

const emit = defineEmits<{
  close: [];
  submit: [question: string];
}>();

const questions = [
  { id: '1', author: 'Youssef Ali', body: 'Can you explain the mechanism again?', votes: 3, answered: false },
  { id: '2', author: 'Layla Mahmoud', body: 'Is this on the exam?', votes: 5, answered: true },
];
</script>

<template>
  <aside
    v-if="open"
    class="cb-questions-panel"
    role="complementary"
    aria-label="Questions"
  >
    <header class="cb-questions-panel__header">
      <h2>Questions</h2>
      <button class="cb-btn cb-btn--icon cb-btn--ghost" aria-label="Close questions" @click="emit('close')">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </button>
    </header>

    <ul class="cb-questions-panel__list" role="list">
      <li
        v-for="q in questions"
        :key="q.id"
        class="cb-questions-panel__item"
        :class="{ 'cb-questions-panel__item--answered': q.answered }"
      >
        <p class="cb-questions-panel__body">{{ q.body }}</p>
        <div class="cb-questions-panel__meta">
          <span>{{ q.author }}</span>
          <span class="cb-questions-panel__votes" aria-label="`${q.votes} votes`">▲ {{ q.votes }}</span>
        </div>
      </li>
    </ul>
  </aside>
</template>

<style scoped>
.cb-questions-panel {
  width: 300px;
  background: var(--cb-surface);
  border-inline-start: 1px solid var(--cb-border);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.cb-questions-panel__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1px solid var(--cb-border);
}

.cb-questions-panel__header h2 {
  font-size: 0.9375rem;
  margin: 0;
}

.cb-questions-panel__list {
  list-style: none;
  margin: 0;
  padding: 12px;
  overflow-y: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.cb-questions-panel__item {
  padding: 12px;
  border-radius: var(--cb-radius-md);
  background: var(--cb-surface-raised);
  border: 1px solid var(--cb-border);
}

.cb-questions-panel__item--answered {
  opacity: 0.6;
  border-color: rgba(61, 184, 122, 0.3);
}

.cb-questions-panel__body {
  margin: 0 0 8px;
  font-size: 0.875rem;
}

.cb-questions-panel__meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: var(--cb-text-muted);
}

.cb-questions-panel__votes {
  color: var(--cb-amber);
  font-weight: 600;
}
</style>
