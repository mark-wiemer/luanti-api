import type { LtColorSpec } from "./color";
import type { LtPointedThing } from "./entity";
import { LtInvRef } from "./inventory";
import type { MetaDataRef, LtItemDef, LtItemStack } from "./item";
import type { LtPlayer } from "./player";
import type { LtSoundDefs } from "./sound";
import type { LtVec3 } from "./vector";

export type LtNodeName = string;

export type LtNodePlacementPrediction = string;

export interface OnPlaceCallback {
  (
    this: void,
    itemstack: LtItemStack,
    placer: LtPlayer | undefined,
    pointed_thing: LtPointedThing
  ): LtItemStack | undefined;
}

export interface OnDropCallback {
  (
    this: void,
    itemstack: LtItemStack,
    dropper: LtPlayer | undefined,
    pos: LtVec3
  ): void;
}

export interface OnUseCallback {
  (
    this: void,
    itemstack: LtItemStack,
    user: LtPlayer | undefined,
    pointed_thing: LtPointedThing
  ): LtItemStack | undefined;
}

export interface LtNode {
  name: LtNodeName;
  param1: number;
  param2: number;
}

export interface LtDigParams {}

export interface AfterUseCallback {
  (
    this: void,
    itemstack: LtItemStack,
    user: LtPlayer | undefined,
    node: LtNode,
    digparams: LtDigParams
  ): void;
}

export type LtCollisionBox = Array<number>;

export interface MTABMAction {
  (
    this: void,
    pos: LtVec3,
    node: LtNode,
    active_object_count: number,
    active_object_count_wider: number
  ): void;
}

export interface LtABMDef {
  /**
   * Descriptive label for profiling purposes (optional).
   * Definitions with identical labels will be listed as one
   */
  label: string;

  /**In the following two fields, also group:groupname will work*/
  nodenames: Array<string>;
  /**
   * Any of these
   * If left out or empty, any neighbor will do
   */
  neighbors: Array<string>;

  /**Operation interval in seconds*/
  interval: number;

  /**Chance of trigger per-node per-interval is 1.0 / this*/
  chance: number;

  /**
   * If true, catch-up behaviour is enabled
   * The chance value is temporarily reduced when returning to
   * an area to simulate time lost by the area being unattended.
   * Note chance value can often be reduced to 1
   */
  catch_up: boolean;
  action: MTABMAction;
}

export interface LtLBMAction {
  (this: void, pos: LtVec3, node: LtNode): void;
}

export interface LtLBMDef {
  /**
   * Descriptive label for profiling purposes (optional).
   * Definitions with identical labels will be listed as one.
   */
  label: string;
  name: string;
  /**
   * List of node names to trigger the LBM on
   * Also non-registered nodes will work
   * Groups (as of group:groupname) will work as well
   */
  nodenames: Array<string>;

  /**
   * Whether to run the LBM's action every time a block gets loaded,
   * and not just for blocks that were saved last time before LBMs were
   * introduced to the world
   */
  run_at_every_load: boolean;
  action: LtLBMAction;
}

export interface LtTileAnimVerticalFramesDef
  extends LtTileAnimDef<"vertical_frames"> {
  /**Width of a frame in pixels*/
  aspect_w: number;
  /**Height of a frame in pixels*/
  aspect_h: number;
  /**Specify full loop length*/
  length: number;
}
export interface LtTileAnimSheet2dDef extends LtTileAnimDef<"sheet_2d"> {
  /**width in num of frames*/
  frames_w: number;
  /**height in num of frames*/
  frames_h: number;
  /**length of single frame*/
  frame_length: number;
}
export interface LtTileAnimTypeMap {
  vertical_frames: LtTileAnimVerticalFramesDef;
  sheet_2d: LtTileAnimSheet2dDef;
}

export interface LtTileAnimDef<T extends keyof LtTileAnimTypeMap> {
  type: T;
}

export interface LtTileDef<K extends keyof LtTileAnimTypeMap> {
  /**texture file name*/
  name: string;
  animation?: LtTileAnimTypeMap[K];
  backface_culling?: boolean;
  tileable_vertical?: boolean;
  tileable_horizontal?: boolean;
  color?: LtColorSpec;
  /**@deprecated: use name instead*/
  image?: string;
}

export type LtNodeParamType = "none" | "light";
export type LtNodeParamType2 = "facedir"; //TODO - see what is allowed

export type LtNodeLiquidType = "none" | "source" | "flowing";

export type LtNodeBoxType =
  | "regular"
  | "leveled"
  | "fixed"
  | "wallmounted"
  | "connected";

export type LtNodeBoxData = Array<number>;
export type LtNodeBoxesData = LtNodeBoxData | Array<LtNodeBoxData>;

export interface LtNodeBoxTypeMap {
  regular: LtNodeBoxRegular;
  leveled: LtNodeBoxLeveled;
  fixed: LtNodeBoxFixed;
  wallmounted: LtNodeBoxWallMounted;
  connected: LtNodeBoxConnected;
}

export interface LtNodeBox<T extends keyof LtNodeBoxTypeMap> {
  type: T; //TODO - finish
}
export interface LtNodeBoxRegular extends LtNodeBox<"regular"> {
  //TODO - lua_api not clear on this
}
/**TODO - lua_api not clear on this at all*/
export interface LtNodeBoxLeveled extends LtNodeBox<"leveled"> {}
export interface LtNodeBoxFixed extends LtNodeBox<"fixed"> {
  fixed: LtNodeBoxesData;
}
export interface LtNodeBoxWallMounted extends LtNodeBox<"wallmounted"> {
  wall_top: LtNodeBoxData;
  wall_bottom: LtNodeBoxData;
  wall_side: LtNodeBoxData;
}
export interface LtNodeBoxConnected extends LtNodeBox<"connected"> {
  fixed: LtNodeBoxesData;
  connect_top?: LtNodeBoxesData;
  connect_bottom?: LtNodeBoxesData;
  connect_front?: LtNodeBoxesData;
  connect_left?: LtNodeBoxesData;
  connect_back?: LtNodeBoxesData;
  connect_right?: LtNodeBoxesData;
}

export type LtNodeSide = "top" | "bottom" | "front" | "left" | "back" | "right";
export type LtNodeSides = Array<LtNodeSide>;

export interface LtNodeOnConstructCallback {
  (this: void, pos: LtVec3): void;
}
export interface LtNodeOnDestructCallback {
  (this: void, pos: LtVec3): void;
}

export interface LtNodeAfterDestructCallback {
  (this: void, pos: LtVec3, oldnode: LtNode): void;
}

export interface LtNodeOnFloodCallback {
  (this: void, pos: LtVec3, oldnode: LtNode, newnode: LtNode): void;
}

export interface LtNodeOnPlaceCallback {
  (
    this: void,
    pos: LtVec3,
    placer: LtPlayer | undefined,
    itemstack: LtItemStack,
    pointed_thing: LtPointedThing
  ): void;
}

export interface LtNodeMetaRef extends MetaDataRef {
  get_inventory(): LtInvRef;
}

export interface LtNodeAfterDigCallback {
  (
    this: void,
    pos: LtVec3,
    oldnode: LtNode,
    oldmetadata: LtNodeMetaRef,
    digger: LtPlayer | undefined
  ): void;
}

export interface LtNodeCanDigCallback {
  (this: void, pos: LtVec3, player?: LtPlayer): boolean;
}

export interface LtNodeOnPunchCallback {
  (
    this: void,
    pos: LtVec3,
    node: LtNode,
    puncher: LtPlayer | undefined,
    pointed_thing: LtPointedThing
  ): void;
}
export interface LtNodeOnRightClickCallback {
  (
    this: void,
    pos: LtVec3,
    node: LtNode,
    clicker: LtPlayer | undefined,
    itemstack: LtItemStack,
    pointed_thing: LtPointedThing
  ): void;
}

export interface LtNodeOnDigCallback {
  (this: void, pos: LtVec3, node: LtNode, digger: LtPlayer | undefined): void;
}

export interface LtNodeOnTimerCallback {
  (this: void, pos: LtVec3, elapsed: number): void;
}

export interface LtNodeFields {
  //fields = { name1 = value1, name2 = value2, ...}
  [key: string]: string;
}

export interface LtNodeOnReceiveFields {
  (
    this: void,
    pos: LtVec3,
    formname: string,
    fields: LtNodeFields,
    sender: LtPlayer | undefined
  ): void;
}

export interface LtNodeAllowMetadataInventoryMoveCallback {
  (
    this: void,
    pos: LtVec3,
    from_list: any,
    from_index: number,
    to_list: any,
    to_index: number,
    count: number,
    player: LtPlayer | undefined
  ): number;
}

export interface LtNodeAllowMetadataInventoryPutCallback {
  (
    this: void,
    pos: LtVec3,
    listname: string,
    index: number,
    stack: LtItemStack,
    player: LtPlayer | undefined
  ): boolean;
}

export interface LtNodeAllowMetadataInventoryTakeCallback {
  (
    this: void,
    pos: LtVec3,
    listname: string,
    index: number,
    stack: LtItemStack,
    player: LtPlayer
  ): boolean;
}

export interface LtNodeOnMetadataInventoryMove {
  (
    this: void,
    pos: LtVec3,
    from_list: any,
    from_index: number,
    to_list: any,
    to_index: number,
    count: number,
    player: LtPlayer | undefined
  ): void;
}

export interface LtNodeOnMetadataInventoryPut {
  (
    this: void,
    pos: LtVec3,
    listname: string,
    index: number,
    stack: LtItemStack,
    player: LtPlayer | undefined
  ): void;
}

export interface LtNodeOnMetadataInventoryTake {
  (
    this: void,
    pos: LtVec3,
    listname: string,
    index: number,
    stack: LtItemStack,
    player: LtPlayer | undefined
  ): void;
}

export interface LtNodeOnBlast {
  (this: void, pos: LtVec3, intensity: number): void;
}

export interface LtNodeDropDef {
  /**Maximum number of items to drop*/
  max_items: number;

  /**Choose max_items randomly from this list*/
  items: Array<{
    /**Items to drop*/
    items: Array<string>;
    /**Probability of dropping is 1 / rarity*/
    rarity: number;
  }>;
}

export type LtNodeDrawtype =
  | "normal"
  | "airlike"
  | "liquid"
  | "flowingliquid"
  | "glasslike"
  | "glasslike_framed"
  | "glasslike_framed_optional"
  | "allfaces"
  | "allfaces_optional"
  | "torchlike"
  | "signlike"
  | "plantlike"
  | "firelike"
  | "fencelike"
  | "raillike"
  | "nodebox"
  | "mesh";

export interface LtNodeDef<NodeBoxType extends LtNodeBoxType>
  extends LtItemDef {
  drawtype?: LtNodeDrawtype;
  /**
   * Supported for drawtypes "plantlike", "signlike", "torchlike",
   * "firelike", "mesh".
   * For plantlike and firelike, the image will start at the bottom of the
   * node, for the other drawtypes the image will be centered on the node.
   * Note that positioning for "torchlike" may still change. ]]
   */
  visual_scale?: number;
  /**Textures of node; +Y, -Y, +X, -X, +Z, -Z
   * List can be shortened to needed length
   */
  tiles?: string[] | LtTileDef<keyof LtTileAnimTypeMap>[];
  /**
   * Same as `tiles`, but these textures are drawn on top of the
   * base tiles.You can use this to colorize only specific parts of
   * your texture.If the texture name is an empty string, that
   * overlay is not drawn.Since such tiles are drawn twice, it
   * is not recommended to use overlays on very common nodes.
   */
  overlay_tiles?: string[] | LtTileDef<keyof LtTileAnimTypeMap>[];

  /**
   * Special textures of node; used rarely(old field name: special_materials)
   * List can be shortened to needed length
   */
  special_tiles?: string[] | LtTileDef<keyof LtTileAnimTypeMap>[];
  /**
   * The node's original color will be multiplied with this color.
   * If the node has a palette, then this setting only has an effect
   * in the inventory and on the wield item. ]]
   */
  color?: LtColorSpec;

  /**Use texture's alpha channel*/
  use_texture_alpha?: boolean;
  /**
   * The node's `param2` is used to select a pixel from the image
   * (pixels are arranged from left to right and from top to bottom).
   * The node's color will be multiplied with the selected pixel's
   * color.Tiles can override this behavior.
   * Only when`paramtype2` supports palettes. ]]
   */
  palette?: string;

  /**
   * If player is inside node, see "ColorSpec"
   * "green#0F"
   */
  post_effect_color?: LtColorSpec;

  /** paramtype = "light" allows light to propagate from or through the node with light value
   * falling by 1 per node.This line is essential for a light source node to spread its light
   */
  paramtype?: LtNodeParamType;
  paramtype2?: LtNodeParamType2;

  /**Force value for param2 when player places node*/
  place_param2?: boolean;

  /**If false, the cave generator will not carve through this*/
  is_ground_content?: boolean;

  /**If true, sunlight will go infinitely through this*/
  sunlight_propagates?: boolean;

  /**If true, objects collide with node*/
  walkable?: boolean;

  /**If true, can be pointed at*/
  pointable?: boolean;

  /**If false, can never be dug*/
  diggable?: boolean;

  /**If true, can be climbed on(ladder)*/
  climbable?: boolean;

  /**If true, placed nodes can replace this node*/
  buildable_to?: boolean;

  /**If true, liquids flow into and replace this node*/
  floodable?: boolean;

  liquidtype?: LtNodeLiquidType;

  /**Flowing version of source liquid*/
  liquid_alternative_flowing?: string;

  /**Source version of flowing liquid*/
  liquid_alternative_source?: string;

  /**Higher viscosity = slower flow(max. 7)*/
  liquid_viscosity?: number;

  /**If true, a new liquid source can be created by placing two or more sources nearby*/
  liquid_renewable?: boolean;

  /**
   * Block contains level in param2.Value is default level, used for snow.
   * Don't forget to use "leveled" type nodebox
   */
  leveled?: number;

  /**number of flowing nodes around source(max. 8)*/
  liquid_range?: number;

  /**Player will take this amount of damage if no bubbles are left*/
  drowning?: number;
  /**
   * Amount of light emitted by node.
   * To set the maximum(currently 14), use the value 'core.LIGHT_MAX'.
   * A value outside the range 0 to core.LIGHT_MAX causes undefined behavior
   */
  light_source?: number;

  /**If player is inside node, this damage is caused*/
  damage_per_second?: number;

  node_box?: LtNodeBoxTypeMap[keyof LtNodeBoxTypeMap];
  /**
   * Used for nodebox nodes with the type == "connected"
   * Specifies to what neighboring nodes connections will be drawn
   * e.g. `{"group:fence", "default:wood"}` or `"default:stone"`
   */
  connects_to?: Array<string>;

  /**Tells connected nodebox nodes to connect only to these sides of this node*/
  connect_sides?: LtNodeSides;

  mesh?: string;

  /**If drawtype "nodebox" is used and selection_box is nil, then node_box is used*/
  selection_box?: LtNodeBoxTypeMap["fixed"]; //TODO - see if more types allowed
  collision_box?: LtNodeBoxTypeMap["fixed"]; //TODO - see if more types allowed

  /**Support maps made in and before January 2012*/
  legacy_facedir_simple?: boolean;

  /**Support maps made in and before January 2012*/
  legacy_wallmounted?: boolean;

  sounds?: LtSoundDefs;

  /**Name of dropped node when dug.Default is the node itself*/
  drop?: string | LtNodeDropDef;

  /**
   * Node constructor; called after adding node
   * Can set up metadata and stuff like that
   * Not called for bulk node placement(i.e.schematics and VoxelManip)
   * default: nil
   */
  on_construct?: LtNodeOnConstructCallback;

  /**Node destructor; called before removing node
   * Not called for bulk node placement(i.e.schematics and VoxelManip)
   * default: nil
   */
  on_destruct?: LtNodeOnDestructCallback;

  /**Node destructor; called after removing node
   * Not called for bulk node placement(i.e.schematics and VoxelManip)
   * default: nil
   */
  after_destruct?: LtNodeAfterDestructCallback;

  /**Called when a liquid(newnode) is about to flood oldnode, if
   * it has`floodable = true` in the nodedef.Not called for bulk
   * node placement(i.e.schematics and VoxelManip) or air nodes.If
   * return true the node is not flooded, but on_flood callback will
   * most likely be called over and over again every liquid update
   * interval.Default: nil
   */
  on_flood?: LtNodeOnFloodCallback;

  /**Called after constructing node when node was placed using
   * core.item_place_node / core.place_node
   * If return true no item is taken from itemstack
   * default: nil
   */
  after_place_node?: LtNodeOnPlaceCallback;

  /**oldmetadata is in table format
   * Called after destructing node when node was dug using
   * core.node_dig / core.dig_node
   * default: nil
   */
  after_dig_node?: LtNodeAfterDigCallback;

  /**returns true if node can be dug, or false if not
   * default: nil
   */
  can_dig?: LtNodeCanDigCallback;

  /**default: core.node_punch
   * By default: Calls core.register_on_punchnode callbacks
   */
  on_punch?: LtNodeOnPunchCallback;

  /**default: nil
   * if defined, itemstack will hold clicker's wielded item
   * Shall return the leftover itemstack
   * Note: pointed_thing can be nil, if a mod calls this function
   */
  on_rightclick?: LtNodeOnRightClickCallback;

  /**default: core.node_dig
   * By default: checks privileges, wears out tool and removes node
   */
  on_dig?: LtNodeOnDigCallback;

  /**default: nil
   * called by NodeTimers, see core.get_node_timer and NodeTimerRef
   * elapsed is the total time passed since the timer was started
   * return true to run the timer for another cycle with the same timeout value
   */
  on_timer?: LtNodeOnTimerCallback;

  /**
   * Called when an UI form(e.g.sign text input) returns data
   * default: nil
   */
  on_receive_fields?: LtNodeOnReceiveFields;

  /**
   * Called when a player wants to move items inside the inventory
   * Return value: number of items allowed to move
   */
  allow_metadata_inventory_move?: LtNodeAllowMetadataInventoryMoveCallback;

  /**
   * Called when a player wants to put something into the inventory
   * Return value: number of items allowed to put
   * Return value: -1: Allow and don't modify item count in inventory
   */
  allow_metadata_inventory_put?: LtNodeAllowMetadataInventoryPutCallback;

  /**Called when a player wants to take something out of the inventory
   * Return value: number of items allowed to take
   * Return value: -1: Allow and don't modify item count in inventor
   */
  allow_metadata_inventory_take?: LtNodeAllowMetadataInventoryTakeCallback;

  on_metadata_inventory_move?: LtNodeOnMetadataInventoryMove;

  on_metadata_inventory_put?: LtNodeOnMetadataInventoryPut;

  /**
   * Called after the actual action has happened, according to what was allowed.
   * No return value
   */
  on_metadata_inventory_take?: LtNodeOnMetadataInventoryTake;

  /**
   * intensity: 1.0 = mid range of regular TNT
   * If defined, called when an explosion touches the node, instead of
   * removing the node
   */
  on_blast?: LtNodeOnBlast;
}
