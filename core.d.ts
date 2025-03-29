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

/** https://api.luanti.org/core-namespace-reference/ */
export interface LuantiGlobal {
  // #region Utilities
  //* https://api.luanti.org/core-namespace-reference/#utilities
  get_current_modname(this: void): string;
  get_modpath(this: void, modname: string): string;
  // todo get_modnames
  // todo get_game_info
  // todo get_worldpath
  // todo get_mod_data_path
  // todo is_singleplayer
  // todo features
  // todo has_feature
  // todo get_player_information
  // todo protocol_versions
  // todo get_player_window_information
  // todo mkdir
  // todo rmdir
  // todo cpdir
  // todo mvdir
  // todo get_dir_list
  // todo safe_file_write
  // todo get_version
  // todo sha1
  // todo sha256
  // todo colorspec_to_colorstring
  // todo colorspec_to_bytes
  // todo colorspec_to_table
  // todo time_to_day_night_ratio
  // todo encode_png
  // todo urlencode
  // #endregion Utilities

  // #region Logging
  //* https://api.luanti.org/core-namespace-reference/#logging
  // todo debug
  // todo log
  // #endregion Logging

  // #region Registration functions
  //* https://api.luanti.org/core-namespace-reference/#registration-functions
  // #region Environment
  //* https://api.luanti.org/core-namespace-reference/#environment
  register_node<NodeBoxType extends LtNodeBoxType>(
    this: void,
    name: string,
    itemDef: LtNodeDef<NodeBoxType>
  ): void;
  register_craftitem(this: void, name: string, itemDef: LtItemDef): void;
  register_tool(this: void, name: string, itemDef: LtItemDef): void;
  override_item(
    this: void,
    name: string,
    itemDef: LtItemDef,
    /** Fields to set to `nil`. Cannot include "name" or "type". */
    delFields?: string[]
  ): void;
  // todo unregister_item
  register_entity(this: void, name: string, enDef: Partial<LtEntityDef>): void;
  // todo register_abm
  // todo register_lbm
  register_alias(this: void, alias: string, originalName: string): void;
  // todo register_alias_force
  // todo register_ore
  // todo register_biome
  // todo unregister_biome
  // todo register_decoration
  // todo register_schematic
  // todo clear_registered_biomes
  // todo clear_registered_decorations
  // todo clear_registered_ores
  // todo clear_registered_schematics
  //* Not currently included in API docs
  /**
   * Not recommended for general use. Instead, try:
   * - `register_craftitem`
   * - `register_tool`
   * - `register_node`
   * - `override_item`
   */
  register_item(this: void, name: string, itemDef: LtItemDef): void;
  // #endregion Environment

  // #region Gameplay
  //* https://api.luanti.org/core-namespace-reference/#gameplay
  register_craft<K extends keyof CraftRecipeTypeMap>(
    this: void,
    recipe: CraftRecipeTypeMap[K]
  ): void;
  clear_craft(this: void, recipe: CraftRecipeCommon<any>): void;
  register_chatcommand(this: void, name: string, cmd: ChatCommandDef): void;
  // todo override_chatcommand
  unregister_chatcommand(this: void, name: string): void;
  register_privilege(
    this: void,
    name: string,
    cfg: string | { description: string; give_to_singleplayer: boolean }
  ): void;
  // todo register_authentication_handler
  // #endregion Gameplay
  // #endregion registration functions

  // #region Global callback registration functions
  //* https://api.luanti.org/core-namespace-reference/#global-callback-registration-functions
  register_globalstep(
    this: void,
    cb: (this: void, dtime: number) => void
  ): void;
  // todo register_on_mods_loaded
  register_on_shutdown(this: void, cb: () => void): void;
  // todo register_on_placenode
  // todo register_on_dignode
  // todo register_on_punchnode
  // todo register_on_generated
  // todo register_on_newplayer
  // todo register_on_punchplayer
  // todo register_on_rightclickplayer
  // todo register_on_player_hpchange
  // todo register_on_dieplayer
  // todo register_on_respawnplayer
  // todo register_on_prejoinplayer
  register_on_joinplayer(this: void, cb: LtPlayerJoinCallback): void;
  register_on_leaveplayer(this: void, cb: LtPlayerLeaveCallback): void;
  // todo register_on_authplayer
  // todo register_on_auth_fail
  // todo register_on_cheat
  // todo register_on_chat_message
  // todo register_on_chatcommand
  // todo register_on_player_receive_fields
  // todo register_on_craft
  // todo register_craft_predict
  // todo register_allow_player_inventory_action
  // todo register_on_player_inventory_action
  // todo register_on_protection_violation
  // todo register_on_item_eat
  // todo register_on_item_pickup
  // todo register_on_priv_grant
  // todo register_on_priv_revoke
  // todo register_can_bypass_userlimit
  // todo register_on_modchannel_message
  // todo register_on_liquid_transformed
  // todo register_on_mapblocks_changed
  // #endregrion Global callback registration functions

  // todo https://api.luanti.org/core-namespace-reference/#setting-related and below

  //* Unorganized definitions
  chat_send_player(this: void, playerName: string, message: string): void;
  chat_send_all(this: void, message: string): void;
  request_insecure_environment(this: void): LtInsecEnv;
  add_entity(
    this: void,
    pos: LtVec3,
    name: string,
    staticdata?: LtEntityStaticData
  ): LtObjRef;
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
  get_objects_inside_radius(
    this: void,
    pos: LtVec3,
    radius: number
  ): LtObjRef[];
}

declare global {
  const core: LuantiGlobal;
}
