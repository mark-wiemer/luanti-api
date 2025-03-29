import type { LtToolCapabilities } from "./item";
import type { LtObjRef, LtObjProperties } from "./object";
import type { LtVec3 } from "./vector";

export interface LtPointedThing {
  type: "nothing" | "node" | "object";
  under?: LtVec3;
  above?: LtVec3;
  ref?: LtObjRef;
}

export type LtEntityStaticData = string;

export interface LtEntityOnActivate {
  (this: LtObjRef, staticdata: LtEntityStaticData, dtime_s: number): void;
}
export interface LtEntityOnStep {
  (this: LtObjRef, dtime: number): void;
}
export interface LtEntityOnPunch {
  (
    this: LtObjRef,
    puncher: LtObjRef | undefined,
    time_from_last_punch: number,
    tool_capabilities: LtToolCapabilities,
    dir: LtVec3
  ): void;
}
export interface LtEntityOnRightClick {
  (this: LtObjRef, clicker: LtObjRef | undefined): void;
}
export interface LtEntityGetStaticDataCallback {
  (this: LtObjRef): LtEntityStaticData;
}

export interface LtEntityDef extends LtObjProperties {
  /** @deprecated
   * Everything in object properties is read directly from here
   */
  initial_properties: Partial<LtObjProperties>;

  on_activate: LtEntityOnActivate;
  on_step: LtEntityOnStep;
  on_punch: LtEntityOnPunch;
  on_rightclick: LtEntityOnRightClick;
  /**
   * Called sometimes; the string returned is passed to on_activate when
   * the entity is re-activated from static state
   */
  get_staticdata: LtEntityGetStaticDataCallback;

  [_custom: string]: any;

  /**
   * Also you can define arbitrary member variables here (see item definition for
  -- more info)
  */
}
