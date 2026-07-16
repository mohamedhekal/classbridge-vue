declare module '@classbridge/whiteboard/vue' {
  import type { DefineComponent } from 'vue';

  const ClassBridgeWhiteboard: DefineComponent<{
    writeMode?: 'everyone' | 'teacher_only';
    isTeacher?: boolean;
    authorId?: string;
    tool?: string;
  }>;

  export default ClassBridgeWhiteboard;
}
