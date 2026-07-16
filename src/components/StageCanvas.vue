<script setup lang="ts">
import type { Participant } from '@classbridge/sdk';

defineProps<{
  participant: Participant;
  isSpotlight?: boolean;
  size?: 'sm' | 'md' | 'lg';
}>();
</script>

<template>
  <div
    class="cb-stage-canvas cb-stage-morph"
    :class="[`cb-stage-canvas--${size ?? 'lg'}`, { 'cb-stage-canvas--spotlight': isSpotlight }]"
    role="region"
    :aria-label="`${participant.name} stage`"
  >
    <div class="cb-stage-canvas__frame">
      <div
        v-if="participant.isVideoOff"
        class="cb-stage-canvas__avatar"
        :aria-label="`${participant.name}, camera off`"
      >
        <span class="cb-stage-canvas__initial">{{ participant.name.charAt(0) }}</span>
      </div>
      <div v-else class="cb-stage-canvas__video">
        <div class="cb-stage-canvas__video-placeholder">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="2" y="5" width="15" height="14" rx="2" stroke="currentColor" stroke-width="1.5"/>
            <path d="M17 9l5-3v12l-5-3" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>

      <div class="cb-stage-canvas__overlay">
        <span class="cb-stage-canvas__name">{{ participant.name }}</span>
        <div class="cb-stage-canvas__indicators">
          <span v-if="participant.isMuted" class="cb-stage-canvas__indicator" aria-label="Muted">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 3a3 3 0 00-3 3v6a3 3 0 006 0V6a3 3 0 00-3-3z" stroke="currentColor" stroke-width="1.5"/>
              <path d="M19 10v2a7 7 0 01-14 0v-2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              <line x1="4" y1="4" x2="20" y2="20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </span>
          <span
            v-if="participant.handRaised"
            class="cb-stage-canvas__indicator cb-hand-pulse"
            aria-label="Hand raised"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M7 11V6a1.5 1.5 0 013 0v5M10 11V4.5a1.5 1.5 0 013 0V11M13 11V5a1.5 1.5 0 013 0v6l2.5 5.5H4.5L7 11z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
            </svg>
          </span>
          <span
            v-if="participant.isSpeaking"
            class="cb-stage-canvas__speaking"
            aria-label="Speaking"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cb-stage-canvas {
  width: 100%;
  height: 100%;
  min-height: 200px;
}

.cb-stage-canvas__frame {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: var(--cb-radius-stage);
  overflow: hidden;
  background: var(--cb-surface-stage);
  border: 1px solid var(--cb-border);
}

.cb-stage-canvas--spotlight .cb-stage-canvas__frame {
  border-color: rgba(31, 166, 160, 0.3);
  box-shadow: 0 0 0 1px rgba(31, 166, 160, 0.15), 0 8px 32px rgba(0, 0, 0, 0.4);
}

.cb-stage-canvas__video,
.cb-stage-canvas__avatar {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cb-stage-canvas__video-placeholder {
  color: var(--cb-text-subtle);
  opacity: 0.5;
}

.cb-stage-canvas__avatar {
  background: linear-gradient(135deg, var(--cb-surface-raised) 0%, var(--cb-surface) 100%);
}

.cb-stage-canvas__initial {
  font-family: var(--cb-font-display);
  font-size: 4rem;
  font-weight: 600;
  color: var(--cb-primary);
  opacity: 0.7;
}

.cb-stage-canvas__overlay {
  position: absolute;
  inset-inline: 0;
  bottom: 0;
  padding: 16px 20px;
  background: linear-gradient(transparent, rgba(14, 26, 36, 0.85));
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.cb-stage-canvas__name {
  font-weight: 500;
  font-size: 0.9375rem;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
}

.cb-stage-canvas__indicators {
  display: flex;
  align-items: center;
  gap: 8px;
}

.cb-stage-canvas__indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(14, 26, 36, 0.7);
  color: var(--cb-amber);
}

.cb-stage-canvas__speaking {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--cb-success);
  box-shadow: 0 0 8px var(--cb-success);
  animation: cb-hand-pulse 1.2s ease infinite;
}

.cb-stage-canvas--sm .cb-stage-canvas__initial { font-size: 1.5rem; }
.cb-stage-canvas--sm .cb-stage-canvas__overlay { padding: 8px 12px; }
.cb-stage-canvas--sm .cb-stage-canvas__name { font-size: 0.75rem; }

.cb-stage-canvas--md .cb-stage-canvas__initial { font-size: 2.5rem; }
</style>
