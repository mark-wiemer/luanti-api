import { LtTileAnimDef, LtTileAnimTypeMap } from "./node";
import { LtObjRef } from "./object";
import { LtVec3 } from "./vector";

export interface LtParticleDef {
  pos: LtVec3;
  velocity: LtVec3;
  /**Spawn particle at pos with velocity and acceleration*/
  acceleration: LtVec3;
  /**Disappears after expirationtime seconds*/
  expirationtime: number;
  size: number;
  /**collisiondetection: if true collides with physical objects*/
  collisiondetection: boolean;
  /**collision_removal: if true then particle is removed when it collides
   * requires collisiondetection = true to have any effect
   */
  collision_removal: boolean;
  /**vertical: if true faces player using y axis only*/
  vertical: boolean;
  texture: string;

  /**optional, if specified spawns particle only on the player's client*/
  playername?: string;

  /**optional, specifies how to animate the particle texture*/
  animation?: LtTileAnimDef<keyof LtTileAnimTypeMap>;
  /**optional, specify particle self-luminescence in darkness*/
  glow?: number;
}

export interface LtParticleSpawnerDef {
  amount: number;
  /**If time is 0 has infinite lifespan and spawns the amount on a per-second base*/
  time: number;
  minpos: LtVec3;
  maxpos: LtVec3;
  minvel: LtVec3;
  maxvel: LtVec3;
  minacc: LtVec3;
  maxacc: LtVec3;
  minexptime: number;
  maxexptime: number;
  minsize: number;
  maxsize: number;
  /**The particle's properties are random values in between the bounds:
   * minpos/maxpos, minvel/maxvel (velocity), minacc/maxacc (acceleration),
   * minsize/maxsize, minexptime/maxexptime (expirationtime)
   */

  collisiondetection: boolean;
  collision_removal?: boolean;

  /**attached: if defined, particle positions, velocities and accelerations*/
  attached: LtObjRef;
  /**are relative to this object's position and yaw*/
  vertical: boolean;
  texture: string;
  /**Playername is optional, if specified spawns particle only on the player's client*/
  playername?: string;
}
