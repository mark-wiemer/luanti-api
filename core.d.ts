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
// Region titles come from the API docs
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
  // #endregion Global callback registration functions

  // #region Setting-related
  //* https://api.luanti.org/core-namespace-reference/#setting-related
  // todo string_to_privs
  // todo privs_to_string
  // todo get_player_privs
  // todo check_player_privs
  // todo check_password_entry
  // todo get_password_hash
  // todo get_player_ip
  // todo get_auth_handler
  // todo notify_authentication_modified
  // todo set_player_password
  // todo set_player_privs
  // todo change_player_privs
  // todo auth_reload
  // #endregion Setting-related

  // #region Chat
  //* https://api.luanti.org/core-namespace-reference/#chat
  chat_send_all(this: void, message: string): void;
  chat_send_player(this: void, playerName: string, message: string): void;
  // todo format_chat_message
  // #endregion Chat

  // #region Environment access
  //* https://api.luanti.org/core-namespace-reference/#environment-access
  // todo set_node
  // todo add_node
  // todo bulk_set_node
  // todo swap_node
  // todo bulk_swap_node
  // todo remove_node
  get_node(this: void, pos: LtVec3): LtNode;
  get_node_or_nil(this: void, pos: LtVec3): LtNode | undefined;
  // todo get_node_light
  // todo get_natural_light
  // todo get_artificial_light
  // todo place_node
  // todo dig_node
  // todo punch_node
  // todo spawn_falling_node
  // todo find_nodes_with_meta
  // todo get_meta
  // todo get_node_timer
  add_entity(
    this: void,
    pos: LtVec3,
    name: string,
    staticdata?: LtEntityStaticData
  ): LtObjRef;
  // todo add_item
  get_player_by_name(this: void, name: string): LtPlayer | undefined;
  get_objects_inside_radius(
    this: void,
    pos: LtVec3,
    radius: number
  ): LtObjRef[];
  // todo objects_inside_radius
  // todo get_objects_in_area
  // todo objects_in_area
  // todo set_timeofday
  // todo get_timeofday
  get_gametime(this: void): number;
  // todo get_day_count
  // todo find_node_near
  // todo find_nodes_in_area
  // todo find_nodes_in_area_under_air
  // todo get_perlin (not the deprecated one)
  // todo get_voxel_manip
  // todo set_gen_notify
  // todo get_gen_notify
  // todo get_decoration_id
  // todo get_mapgen_object
  // todo get_heat
  // todo get_humidity
  // todo get_biome_data
  // todo get_biome_id
  // todo get_biome_name
  // todo get_mapgen_params
  // todo set_mapgen_params
  // todo get_mapgen_edges
  // todo get_mapgen_setting
  // todo get_mapgen_setting_noiseparams
  // todo set_mapgen_setting
  // todo set_mapgen_setting_noiseparams
  // todo set_noiseparams
  // todo get_noiseparams
  // todo generate_ores
  // todo generate_decorations
  // todo clear_objects
  // todo load_area
  // todo emerge_area
  // todo delete_area
  // todo line_of_sight
  // todo raycast
  // todo find_path
  // todo spawn_tree
  // todo spawn_tree_on_vmanip
  // todo transforming_liquid_add
  // todo get_node_max_level
  // todo get_node_level
  // todo set_node_level
  // todo add_node_level
  // todo get_node_boxes
  // todo fix_light
  // todo check_single_for_falling
  // todo check_for_falling
  // todo get_spawn_level
  // #endregion Environment access

  // #region Mod channels
  //* https://api.luanti.org/core-namespace-reference/#mod-channels
  // todo mod_channel_join
  // #endregion Mod channels

  // #region Inventory
  //* https://api.luanti.org/core-namespace-reference/#inventory
  // todo get_inventory
  // todo create_detached_inventory
  // todo remove_detached_inventory
  // todo do_item_eat
  // #endregion Inventory

  // #region Formspec
  //* https://api.luanti.org/core-namespace-reference/#formspec
  // todo show_formspec
  // todo close_formspec
  // todo formspec_escape
  // todo hypertext_escape
  // todo explode_table_event
  // todo explode_textlist_event
  // todo explode_scrollbar_event
  // todo show_death_screen
  // #endregion Formspec

  // #region Item handling
  //* https://api.luanti.org/core-namespace-reference/#item-handling
  // todo inventorycube
  // todo get_pointed_thing_position
  // todo dir_to_facedir
  // todo facedir_to_dir
  // todo dir_to_fourdir
  // todo fourdir_to_dir
  // todo dir_to_wallmounted
  // todo wallmounted_to_dir
  // todo dir_to_yaw
  // todo yaw_to_dir
  // todo is_colored_paramtype
  // todo strip_param2_color
  // todo get_node_drops
  // todo get_craft_result
  // todo get_craft_recipe
  // todo get_all_craft_recipes
  // todo handle_node_drops
  // todo itemstring_with_palette
  // todo itemstring_with_color
  // #endregion Item handling

  // #region Rollback
  //* https://api.luanti.org/core-namespace-reference/#rollback
  // todo rollback_get_node_actions
  // todo rollback_revert_actions_by
  // #endregion Rollback

  // #region on_place and on_drop defaults
  // https://api.luanti.org/core-namespace-reference/#defaults-for-the-on_place-and-on_drop-item-definition-functions
  // todo item_place_node
  // todo item_place_object
  // todo item_place
  // todo item_pickup
  // todo item_drop
  // todo item_eat
  // #endregion on_place and on_drop defaults

  // #region on_punch and on_dig defaults
  // https://api.luanti.org/core-namespace-reference/#defaults-for-the-on_punch-and-on_dig-node-definition-callbacks
  // todo node_punch
  // todo node_dig
  // #endregion on_punch and on_dig defaults

  // #region Sounds
  //* https://api.luanti.org/core-namespace-reference/#sounds
  // todo sound_play
  // todo sound_stop
  // todo sound_fade
  // #endregion Sounds

  // #region Timing
  //* https://api.luanti.org/core-namespace-reference/#timing
  after(this: void, time: number, func: () => void): void;
  // todo job:cancel
  // #endregion Timing

  // #region Async environment
  //* https://api.luanti.org/core-namespace-reference/#async-environment
  // todo handle_async
  // todo register_async_dofile
  // todo settings
  // todo registered_items
  // todo registered_nodes
  // todo registered_tools
  // todo registered_craftitems
  // todo registered_aliases
  // todo other stuff?
  // #endregion Async environment

  // #region Mapgen environment
  //* https://api.luanti.org/core-namespace-reference/#mapgen-environment
  // todo register_mapgen_script
  // todo register_on_generated
  // todo save_gen_notify
  // #endregion Mapgen environment

  // #region Server
  //* https://api.luanti.org/core-namespace-reference/#server
  // todo request_shutdown
  // todo cancel_shutdown_requests
  // todo get_server_status
  // todo get_server_uptime
  // todo get_server_max_lag
  // todo remove_player
  // todo remove_player_auth
  // todo dynamic_add_media
  // #endregion Server

  // #region IPC
  //* https://api.luanti.org/core-namespace-reference/#ipc
  // todo ipc_get
  // todo ipc_cas
  // todo ipc_poll
  // #endregion IPC

  // #region Bans
  //* https://api.luanti.org/core-namespace-reference/#bans
  // todo get_ban_list
  // todo get_ban_description
  // todo ban_player
  // todo unban_player_or_ip
  // todo kick_player
  // todo disconnect_player
  // #endregion Bans

  // #region Particles
  //* https://api.luanti.org/core-namespace-reference/#particles
  add_particle(this: void, partDef: LtParticleDef): number;
  add_particlespawner(this: void, partSpawnDef: LtParticleSpawnerDef): number;
  delete_particlespawner(this: void, id: number, playername?: string): void;
  // #endregion Particles

  //* Unorganized definitions
  request_insecure_environment(this: void): LtInsecEnv;
  raycast(
    this: void,
    from: LtVec3,
    to: LtVec3,
    objects?: boolean,
    liquids?: boolean
  ): Raycast;
  luaentities: { [key: string]: LtObjRef };
  object_refs: { [key: string]: LtObjRef };
}

declare global {
  const core: LuantiGlobal;
}
