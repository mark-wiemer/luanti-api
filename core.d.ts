import type { LtEntityDef, LtEntityStaticData, LtPointedThing } from "./entity";
import type { CraftRecipeCommon, CraftRecipeTypeMap, LtItemDef } from "./item";
import type { LtNode, LtNodeBoxType, LtNodeDef } from "./node";
import type { LtObjRef } from "./object";
import { LtParticleDef, LtParticleSpawnerDef } from "./particle";
import type {
  LtPlayer,
  LtPlayerJoinCallback,
  LtPlayerLeaveCallback,
} from "./player";
import type { LtVec3 } from "./vector";

export {};

export type LtInsecEnv = typeof globalThis;

export type Raycast = LuaIterable<LtPointedThing>;

export interface Privs {
  [key: string]: boolean;
}

export interface ChatCommandDef {
  /**
   * Short parameter description
   * "<name> <privilege>"
   */
  params: string;
  /**
   * Full description
   * "Remove privilege from player"
   */
  description: string;

  /**
   * Require the "privs" privilege to run
   * {privs=true}
   */
  privs?: Privs;

  /**
   * Called when command is run
   * Returns boolean success and text output.
   */
  func: (name: string, param: string) => LuaMultiReturn<[boolean, string]>;
}

export interface LuantiGlobal {
  register_on_joinplayer(this: void, cb: LtPlayerJoinCallback): void;
  register_on_leaveplayer(this: void, cb: LtPlayerLeaveCallback): void;
  register_on_shutdown(this: void, cb: () => void): void;
  chat_send_player(this: void, playerName: string, message: string): void;
  chat_send_all(this: void, message: string): void;

  request_insecure_environment(this: void): LtInsecEnv;
  get_modpath(this: void, modname: string): string;
  get_current_modname(this: void): string;

  // #region Registration functions
  // https://api.luanti.org/core-namespace-reference/#registration-functions
  // #region Environment
  // https://api.luanti.org/core-namespace-reference/#environment
  /**
   * Not recommended for general use. Instead, try:
   * - `register_craftitem`
   * - `register_tool`
   * - `register_node`
   * - `override_item`
   */
  register_item(this: void, name: string, itemDef: LtItemDef): void;
  /** https://api.luanti.org/core-namespace-reference/#environment */
  register_node<NodeBoxType extends LtNodeBoxType>(
    this: void,
    name: string,
    itemDef: LtNodeDef<NodeBoxType>
  ): void;
  /** https://api.luanti.org/core-namespace-reference/#environment */
  register_craftitem(this: void, name: string, itemDef: LtItemDef): void;
  /** https://api.luanti.org/core-namespace-reference/#environment */
  register_tool(this: void, name: string, itemDef: LtItemDef): void;
  /**
   * https://api.luanti.org/core-namespace-reference/#environment
   *
   * Override an item definition. Item must already be defined.
   */
  override_item(
    this: void,
    name: string,
    itemDef: LtItemDef,
    /** Fields to set to `nil`. Cannot include "name" or "type". */
    delFields?: string[]
  ): void;
  /** https://api.luanti.org/aliases/ */
  register_alias(this: void, alias: string, originalName: string): void;
  // #endregion Environment

  // #region Gameplay
  // https://api.luanti.org/core-namespace-reference/#gameplay
  register_craft<K extends keyof CraftRecipeTypeMap>(
    this: void,
    recipe: CraftRecipeTypeMap[K]
  ): void;
  clear_craft(this: void, recipe: CraftRecipeCommon<any>): void;
  // #endregion Gameplay
  // #endregion registration functions

  add_entity(
    this: void,
    pos: LtVec3,
    name: string,
    staticdata?: LtEntityStaticData
  ): LtObjRef;
  register_entity(this: void, name: string, enDef: Partial<LtEntityDef>): void;
  register_globalstep(
    this: void,
    cb: (this: void, dtime: number) => void
  ): void;
  get_player_by_name(this: void, name: string): LtPlayer | undefined;
  get_node_or_nil(this: void, pos: LtVec3): LtNode | undefined;
  get_node(this: void, pos: LtVec3): LtNode;

  after(this: void, time: number, func: () => void): void;
  get_gametime(this: void): number;

  raycast(
    this: void,
    from: LtVec3,
    to: LtVec3,
    objects?: boolean,
    liquids?: boolean
  ): Raycast;

  luaentities: { [key: string]: LtObjRef };
  object_refs: { [key: string]: LtObjRef };

  add_particle(this: void, partDef: LtParticleDef): number;
  add_particlespawner(this: void, partSpawnDef: LtParticleSpawnerDef): number;
  delete_particlespawner(this: void, id: number, playername?: string): void;
  unregister_chatcommand(this: void, name: string): void;
  register_privilege(
    this: void,
    name: string,
    cfg: string | { description: string; give_to_singleplayer: boolean }
  ): void;
  register_chatcommand(this: void, name: string, cmd: ChatCommandDef): void;
  get_objects_inside_radius(
    this: void,
    pos: LtVec3,
    radius: number
  ): LtObjRef[];
}

declare global {
  const core: LuantiGlobal;
}
