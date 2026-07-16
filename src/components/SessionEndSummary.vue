<script setup lang="ts">
defineProps<{
  sessionTitle?: string;
  duration?: string;
  participantCount?: number;
}>();

const emit = defineEmits<{
  close: [];
}>();
</script>

<template>
  <div class="cb-session-end" role="dialog" aria-labelledby="end-summary-title">
    <div class="cb-session-end__card">
      <div class="cb-session-end__icon" aria-hidden="true">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>
          <path d="M8 12l3 3 5-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <h2 id="end-summary-title" class="cb-session-end__title">Session Complete</h2>
      <p class="cb-session-end__subtitle">{{ sessionTitle ?? 'Class session' }}</p>

      <dl class="cb-session-end__stats">
        <div class="cb-session-end__stat">
          <dt>Duration</dt>
          <dd>{{ duration ?? '—' }}</dd>
        </div>
        <div class="cb-session-end__stat">
          <dt>Participants</dt>
          <dd>{{ participantCount ?? 0 }}</dd>
        </div>
      </dl>

      <button class="cb-btn cb-btn--primary cb-session-end__close" @click="emit('close')">
        Return to Dashboard
      </button>
    </div>
  </div>
</template>

<style scoped>
.cb-session-end {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  padding: 24px;
  background: var(--cb-ink);
}

.cb-session-end__card {
  text-align: center;
  max-width: 420px;
  width: 100%;
  padding: 40px 32px;
  background: var(--cb-surface);
  border: 1px solid var(--cb-border);
  border-radius: var(--cb-radius-xl);
}

.cb-session-end__icon {
  color: var(--cb-success);
  margin-bottom: 20px;
}

.cb-session-end__title {
  font-family: var(--cb-font-display);
  font-size: 1.75rem;
  margin: 0 0 8px;
}

.cb-session-end__subtitle {
  color: var(--cb-text-muted);
  margin: 0 0 28px;
}

.cb-session-end__stats {
  display: flex;
  justify-content: center;
  gap: 32px;
  margin: 0 0 32px;
}

.cb-session-end__stat dt {
  font-size: 0.75rem;
  color: var(--cb-text-subtle);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 4px;
}

.cb-session-end__stat dd {
  font-family: var(--cb-font-display);
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--cb-primary);
  margin: 0;
}

.cb-session-end__close {
  min-width: 200px;
}
</style>
