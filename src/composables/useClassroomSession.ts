import { onMounted, onUnmounted, ref, shallowRef, type Ref } from 'vue';
import {
  ClassBridgeClient,
  type ChatMessage,
  type LayoutMode,
  type Participant,
  type Reaction,
  type Session,
} from '@classbridge/sdk';

export interface UseClassroomSessionOptions {
  sessionId: string;
  apiUrl: string;
  token?: string;
  displayName?: string;
  role?: 'teacher' | 'student';
}

export function useClassroomSession(options: Ref<UseClassroomSessionOptions> | UseClassroomSessionOptions) {
  const opts = ref(typeof options === 'object' && 'value' in options ? options.value : options);

  const client = shallowRef<ClassBridgeClient | null>(null);
  const session = ref<Session | null>(null);
  const localParticipant = ref<Participant | null>(null);
  const isConnecting = ref(false);
  const error = ref<string | null>(null);
  const handRaiseAnnouncements = ref<string[]>([]);

  const unsubscribers: (() => void)[] = [];

  async function connect(): Promise<void> {
    if (client.value?.isConnected()) return;

    isConnecting.value = true;
    error.value = null;

    try {
      const c = new ClassBridgeClient({
        apiUrl: opts.value.apiUrl,
        token: opts.value.token,
      });

      c.on('sessionUpdated', (s) => {
        session.value = s;
      });

      c.on('handRaised', ({ participantId, raised }) => {
        const participant = session.value?.participants.find((p) => p.id === participantId);
        if (participant && raised) {
          const msg = `${participant.name} raised their hand`;
          handRaiseAnnouncements.value = [...handRaiseAnnouncements.value.slice(-4), msg];
        }
      });

      c.on('chatMessage', (_msg: ChatMessage) => {
        // handled via session update
      });

      c.on('reaction', (_r: Reaction) => {
        // handled via session update
      });

      c.on('error', ({ message }) => {
        error.value = message;
      });

      client.value = c;

      await c.join({
        sessionId: opts.value.sessionId,
        displayName: opts.value.displayName ?? 'Guest',
        role: opts.value.role ?? 'student',
      });

      session.value = c.getSession();
      localParticipant.value = c.getLocalParticipant();
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Connection failed';
    } finally {
      isConnecting.value = false;
    }
  }

  async function disconnect(): Promise<void> {
    await client.value?.leave();
    client.value = null;
    session.value = null;
    localParticipant.value = null;
  }

  async function raiseHand(raised = true): Promise<void> {
    await client.value?.raiseHand(raised);
  }

  async function sendChat(body: string): Promise<void> {
    await client.value?.sendChat(body);
  }

  async function react(type: 'thumbsUp' | 'clap' | 'heart' | 'question'): Promise<void> {
    await client.value?.react(type);
  }

  async function setLayout(layout: LayoutMode): Promise<void> {
    await client.value?.setLayout(layout);
  }

  async function muteParticipant(participantId: string, muted: boolean): Promise<void> {
    await client.value?.muteParticipant(participantId, muted);
  }

  onMounted(() => {
    void connect();
  });

  onUnmounted(() => {
    unsubscribers.forEach((fn) => fn());
    void disconnect();
  });

  return {
    client,
    session,
    localParticipant,
    isConnecting,
    error,
    handRaiseAnnouncements,
    connect,
    disconnect,
    raiseHand,
    sendChat,
    react,
    setLayout,
    muteParticipant,
  };
}
