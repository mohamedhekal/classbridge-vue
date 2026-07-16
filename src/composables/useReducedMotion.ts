import { onMounted, onUnmounted, ref } from 'vue';

export function useReducedMotion() {
  const prefersReducedMotion = ref(false);

  let mediaQuery: MediaQueryList | null = null;

  function update(): void {
    if (typeof window !== 'undefined') {
      prefersReducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
  }

  onMounted(() => {
    if (typeof window === 'undefined') return;
    mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    update();
    mediaQuery.addEventListener('change', update);
  });

  onUnmounted(() => {
    mediaQuery?.removeEventListener('change', update);
  });

  return { prefersReducedMotion };
}
