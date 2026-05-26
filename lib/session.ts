export type Screen = "hero" | "ambience" | "intention" | "session" | "end";

export interface SessionState {
  screen: Screen;
  ambienceId: string | null;
  intentionId: string | null;
  startedAt: number | null;
}

export function createSession(): SessionState {
  return {
    screen: "hero",
    ambienceId: null,
    intentionId: null,
    startedAt: null,
  };
}

export function sessionDurationSeconds(state: SessionState): number {
  if (!state.startedAt) return 0;
  return Math.floor((Date.now() - state.startedAt) / 1000);
}
