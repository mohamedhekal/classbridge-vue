<script setup lang="ts">
import { computed } from 'vue';
import type { LayoutMode } from '@classbridge/sdk';
import ClassBridgeWhiteboard from '@classbridge/whiteboard/vue';

const props = withDefaults(
  defineProps<{
    layout: LayoutMode;
    writeMode?: 'everyone' | 'teacher_only';
    role?: 'teacher' | 'student';
  }>(),
  {
    writeMode: 'everyone',
    role: 'student',
  },
);

const isTeacher = computed(() => props.role === 'teacher');
</script>

<template>
  <div class="cb-workbench-host cb-stage-morph" role="region" :aria-label="`${layout} workbench`">
    <div v-if="layout === 'whiteboard'" class="cb-workbench-host__whiteboard">
      <ClassBridgeWhiteboard
        class="cb-workbench-host__live-board"
        :write-mode="writeMode"
        :is-teacher="isTeacher"
        tool="pen"
      />
    </div>

    <div v-else-if="layout === 'screen'" class="cb-workbench-host__screen">
      <div class="cb-workbench-host__screen-content">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" stroke-width="1.5"/>
          <path d="M8 21h8M12 17v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        <p>Screen share active</p>
      </div>
    </div>

    <slot v-else />
  </div>
</template>

<style scoped>
.cb-workbench-host {
  width: 100%;
  height: 100%;
  border-radius: var(--cb-radius-stage);
  overflow: hidden;
  background: var(--cb-surface-stage);
  border: 1px solid var(--cb-border);
}

.cb-workbench-host__whiteboard {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 280px;
}

.cb-workbench-host__live-board {
  flex: 1;
  width: 100%;
  height: 100%;
  min-height: 280px;
}

.cb-workbench-host__screen {
  display: grid;
  place-items: center;
  height: 100%;
  color: var(--cb-text-muted);
}

.cb-workbench-host__screen-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  font-family: var(--cb-font-ui);
}
</style>
