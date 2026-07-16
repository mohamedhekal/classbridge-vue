<script setup lang="ts">
import { ref } from 'vue';
import type { LayoutMode } from '@classbridge/sdk';
import ClassBridgeRoom from '../src/components/ClassBridgeRoom.vue';

const sessionId = ref('demo-session-001');
const layout = ref<LayoutMode>('lecture');
const direction = ref<'ltr' | 'rtl'>('ltr');
const role = ref<'teacher' | 'student'>('student');
const locale = ref('en');
const displayName = ref('Ahmed Hassan');

const layouts: LayoutMode[] = ['lecture', 'whiteboard', 'screen', 'grid', 'audioOnly'];

function toggleDirection(): void {
  direction.value = direction.value === 'ltr' ? 'rtl' : 'ltr';
  locale.value = direction.value === 'rtl' ? 'ar' : 'en';
}

function toggleRole(): void {
  role.value = role.value === 'teacher' ? 'student' : 'teacher';
  displayName.value = role.value === 'teacher' ? 'Dr. Amira Hassan' : 'Ahmed Hassan';
}
</script>

<template>
  <div class="playground">
    <nav class="playground__controls" aria-label="Playground controls">
      <span class="playground__brand">ClassBridge Playground</span>

      <div class="playground__group">
        <label for="layout-select">Layout</label>
        <select id="layout-select" v-model="layout">
          <option v-for="l in layouts" :key="l" :value="l">{{ l }}</option>
        </select>
      </div>

      <button class="playground__btn" @click="toggleDirection">
        {{ direction === 'rtl' ? 'RTL ←' : 'LTR →' }}
      </button>

      <button class="playground__btn" @click="toggleRole">
        Role: {{ role }}
      </button>
    </nav>

    <div class="playground__room">
      <ClassBridgeRoom
        :session-id="sessionId"
        :layout="layout"
        :locale="locale"
        :direction="direction"
        :role="role"
        :display-name="displayName"
        api-url="https://api.classbridge.local"
      />
    </div>
  </div>
</template>

<style scoped>
.playground {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: var(--cb-ink);
}

.playground__controls {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 10px 16px;
  background: #0a1219;
  border-bottom: 1px solid rgba(244, 247, 245, 0.08);
  flex-shrink: 0;
  flex-wrap: wrap;
  z-index: 200;
}

.playground__brand {
  font-family: var(--cb-font-display);
  font-weight: 600;
  color: var(--cb-primary);
  font-size: 0.9375rem;
  margin-inline-end: auto;
}

.playground__group {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8125rem;
  color: var(--cb-text-muted);
}

.playground__group select {
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid rgba(244, 247, 245, 0.12);
  background: #152532;
  color: var(--cb-chalk);
  font-family: var(--cb-font-ui);
  font-size: 0.8125rem;
}

.playground__btn {
  padding: 6px 14px;
  border-radius: 6px;
  border: 1px solid rgba(244, 247, 245, 0.12);
  background: #152532;
  color: var(--cb-chalk);
  font-family: var(--cb-font-ui);
  font-size: 0.8125rem;
  cursor: pointer;
  transition: background 150ms;
}

.playground__btn:hover {
  background: rgba(244, 247, 245, 0.08);
}

.playground__room {
  flex: 1;
  min-height: 0;
  overflow: hidden;
}
</style>
