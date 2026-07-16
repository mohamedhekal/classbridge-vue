<script setup lang="ts">
defineProps<{
  teacherName?: string;
}>();

const emit = defineEmits<{
  accept: [];
  decline: [];
}>();
</script>

<template>
  <div class="cb-unmute-request" role="alertdialog" aria-labelledby="unmute-title">
    <div class="cb-unmute-request__card">
      <div class="cb-unmute-request__icon" aria-hidden="true">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path d="M12 3a3 3 0 00-3 3v6a3 3 0 006 0V6a3 3 0 00-3-3z" stroke="currentColor" stroke-width="1.5"/>
          <path d="M19 10v2a7 7 0 01-14 0v-2M12 19v3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </div>
      <h3 id="unmute-title" class="cb-unmute-request__title">Unmute request</h3>
      <p class="cb-unmute-request__body">
        {{ teacherName ?? 'Your teacher' }} is asking you to unmute.
        Your microphone will be shared with the class.
      </p>
      <p class="cb-unmute-request__privacy">
        By accepting, you consent to audio being transmitted to all participants.
      </p>
      <div class="cb-unmute-request__actions">
        <button class="cb-btn" @click="emit('decline')">Decline</button>
        <button class="cb-btn cb-btn--primary" @click="emit('accept')">Unmute</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cb-unmute-request {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(14, 26, 36, 0.75);
  backdrop-filter: blur(6px);
  z-index: 80;
  padding: 24px;
}

.cb-unmute-request__card {
  background: var(--cb-surface-raised);
  border: 1px solid var(--cb-border-strong);
  border-radius: var(--cb-radius-lg);
  padding: 32px;
  max-width: 400px;
  width: 100%;
  text-align: center;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.5);
}

.cb-unmute-request__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(31, 166, 160, 0.15);
  color: var(--cb-primary);
  margin-bottom: 16px;
}

.cb-unmute-request__title {
  font-family: var(--cb-font-display);
  font-size: 1.25rem;
  margin: 0 0 12px;
}

.cb-unmute-request__body {
  color: var(--cb-text-muted);
  font-size: 0.9375rem;
  margin: 0 0 8px;
  line-height: 1.6;
}

.cb-unmute-request__privacy {
  color: var(--cb-text-subtle);
  font-size: 0.75rem;
  margin: 0 0 24px;
}

.cb-unmute-request__actions {
  display: flex;
  gap: 10px;
  justify-content: center;
}
</style>
