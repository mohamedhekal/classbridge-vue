<script setup lang="ts">
import { ref } from 'vue';
import type { Participant } from '@classbridge/sdk';

defineProps<{
  waitingParticipants?: Participant[];
  isLocked?: boolean;
}>();

const emit = defineEmits<{
  admit: [participantId: string];
  muteAll: [];
  lock: [locked: boolean];
  endSession: [];
}>();

const showEndConfirm = ref(false);
const showMuteConfirm = ref(false);

function confirmEnd(): void {
  showEndConfirm.value = true;
}

function confirmMuteAll(): void {
  showMuteConfirm.value = true;
}

function handleEnd(): void {
  emit('endSession');
  showEndConfirm.value = false;
}

function handleMuteAll(): void {
  emit('muteAll');
  showMuteConfirm.value = false;
}
</script>

<template>
  <nav class="cb-teacher-dock" role="toolbar" aria-label="Teacher controls">
    <div class="cb-teacher-dock__group">
      <button
        v-for="p in waitingParticipants"
        :key="p.id"
        class="cb-btn cb-btn--primary cb-teacher-dock__admit"
        :aria-label="`Admit ${p.name}`"
        @click="emit('admit', p.id)"
      >
        Admit {{ p.name.split(' ')[0] }}
      </button>
    </div>

    <div class="cb-teacher-dock__group cb-teacher-dock__actions">
      <button
        class="cb-btn"
        aria-label="Mute all participants"
        @click="confirmMuteAll"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 3a3 3 0 00-3 3v6a3 3 0 006 0V6a3 3 0 00-3-3z" stroke="currentColor" stroke-width="1.5"/>
          <path d="M19 10v2a7 7 0 01-14 0v-2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          <line x1="4" y1="4" x2="20" y2="20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        Mute All
      </button>

      <button
        class="cb-btn"
        :class="{ 'cb-btn--active': isLocked }"
        :aria-label="isLocked ? 'Unlock session' : 'Lock session'"
        :aria-pressed="isLocked"
        @click="emit('lock', !isLocked)"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" stroke-width="1.5"/>
          <path d="M8 11V7a4 4 0 018 0v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        {{ isLocked ? 'Unlock' : 'Lock' }}
      </button>

      <button
        class="cb-btn cb-btn--danger"
        aria-label="End session"
        @click="confirmEnd"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 2v10M8 6l4-4 4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" transform="rotate(180 12 12)"/>
          <path d="M4 14v4a2 2 0 002 2h12a2 2 0 002-2v-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        End
      </button>
    </div>

    <!-- End session confirm -->
    <dialog v-if="showEndConfirm" class="cb-teacher-dock__dialog" open role="alertdialog" aria-labelledby="end-title">
      <h3 id="end-title">End session?</h3>
      <p>All participants will be disconnected. This cannot be undone.</p>
      <div class="cb-teacher-dock__dialog-actions">
        <button class="cb-btn" @click="showEndConfirm = false">Cancel</button>
        <button class="cb-btn cb-btn--danger" @click="handleEnd">End Session</button>
      </div>
    </dialog>

    <!-- Mute all confirm -->
    <dialog v-if="showMuteConfirm" class="cb-teacher-dock__dialog" open role="alertdialog" aria-labelledby="mute-title">
      <h3 id="mute-title">Mute all participants?</h3>
      <p>Everyone except you will be muted.</p>
      <div class="cb-teacher-dock__dialog-actions">
        <button class="cb-btn" @click="showMuteConfirm = false">Cancel</button>
        <button class="cb-btn cb-btn--primary" @click="handleMuteAll">Mute All</button>
      </div>
    </dialog>
  </nav>
</template>

<style scoped>
.cb-teacher-dock {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 20px;
  background: var(--cb-surface);
  border-top: 1px solid var(--cb-border);
  min-height: var(--cb-dock-height);
  flex-wrap: wrap;
}

.cb-teacher-dock__group {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.cb-teacher-dock__admit {
  font-size: 0.8125rem;
  padding: 8px 14px;
}

.cb-teacher-dock__dialog {
  position: fixed;
  inset: 0;
  margin: auto;
  padding: 28px;
  border: 1px solid var(--cb-border-strong);
  border-radius: var(--cb-radius-lg);
  background: var(--cb-surface-raised);
  color: var(--cb-text);
  max-width: 400px;
  width: 90%;
  z-index: 100;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.5);
}

.cb-teacher-dock__dialog h3 {
  margin: 0 0 8px;
  font-size: 1.125rem;
}

.cb-teacher-dock__dialog p {
  margin: 0 0 20px;
  color: var(--cb-text-muted);
  font-size: 0.875rem;
}

.cb-teacher-dock__dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

@media (max-width: 639px) {
  .cb-teacher-dock {
    position: fixed;
    inset-inline: 0;
    bottom: 0;
    z-index: 50;
    border-radius: var(--cb-radius-lg) var(--cb-radius-lg) 0 0;
    box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.4);
  }
}
</style>
