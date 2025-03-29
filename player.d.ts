import type { LtObjRef } from "./object";

export type LtPlayer = LtObjRef;

export interface LtPlayerJoinCallback {
  (this: void, player: LtPlayer): void;
}

export interface LtPlayerLeaveCallback {
  (this: void, player: LtPlayer, timedout: boolean): void;
}

export interface PlayerAPI {}

declare global {
  const player_api: PlayerAPI;
}
