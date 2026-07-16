import ClassBridgeRoom from './components/ClassBridgeRoom.vue';
import StageCanvas from './components/StageCanvas.vue';
import ParticipantRail from './components/ParticipantRail.vue';
import WaitingLobby from './components/WaitingLobby.vue';
import TeacherDock from './components/TeacherDock.vue';
import SignalBar from './components/SignalBar.vue';
import WorkbenchHost from './components/WorkbenchHost.vue';
import ChatDrawer from './components/ChatDrawer.vue';
import QuestionsPanel from './components/QuestionsPanel.vue';
import PollOverlay from './components/PollOverlay.vue';
import UnmuteRequestCard from './components/UnmuteRequestCard.vue';
import SessionEndSummary from './components/SessionEndSummary.vue';

export { useClassroomLayout } from './composables/useClassroomLayout';
export { useClassroomSession } from './composables/useClassroomSession';
export { useReducedMotion } from './composables/useReducedMotion';

export {
  ClassBridgeRoom,
  StageCanvas,
  ParticipantRail,
  WaitingLobby,
  TeacherDock,
  SignalBar,
  WorkbenchHost,
  ChatDrawer,
  QuestionsPanel,
  PollOverlay,
  UnmuteRequestCard,
  SessionEndSummary,
};

export type { LayoutState } from './composables/useClassroomLayout';
export type { UseClassroomSessionOptions } from './composables/useClassroomSession';

import './themes/tokens.css';
