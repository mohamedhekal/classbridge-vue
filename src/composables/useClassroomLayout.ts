import { computed, ref, type Ref } from 'vue';
import type { LayoutMode } from '@classbridge/sdk';

export interface LayoutState {
  mode: LayoutMode;
  showWorkbench: boolean;
  showChat: boolean;
  showQuestions: boolean;
  chatPosition: 'drawer' | 'side';
  railPosition: 'inline-start' | 'inline-end';
}

export function useClassroomLayout(
  initialLayout: Ref<LayoutMode> | LayoutMode = 'lecture',
  direction: Ref<'ltr' | 'rtl'> | 'ltr' | 'rtl' = 'ltr',
) {
  const layout = ref<LayoutMode>(
    typeof initialLayout === 'object' ? initialLayout.value : initialLayout,
  );
  const dir = ref<'ltr' | 'rtl'>(typeof direction === 'object' ? direction.value : direction);
  const showWorkbench = ref(false);
  const showChat = ref(false);
  const showQuestions = ref(false);
  const viewportWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1280);

  const isMobile = computed(() => viewportWidth.value < 640);
  const isTablet = computed(() => viewportWidth.value >= 640 && viewportWidth.value < 1024);
  const isDesktop = computed(() => viewportWidth.value >= 1024);
  const isUltrawide = computed(() => viewportWidth.value >= 1600);
  const isLandscapePhone = computed(
    () => viewportWidth.value < 640 && typeof window !== 'undefined' && window.innerHeight < 500,
  );

  const chatPosition = computed<'drawer' | 'side'>(() =>
    isMobile.value ? 'drawer' : 'side',
  );

  const railPosition = computed<'inline-start' | 'inline-end'>(() =>
    dir.value === 'rtl' ? 'inline-start' : 'inline-end',
  );

  const stageClass = computed(() => ({
    'cb-layout-lecture': layout.value === 'lecture',
    'cb-layout-whiteboard': layout.value === 'whiteboard',
    'cb-layout-screen': layout.value === 'screen',
    'cb-layout-grid': layout.value === 'grid',
    'cb-layout-audio': layout.value === 'audioOnly',
  }));

  function setLayout(mode: LayoutMode): void {
    layout.value = mode;
    showWorkbench.value = mode === 'whiteboard' || mode === 'screen';
  }

  function toggleChat(): void {
    showChat.value = !showChat.value;
  }

  function toggleQuestions(): void {
    showQuestions.value = !showQuestions.value;
  }

  function updateViewport(): void {
    if (typeof window !== 'undefined') {
      viewportWidth.value = window.innerWidth;
    }
  }

  return {
    layout,
    dir,
    showWorkbench,
    showChat,
    showQuestions,
    isMobile,
    isTablet,
    isDesktop,
    isUltrawide,
    isLandscapePhone,
    chatPosition,
    railPosition,
    stageClass,
    setLayout,
    toggleChat,
    toggleQuestions,
    updateViewport,
  };
}
