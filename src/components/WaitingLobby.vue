<script setup lang="ts">
import { ref, onMounted } from 'vue';

defineProps<{
  sessionTitle?: string;
  displayName?: string;
  isConnecting?: boolean;
}>();

const emit = defineEmits<{
  ready: [];
}>();

const micEnabled = ref(true);
const camEnabled = ref(true);
const devicesReady = ref(false);

onMounted(() => {
  setTimeout(() => {
    devicesReady.value = true;
  }, 800);
});

function handleJoin(): void {
  emit('ready');
}
</script>

<template>
  <div class="cb-waiting-lobby cb-lobby-bg" role="main" aria-label="Waiting lobby">
    <div class="cb-waiting-lobby__content">
      <header class="cb-waiting-lobby__header">
        <h1 class="cb-waiting-lobby__title">
          {{ sessionTitle ?? 'ClassBridge' }}
        </h1>
        <p class="cb-waiting-lobby__subtitle">
          {{ isConnecting ? 'Connecting to session…' : 'The teacher will admit you shortly' }}
        </p>
      </header>

      <div class="cb-waiting-lobby__preview cb-stage-surface" aria-label="Camera preview">
        <div class="cb-waiting-lobby__preview-inner">
          <div v-if="!camEnabled" class="cb-waiting-lobby__avatar">
            {{ (displayName ?? 'G').charAt(0) }}
          </div>
          <div v-else class="cb-waiting-lobby__cam-placeholder">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="2" y="5" width="15" height="14" rx="2" stroke="currentColor" stroke-width="1.5"/>
              <path d="M17 9l5-3v12l-5-3" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      <div class="cb-waiting-lobby__controls" role="group" aria-label="Device controls">
        <button
          class="cb-btn cb-btn--icon"
          :class="{ 'cb-btn--active': micEnabled }"
          :aria-label="micEnabled ? 'Mute microphone' : 'Unmute microphone'"
          :aria-pressed="micEnabled"
          @click="micEnabled = !micEnabled"
        >
          <svg v-if="micEnabled" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 3a3 3 0 00-3 3v6a3 3 0 006 0V6a3 3 0 00-3-3z" stroke="currentColor" stroke-width="1.5"/>
            <path d="M19 10v2a7 7 0 01-14 0v-2M12 19v3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 3a3 3 0 00-3 3v6a3 3 0 006 0V6a3 3 0 00-3-3z" stroke="currentColor" stroke-width="1.5"/>
            <path d="M19 10v2a7 7 0 01-14 0v-2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            <line x1="4" y1="4" x2="20" y2="20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </button>

        <button
          class="cb-btn cb-btn--icon"
          :class="{ 'cb-btn--active': camEnabled }"
          :aria-label="camEnabled ? 'Turn off camera' : 'Turn on camera'"
          :aria-pressed="camEnabled"
          @click="camEnabled = !camEnabled"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="2" y="5" width="15" height="14" rx="2" stroke="currentColor" stroke-width="1.5"/>
            <path d="M17 9l5-3v12l-5-3" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <div v-if="devicesReady" class="cb-waiting-lobby__status">
        <span class="cb-waiting-lobby__pulse" aria-hidden="true" />
        <span>Devices ready — waiting for admission</span>
      </div>

      <button
        v-if="!isConnecting"
        class="cb-btn cb-btn--primary cb-waiting-lobby__join"
        aria-label="Enter waiting room"
        @click="handleJoin"
      >
        Enter Waiting Room
      </button>
    </div>
  </div>
</template>

<style scoped>
.cb-waiting-lobby {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  padding: 24px;
  position: relative;
  z-index: 0;
}

.cb-waiting-lobby__content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  max-width: 480px;
  width: 100%;
  text-align: center;
}

.cb-waiting-lobby__title {
  font-size: 2rem;
  color: var(--cb-chalk);
  margin: 0;
}

.cb-waiting-lobby__subtitle {
  color: var(--cb-text-muted);
  margin: 8px 0 0;
  font-size: 1rem;
}

.cb-waiting-lobby__preview {
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.cb-waiting-lobby__preview-inner {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--cb-surface-stage);
}

.cb-waiting-lobby__avatar {
  font-family: var(--cb-font-display);
  font-size: 4rem;
  font-weight: 600;
  color: var(--cb-primary);
}

.cb-waiting-lobby__cam-placeholder {
  color: var(--cb-text-subtle);
}

.cb-waiting-lobby__controls {
  display: flex;
  gap: 12px;
}

.cb-waiting-lobby__status {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--cb-text-muted);
  font-size: 0.875rem;
}

.cb-waiting-lobby__pulse {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--cb-amber);
  animation: cb-hand-pulse 2s ease infinite;
}

.cb-waiting-lobby__join {
  min-width: 200px;
}
</style>
