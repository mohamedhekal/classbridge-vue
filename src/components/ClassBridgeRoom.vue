<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, toRef, watch } from 'vue';
import type { LayoutMode } from '@classbridge/sdk';
import { useClassroomLayout } from '../composables/useClassroomLayout';
import { useClassroomSession } from '../composables/useClassroomSession';
import { useReducedMotion } from '../composables/useReducedMotion';
import WaitingLobby from './WaitingLobby.vue';
import StageCanvas from './StageCanvas.vue';
import ParticipantRail from './ParticipantRail.vue';
import TeacherDock from './TeacherDock.vue';
import SignalBar from './SignalBar.vue';
import WorkbenchHost from './WorkbenchHost.vue';
import ChatDrawer from './ChatDrawer.vue';
import QuestionsPanel from './QuestionsPanel.vue';
import PollOverlay from './PollOverlay.vue';
import UnmuteRequestCard from './UnmuteRequestCard.vue';
import SessionEndSummary from './SessionEndSummary.vue';

const props = withDefaults(
  defineProps<{
    sessionId: string;
    token?: string;
    apiUrl?: string;
    layout?: LayoutMode;
    locale?: string;
    direction?: 'ltr' | 'rtl';
    role?: 'teacher' | 'student';
    displayName?: string;
  }>(),
  {
    apiUrl: 'https://api.classbridge.local',
    layout: 'lecture',
    locale: 'en',
    direction: 'ltr',
    role: 'student',
    displayName: 'Guest',
  },
);

const layoutRef = toRef(props, 'layout');
const directionRef = toRef(props, 'direction');

const {
  layout,
  showChat,
  showQuestions,
  isMobile,
  isDesktop,
  isUltrawide,
  isLandscapePhone,
  chatPosition,
  setLayout,
  toggleChat,
  toggleQuestions,
  updateViewport,
} = useClassroomLayout(layoutRef, directionRef);

const {
  session,
  localParticipant,
  isConnecting,
  error,
  handRaiseAnnouncements,
  raiseHand,
  sendChat,
  react,
  setLayout: setSessionLayout,
  muteParticipant,
  disconnect,
} = useClassroomSession(
  computed(() => ({
    sessionId: props.sessionId,
    apiUrl: props.apiUrl,
    token: props.token,
    displayName: props.displayName,
    role: props.role,
  })),
);

const { prefersReducedMotion } = useReducedMotion();

const isLocked = ref(false);
const showUnmuteRequest = ref(false);
const showPoll = ref(false);
const showEndSummary = ref(false);

watch(layoutRef, (mode) => {
  setLayout(mode);
  void setSessionLayout(mode);
});

const isWaiting = computed(() => session.value?.status === 'waiting');
const isLive = computed(() => session.value?.status === 'live');
const isEnded = computed(() => session.value?.status === 'ended');

const teacher = computed(() =>
  session.value?.participants.find((p) => p.role === 'teacher'),
);

const students = computed(() =>
  session.value?.participants.filter((p) => p.role === 'student') ?? [],
);

const spotlightParticipant = computed(() => {
  if (layout.value === 'grid') return null;
  return teacher.value ?? session.value?.participants[0] ?? null;
});

const handRaised = computed(() => localParticipant.value?.handRaised ?? false);

const sessionDuration = computed(() => {
  if (!session.value?.startedAt) return undefined;
  const end = session.value.endedAt ?? Date.now();
  const mins = Math.round((end - session.value.startedAt) / 60000);
  return `${mins} min`;
});

function handleMuteAll(): void {
  for (const p of students.value) {
    void muteParticipant(p.id, true);
  }
}

function handleEndSession(): void {
  void disconnect();
  showEndSummary.value = true;
}

function handleAdmit(_participantId: string): void {
  // Mock admit — session auto-transitions in SDK
}

onMounted(() => {
  updateViewport();
  window.addEventListener('resize', updateViewport);
  setLayout(props.layout);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateViewport);
});
</script>

<template>
  <div
    class="cb-root cb-room"
    :class="{
      'cb-reduced-motion': prefersReducedMotion,
      'cb-landscape-focus': isLandscapePhone,
    }"
    :dir="direction"
    :lang="locale"
    role="application"
    aria-label="ClassBridge classroom"
  >
    <!-- Live region for hand raises -->
    <div aria-live="assertive" aria-atomic="true" class="cb-sr-only">
      <span v-for="(msg, i) in handRaiseAnnouncements" :key="i">{{ msg }}</span>
    </div>

    <!-- Waiting lobby -->
    <WaitingLobby
      v-if="isWaiting"
      :session-title="session?.title"
      :display-name="displayName"
      :is-connecting="isConnecting"
    />

    <!-- Session ended -->
    <SessionEndSummary
      v-else-if="isEnded || showEndSummary"
      :session-title="session?.title"
      :duration="sessionDuration"
      :participant-count="session?.participants.length"
      @close="showEndSummary = false"
    />

    <!-- Live learning stage -->
    <template v-else-if="isLive">
      <div class="cb-room__shell">
        <!-- Top bar -->
        <header class="cb-room__header">
          <h1 class="cb-room__title">{{ session?.title }}</h1>
          <div class="cb-room__header-actions">
            <button
              class="cb-btn cb-btn--icon cb-btn--ghost"
              :class="{ 'cb-btn--active': showChat }"
              aria-label="Toggle chat"
              :aria-expanded="showChat"
              @click="toggleChat"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M21 12c0 4.418-4.03 8-9 8-1.01 0-1.98-.14-2.88-.4L3 21l1.4-4.2C3.5 15.5 3 13.8 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
              </svg>
            </button>
            <button
              class="cb-btn cb-btn--icon cb-btn--ghost"
              :class="{ 'cb-btn--active': showQuestions }"
              aria-label="Toggle questions"
              :aria-expanded="showQuestions"
              @click="toggleQuestions"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>
                <path d="M9.5 9.5a2.5 2.5 0 015 0c0 2-2.5 1.5-2.5 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                <circle cx="12" cy="17" r="0.5" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </header>

        <!-- Main stage area -->
        <div class="cb-room__body" :class="{ 'cb-room__body--ultrawide': isUltrawide }">
          <main class="cb-room__stage" role="main" aria-label="Learning stage">
            <WorkbenchHost
              v-if="layout === 'whiteboard' || layout === 'screen'"
              :layout="layout"
              :role="role"
              write-mode="everyone"
            />
            <StageCanvas
              v-else-if="spotlightParticipant && layout !== 'grid'"
              :participant="spotlightParticipant"
              is-spotlight
              size="lg"
            />
            <div v-else-if="layout === 'grid'" class="cb-room__grid">
              <StageCanvas
                v-for="p in session?.participants"
                :key="p.id"
                :participant="p"
                size="md"
              />
            </div>
            <div v-else-if="layout === 'audioOnly'" class="cb-room__audio-only">
              <div class="cb-room__audio-avatar">
                {{ teacher?.name.charAt(0) ?? 'T' }}
              </div>
              <p>{{ teacher?.name ?? 'Teacher' }}</p>
              <span class="cb-room__audio-label">Audio only</span>
            </div>
          </main>

          <!-- Participant rail -->
          <ParticipantRail
            v-if="!isLandscapePhone && layout !== 'grid'"
            class="cb-room__rail"
            :participants="students"
            :spotlight-id="spotlightParticipant?.id"
            :layout="isMobile ? 'horizontal' : 'vertical'"
          />
        </div>

        <!-- Signal bar -->
        <SignalBar
          :reactions="session?.reactions ?? []"
          :hand-raised="handRaised"
          @raise-hand="raiseHand"
          @react="react"
        />

        <!-- Teacher dock -->
        <TeacherDock
          v-if="role === 'teacher'"
          :waiting-participants="[]"
          :is-locked="isLocked"
          @admit="handleAdmit"
          @mute-all="handleMuteAll"
          @lock="isLocked = $event"
          @end-session="handleEndSession"
        />
      </div>

      <!-- Chat drawer -->
      <ChatDrawer
        :messages="session?.chat ?? []"
        :open="showChat"
        :position="chatPosition"
        @close="showChat = false"
        @send="sendChat"
      />

      <!-- Questions panel (desktop side) -->
      <QuestionsPanel
        v-if="showQuestions && isDesktop"
        :open="showQuestions"
        @close="showQuestions = false"
      />

      <!-- Poll overlay -->
      <PollOverlay
        :active="showPoll"
        question="Which reaction mechanism applies here?"
        :options="['SN1', 'SN2', 'E1', 'E2']"
        @vote="showPoll = false"
        @close="showPoll = false"
      />

      <!-- Unmute request -->
      <UnmuteRequestCard
        v-if="showUnmuteRequest"
        :teacher-name="teacher?.name"
        @accept="showUnmuteRequest = false"
        @decline="showUnmuteRequest = false"
      />
    </template>

    <!-- Error state -->
    <div v-if="error" class="cb-room__error" role="alert">
      {{ error }}
    </div>
  </div>
</template>

<style scoped>
.cb-room {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.cb-room__shell {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
}

.cb-room__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  background: var(--cb-surface);
  border-bottom: 1px solid var(--cb-border);
  flex-shrink: 0;
}

.cb-room__title {
  font-family: var(--cb-font-display);
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cb-room__header-actions {
  display: flex;
  gap: 4px;
  flex-shrink: 0;
}

.cb-room__body {
  display: flex;
  flex: 1;
  min-height: 0;
  gap: 0;
}

.cb-room__body--ultrawide .cb-room__stage {
  max-width: var(--cb-stage-max-width);
  margin-inline: auto;
}

.cb-room__stage {
  flex: 1;
  min-width: 0;
  min-height: 0;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--cb-ink);
}

.cb-room__rail {
  width: var(--cb-rail-width);
  flex-shrink: 0;
  background: var(--cb-surface);
  border-inline-start: 1px solid var(--cb-border);
}

.cb-room__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 12px;
  width: 100%;
  height: 100%;
  padding: 8px;
}

.cb-room__audio-only {
  text-align: center;
  color: var(--cb-text-muted);
}

.cb-room__audio-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--cb-surface-raised), var(--cb-surface));
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--cb-font-display);
  font-size: 3rem;
  color: var(--cb-primary);
  margin: 0 auto 16px;
  border: 2px solid var(--cb-border-strong);
}

.cb-room__audio-label {
  display: inline-block;
  margin-top: 8px;
  padding: 4px 12px;
  border-radius: 20px;
  background: rgba(31, 166, 160, 0.15);
  color: var(--cb-primary);
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.cb-room__error {
  position: fixed;
  bottom: 16px;
  inset-inline: 16px;
  padding: 12px 16px;
  background: rgba(224, 90, 90, 0.15);
  border: 1px solid rgba(224, 90, 90, 0.4);
  border-radius: var(--cb-radius-md);
  color: #f08080;
  text-align: center;
  z-index: 100;
}

/* Mobile: full-bleed stage, horizontal rail */
@media (max-width: 639px) {
  .cb-room__body {
    flex-direction: column;
  }

  .cb-room__stage {
    padding: 8px;
    flex: 1;
  }

  .cb-room__rail {
    width: 100%;
    border-inline-start: none;
    border-top: 1px solid var(--cb-border);
    order: 1;
  }

  .cb-room__stage {
    order: 0;
  }
}

/* Tablet: stage + side rail */
@media (min-width: 640px) and (max-width: 1023px) {
  .cb-room__rail {
    width: 200px;
  }
}
</style>
