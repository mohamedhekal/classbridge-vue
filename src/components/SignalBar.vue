<script setup lang="ts">
import { computed } from 'vue';
import type { Reaction } from '@classbridge/sdk';

const props = defineProps<{
  reactions: Reaction[];
  handRaised?: boolean;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  raiseHand: [raised: boolean];
  react: [type: 'thumbsUp' | 'clap' | 'heart' | 'question'];
}>();

const reactionCounts = computed(() => {
  const counts: Record<string, number> = {};
  for (const r of props.reactions) {
    counts[r.type] = (counts[r.type] ?? 0) + 1;
  }
  return counts;
});

const reactionIcons: Record<string, string> = {
  thumbsUp: '👍',
  clap: '👏',
  heart: '❤️',
  question: '❓',
};
</script>

<template>
  <div class="cb-signal-bar" role="toolbar" aria-label="Signal bar">
    <div class="cb-signal-bar__reactions" aria-label="Reactions">
      <span
        v-for="(count, type) in reactionCounts"
        :key="type"
        class="cb-signal-bar__reaction-badge"
        :aria-label="`${count} ${type} reactions`"
      >
        {{ reactionIcons[type] ?? type }}
        <span class="cb-signal-bar__count">{{ count }}</span>
      </span>
    </div>

    <div class="cb-signal-bar__actions">
      <button
        class="cb-btn cb-btn--icon"
        :class="{ 'cb-btn--active cb-hand-pulse': handRaised }"
        :disabled="disabled"
        :aria-label="handRaised ? 'Lower hand' : 'Raise hand'"
        :aria-pressed="handRaised"
        @click="emit('raiseHand', !handRaised)"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M7 11V6a1.5 1.5 0 013 0v5M10 11V4.5a1.5 1.5 0 013 0V11M13 11V5a1.5 1.5 0 013 0v6l2.5 5.5H4.5L7 11z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
        </svg>
      </button>

      <button
        v-for="type in (['thumbsUp', 'clap', 'heart', 'question'] as const)"
        :key="type"
        class="cb-btn cb-btn--icon cb-btn--ghost"
        :disabled="disabled"
        :aria-label="`React with ${type}`"
        @click="emit('react', type)"
      >
        <span aria-hidden="true">{{ reactionIcons[type] }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.cb-signal-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  min-height: var(--cb-signal-height);
  background: rgba(21, 37, 50, 0.95);
  border-top: 1px solid var(--cb-border);
  backdrop-filter: blur(8px);
}

.cb-signal-bar__reactions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.cb-signal-bar__reaction-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 20px;
  background: rgba(244, 247, 245, 0.06);
  font-size: 0.875rem;
}

.cb-signal-bar__count {
  font-size: 0.75rem;
  color: var(--cb-text-muted);
  font-weight: 600;
}

.cb-signal-bar__actions {
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>
