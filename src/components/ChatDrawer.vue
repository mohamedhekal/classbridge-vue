<script setup lang="ts">
import { ref, nextTick, watch } from 'vue';
import type { ChatMessage } from '@classbridge/sdk';

const props = defineProps<{
  messages: ChatMessage[];
  open: boolean;
  position?: 'drawer' | 'side';
}>();

const emit = defineEmits<{
  close: [];
  send: [body: string];
}>();

const draft = ref('');
const listRef = ref<HTMLElement | null>(null);

watch(
  () => props.messages.length,
  async () => {
    await nextTick();
    if (listRef.value) {
      listRef.value.scrollTop = listRef.value.scrollHeight;
    }
  },
);

function handleSend(): void {
  const body = draft.value.trim();
  if (!body) return;
  emit('send', body);
  draft.value = '';
}

function handleKeydown(e: KeyboardEvent): void {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleSend();
  }
}
</script>

<template>
  <aside
    class="cb-chat-drawer"
    :class="[
      `cb-chat-drawer--${position ?? 'side'}`,
      { 'cb-chat-drawer--open': open },
    ]"
    role="complementary"
    aria-label="Chat"
    :aria-hidden="!open"
  >
    <header class="cb-chat-drawer__header">
      <h2 class="cb-chat-drawer__title">Chat</h2>
      <button class="cb-btn cb-btn--icon cb-btn--ghost" aria-label="Close chat" @click="emit('close')">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </button>
    </header>

    <div ref="listRef" class="cb-chat-drawer__messages" role="log" aria-live="polite" aria-relevant="additions">
      <div
        v-for="msg in messages"
        :key="msg.id"
        class="cb-chat-drawer__message"
        :class="{ 'cb-chat-drawer__message--private': msg.isPrivate }"
      >
        <span class="cb-chat-drawer__author">{{ msg.participantName }}</span>
        <span class="cb-chat-drawer__body">{{ msg.body }}</span>
        <time class="cb-chat-drawer__time" :datetime="new Date(msg.timestamp).toISOString()">
          {{ new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
        </time>
      </div>
      <p v-if="messages.length === 0" class="cb-chat-drawer__empty">No messages yet</p>
    </div>

    <form class="cb-chat-drawer__input" @submit.prevent="handleSend">
      <label for="cb-chat-input" class="cb-sr-only">Type a message</label>
      <input
        id="cb-chat-input"
        v-model="draft"
        type="text"
        placeholder="Type a message…"
        autocomplete="off"
        @keydown="handleKeydown"
      />
      <button type="submit" class="cb-btn cb-btn--primary cb-btn--icon" aria-label="Send message" :disabled="!draft.trim()">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M22 3L11 14M22 3l-7 18-4-7-7-4 18-7z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
        </svg>
      </button>
    </form>
  </aside>
</template>

<style scoped>
.cb-chat-drawer {
  display: flex;
  flex-direction: column;
  background: var(--cb-surface);
  border-inline-start: 1px solid var(--cb-border);
  width: var(--cb-rail-width);
  transition: transform var(--cb-duration-normal) var(--cb-ease-out);
}

.cb-chat-drawer--side {
  height: 100%;
}

.cb-chat-drawer--drawer {
  position: fixed;
  inset-inline: 0;
  bottom: 0;
  width: 100%;
  height: 60vh;
  border-radius: var(--cb-radius-lg) var(--cb-radius-lg) 0 0;
  border-inline-start: none;
  border-top: 1px solid var(--cb-border);
  transform: translateY(100%);
  z-index: 60;
  box-shadow: 0 -12px 40px rgba(0, 0, 0, 0.5);
}

.cb-chat-drawer--drawer.cb-chat-drawer--open {
  transform: translateY(0);
}

.cb-chat-drawer__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1px solid var(--cb-border);
}

.cb-chat-drawer__title {
  font-size: 0.9375rem;
  font-weight: 600;
  margin: 0;
}

.cb-chat-drawer__messages {
  flex: 1;
  overflow-y: auto;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cb-chat-drawer__message {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.cb-chat-drawer__message--private {
  padding-inline-start: 10px;
  border-inline-start: 2px solid var(--cb-amber);
}

.cb-chat-drawer__author {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--cb-primary);
}

.cb-chat-drawer__body {
  font-size: 0.875rem;
  color: var(--cb-text);
  word-break: break-word;
}

.cb-chat-drawer__time {
  font-size: 0.6875rem;
  color: var(--cb-text-subtle);
}

.cb-chat-drawer__empty {
  color: var(--cb-text-muted);
  font-size: 0.875rem;
  text-align: center;
  margin: auto;
}

.cb-chat-drawer__input {
  display: flex;
  gap: 8px;
  padding: 12px 16px;
  border-top: 1px solid var(--cb-border);
}

.cb-chat-drawer__input input {
  flex: 1;
  padding: 10px 14px;
  border: 1px solid var(--cb-border);
  border-radius: var(--cb-radius-md);
  background: var(--cb-surface-stage);
  color: var(--cb-text);
  font-family: var(--cb-font-ui);
  font-size: 0.875rem;
  outline: none;
  transition: border-color var(--cb-duration-fast);
}

.cb-chat-drawer__input input:focus {
  border-color: var(--cb-primary);
}

.cb-chat-drawer__input input::placeholder {
  color: var(--cb-text-subtle);
}
</style>
