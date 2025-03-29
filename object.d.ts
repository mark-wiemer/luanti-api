import type { LtColorSpec } from "./color";
import { LtInvRef } from "./inventory";
import type { LtCollisionBox } from "./node";
import type { LtVec2, LtVec3 } from "./vector";

export interface LtPressedKeys {
  jump: boolean;
  right: boolean;
  left: boolean;
  LMB: boolean;
  RMB: boolean;
  sneak: boolean;
  aux1: boolean;
  down: boolean;
  up: boolean;
}

export interface LtPhysicsOverride {
  speed: number;
  jump: number;
  gravity: number;
  sneak: boolean;
  sneak_glitch: boolean;
  new_move: boolean;
}

export interface LtObjRef {
  object: LtObjRef;
  name: string;

  set_bone_position(bone: string, position: LtVec3, rotation: LtVec3): void;
  get_bone_position(bone: string): [LtVec3, LtVec3];
  get_pos(): LtVec3;
  set_pos(v: LtVec3): void;
  get_player_name(): string;
  is_player(): boolean;
  /**@deprecated: use get_velocity()*/
  get_player_velocity(): LtVec3 | undefined;
  get_look_dir(): LtVec3;
  get_look_vertical(): number;
  get_look_horizontal(): number;
  set_look_vertical(rads: number): void;
  set_look_horizontal(rads: number): void;
  get_breath(): number;
  set_breath(b: number): void;
  set_attribute(k: string, v: string): void;
  get_attribute(k: string): string;
  get_player_control(): LtPressedKeys;
  set_physics_override(config: LtPhysicsOverride): void;
  get_physics_override(): LtPhysicsOverride;
  set_local_animation(
    standIdle: LtVec2,
    walk: LtVec2,
    dig: LtVec2,
    walkDig: LtVec2,
    frame_speed: number
  ): void;
  get_local_animation(): [LtVec2, LtVec2, LtVec2, LtVec2, number];
  /**Third person max values: {x=-10/10,y=-10,15,z=-5/5}*/
  set_eye_offset(fp: LtVec3, tp: LtVec3): void;
  get_eye_offsets(): [LtVec3, LtVec3];

  set_attach(
    parent: LtObjRef,
    bone?: string,
    position?: LtVec3,
    rotation?: LtVec3
  ): void;
  get_attach(): LuaMultiReturn<[LtObjRef, string, LtVec3, LtVec3]>;
  set_detach(): void;

  remove(): void;

  set_velocity(v: LtVec3): void;
  get_velocity(): LtVec3;
  set_acceleration(a: LtVec3): void;
  get_acceleration(): LtVec3;
  set_yaw(radians: number): void;
  get_yaw(): number;
  set_texture_mod(mod: string): void;
  get_texture_mod(): string;
  set_sprite(
    p: LtVec2,
    num_frames: number,
    framelength: number,
    select_horiz_by_yawpitch: boolean
  ): void;
  //Select sprite from spritesheet with optional animation and DM-style texture selection based on yaw relative to camera
  /**@deprecated: Will be removed in a future version - use .name*/
  get_entity_name(): string;
  get_luaentity(): LtObjRef;

  get_inventory(): LtInvRef;
}

export interface LtObjProperties {
  hp_max: number;
  physical: boolean;
  //collide with other objects if physical=true
  collide_with_objects: boolean;
  weight: number;
  collisionbox: LtCollisionBox;
  visual: "cube" | "sprite" | "upright_sprite" | "mesh" | "wielditem";
  visual_size: LtVec2;
  mesh: string;
  textures: string | Array<string>;
  colors: string | Array<string>;
  spritediv: LtVec2;
  initial_sprite_basepos: LtVec2;
  is_visible: boolean;
  makes_footstep_sound: boolean;
  automatic_rotate: boolean;
  stepheight: number;
  /** automatically set yaw to movement direction; offset in degrees; false to disable*/
  automatic_face_movement_dir: number;

  /**limit automatic rotation to this value in degrees per second. values < 0 no limit*/
  automatic_face_movement_max_rotation_per_sec: number;
  /**false to disable backface_culling for model*/
  backface_culling: boolean;
  /**by default empty, for players their name is shown if empty*/
  nametag: string;
  nametag_color: LtColorSpec;
  /**by default empty, text to be shown when pointed at object*/
  infotext: string;
}
