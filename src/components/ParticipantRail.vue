<script setup lang="ts">
import type { Participant } from '@classbridge/sdk';
import StageCanvas from './StageCanvas.vue';

defineProps<{
  participants: Participant[];
  spotlightId?: string;
  layout?: 'horizontal' | 'vertical';
}>();
</script>

<template>
  <aside
    class="cb-participant-rail"
    :class="[`cb-participant-rail--${layout ?? 'vertical'}`]"
    role="list"
    aria-label="Participants"
  >
    <div
      v-for="(p, i) in participants"
      :key="p.id"
      class="cb-participant-rail__item cb-participant-enter"
      role="listitem"
      :style="{ animationDelay: `${i * 60}ms` }"
    >
      <StageCanvas
        :participant="p"
        :is-spotlight="p.id === spotlightId"
        size="sm"
      />
      <span v-if="p.handRaised" class="cb-participant-rail__hand cb-hand-pulse" aria-label="Hand raised">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M7 11V6a1.5 1.5 0 013 0v5M10 11V4.5a1.5 1.5 0 013 0V11M13 11V5a1.5 1.5 0 013 0v6l2.5 5.5H4.5L7 11z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
        </svg>
      </span>
    </div>
  </aside>
</template>

<style scoped>
.cb-participant-rail {
  display: flex;
  gap: 10px;
  padding: 12px;
  overflow: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--cb-border-strong) transparent;
}

.cb-participant-rail--vertical {
  flex-direction: column;
  max-height: 100%;
}

.cb-participant-rail--horizontal {
  flex-direction: row;
  overflow-x: auto;
  overflow-y: hidden;
}

.cb-participant-rail__item {
  position: relative;
  flex-shrink: 0;
  width: 120px;
  height: 80px;
  border-radius: var(--cb-radius-md);
  overflow: hidden;
}

.cb-participant-rail--horizontal .cb-participant-rail__item {
  width: 100px;
  height: 68px;
}

.cb-participant-rail__hand {
  position: absolute;
  top: 4px;
  inset-inline-end: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--cb-amber);
  color: var(--cb-ink);
  z-index: 2;
}

@media (max-width: 639px) {
  .cb-participant-rail--vertical {
    flex-direction: row;
    max-height: none;
    padding-block: 8px;
    padding-inline: 12px;
  }

  .cb-participant-rail__item {
    width: 88px;
    height: 60px;
  }
}
</style>
