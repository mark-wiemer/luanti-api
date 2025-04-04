import type { LtColorSpec } from "./color";
import type {
  AfterUseCallback,
  LtNodeName,
  LtNodePlacementPrediction,
  OnDropCallback,
  OnPlaceCallback,
  OnUseCallback,
} from "./node";
import type { LtSoundDefs } from "./sound";
import type { LtVec3 } from "./vector";

export interface MetaDataRef {
  set_string(k: string, v: string): void;
  get_string(k: string): string;
  set_int(k: string, n: number): void;
  get_int(k: string): number;
  set_float(k: string, f: number): void;
  get_float(k: string): number;
  to_table(): undefined | any;
  from_table(t: any): void | true;
  equals(other: MetaDataRef): boolean;
}

export interface LtItemStackMetaRef extends MetaDataRef {}

export interface LtItemStack {
  get_name(): string;
  get_meta(): LtItemStackMetaRef;
  name: string;
  count: number;
  wear: number;
  metadata: string;
}

export interface LtItemDef {
  description?: string;
  groups?: { [key: string]: number };
  inventory_image?: string;
  wield_image?: string;
  /** An image file containing the palette of a node.
   * You can set the currently used color as the
   * "palette_index" field of the item stack metadata.
   * The palette is always stretched to fit indices
   * between 0 and 255, to ensure compatibility with
   * "colorfacedir" and "colorwallmounted" nodes.
   */
  palette?: string;

  /** "0xFFFFFFFF"
   * The color of the item. The palette overrides this
   */
  color?: LtColorSpec;

  /**{x = 1, y = 1, z = 1} */
  wield_scale?: LtVec3;

  stack_max?: number;

  range?: number;

  liquids_pointable?: boolean;

  tool_capabilities?: LtToolCapabilities;

  /**
   If nil and item is node, prediction is made automatically
   If nil and item is not a node, no prediction is made
   If "" and item is anything, no prediction is made
   Otherwise should be name of node which the client immediately places
   on ground when the player places the item. Server will always update
   actual result to client in a short moment.
  */
  node_placement_prediction?: LtNodePlacementPrediction;

  sound?: Partial<LtSoundDefs>;

  /**
   * Shall place item and return the leftover itemstack
   * The placer may be any ObjectRef or nil.
   * default: core.item_place
   */
  on_place?: OnPlaceCallback;

  /**Same as on_place but called when pointing at nothing.
   * pointed_thing : always { type = "nothing" }
   */
  on_secondary_use?: OnPlaceCallback;

  /**Defaults to core.item_drop*/
  on_drop?: OnDropCallback;

  /** default: nil
   * Function must return either nil if no item shall be removed from
   * inventory, or an itemstack to replace the original itemstack.
   *   e.g. itemstack:take_item(); return itemstack
   * Otherwise, the function is free to do what it wants
   */
  on_use?: OnUseCallback;

  /**
   * default: nil
   * If defined, should return an itemstack and will be called instead of
   * wearing out the tool. If returns nil, does nothing.
   * If after_use doesn't exist, it is the same as:
      ```ts
      function (itemstack: LtItemStack, user: LtPlayer|undefined, node: LtNode, digparams: LtDigParams) {
        itemstack.add_wear(digparams.wear);
        return itemstack;
      }
      ```
  */
  after_use?: AfterUseCallback;

  /**
   * Add your own custom fields. By convention, all custom field names
   * should start with `_` to avoid naming collisions with future engine
   * usage
   */
  [_custom_field: string]: any;
}

export interface LtGroupCapability {
  /**
   * Time in seconds to dig a node of each rating.
   * Ref https://api.luanti.org/tool-capabilities/#digging-times-times
   */
  // Record<number, number> supports the `times: { 1: 0 }` syntax that some may prefer
  times: Record<number, number>;
  /** https://api.luanti.org/tool-capabilities/#uses-uses-tools-only */
  uses?: number;
  maxlevel?: number;
}

export interface LtGroupCapabilities {
  [key: string]: LtGroupCapability;
}

export interface LtGroupDamages {
  [groupname: string]: number;
}

export interface LtToolCapabilities {
  /**
   * When used as a weapon, the item will do full damage if this time is spent between punches.
   * If e.g. half the time is spent, the item will do half damage.
   * Defaults to `1.0`
   */
  full_punch_interval?: number;
  /** Group capabilities, see LtGroupCapabilities */
  groupcaps: Partial<LtGroupCapabilities>;
  /** Types of entities that can be damaged. See https://api.luanti.org/entity-damage-mechanism/ */
  damage_groups?: LtGroupDamages;
}

export type LtItemName = string;

export interface CraftRecipeCommon<T extends keyof CraftRecipeTypeMap> {
  type: T;
  output: LtItemName;
  /**
   * optional list of item pairs,
   * replace one input item with another item on crafting
   */
  replacements?: CraftConfigReplacements;
}

export type CraftConfigReplacements = Array<string>;

export interface CraftRecipeShaped extends CraftRecipeCommon<"shaped"> {
  // type: "shaped";
  /**
   * Also groups; e.g. 'group:crumbly'
   ```ts
   [
      ['default:cobble',  'default:cobble', 'default:cobble'],
      ['',                'default:stick', ''               ],
      ['',                'default:stick', ''               ]
   ]
   ```
  }
  */
  recipe: Array<Array<string>>;
}

export interface CraftRecipeShapeless extends CraftRecipeCommon<"shapeless"> {
  // type: "shapeless";
  recipe: Array<string>;
}

export interface CraftRecipeToolRepair extends CraftRecipeCommon<"toolrepair"> {
  // type: "toolrepair";
  /**-0.02*/
  additional_wear: number;
}

export interface CraftRecipeCooking extends CraftRecipeCommon<"cooking"> {
  // type: "cooking";
  recipe: LtItemName;
  cooktime: number;
}

export interface CraftRecipeFurnaceFuel extends CraftRecipeCommon<"fuel"> {
  // type: "fuel";
  recipe: LtItemName;
  /**seconds*/
  burntime: number;
}

export interface CraftRecipeTypeMap {
  shapeless: CraftRecipeShapeless;
  cooking: CraftRecipeCooking;
  fuel: CraftRecipeFurnaceFuel;
  shaped: CraftRecipeShaped;
  toolrepair: CraftRecipeToolRepair;
}

/**
 * ## scatter
 * Randomly chooses a location and generates a cluster of ore.
 * If noise_params is specified, the ore will be placed if the 3D perlin noise at that point is greater than the noise_threshold, giving the ability to create a non-equal distribution of ore.
 *
 * ## sheet
 * Creates a sheet of ore in a blob shape according to the 2D perlin noise
 * described by noise_params and noise_threshold.
 * This is essentially an improved version of the so-called "stratus" ore seen in some unofficial mods.
 * This sheet consists of vertical columns of uniform randomly distributed height,
 * varying between the inclusive range column_height_min and column_height_max.
 * If column_height_min is not specified, this parameter defaults to 1.
 * If column_height_max is not specified, this parameter defaults to clust_size for reverse compatibility.
 * New code should prefer column_height_max.
 * The column_midpoint_factor parameter controls the position of the column at which ore eminates from.
 * If 1, columns grow upward. If 0, columns grow downward. If 0.5, columns grow equally starting from each direction.
 * column_midpoint_factor is a decimal number ranging in value from 0 to 1.
 * If this parameter is not specified, the default is 0.5.
 * The ore parameters clust_scarcity and clust_num_ores are ignored for this ore type.
 *
 * ## puff
 * Creates a sheet of ore in a cloud-like puff shape
 * As with the sheet ore type, the size and shape of puffs are
 * described by noise_params and noise_threshold and
 * are placed at random vertical positions within the currently generated chunk
 * The vertical top and bottom displacement of each puff are
 * determined by the noise parameters np_puff_top and np_puff_bottom, respectively.
 *
 * ## blob
 * Creates a deformed sphere of ore according to 3d perlin noise described by noise_params.
 * The maximum size of the blob is clust_size, and clust_scarcity has the same meaning as with the scatter type.
 *
 * ## vein
 * Creates veins of ore varying in density by according to the intersection
 * of two instances of 3d perlin noise with diffferent seeds,
 * both described by noise_params. random_factor varies the influence
 * random chance has on placement of an ore inside the vein, which is 1 by default.
 *
 * Note that modifying this parameter may require adjusting noise_threshold.
 * The parameters clust_scarcity, clust_num_ores, and clust_size are ignored by this ore type.
 * This ore type is difficult to control since it is sensitive to small changes.
 * The following is a decent set of parameters to work from:
 * ### WARNING: Use this ore type very sparingly since it is ~200x more computationally expensive than any other ore
 */
export type OreType = "scatter" | "sheet" | "puff" | "blob" | "vein";

export interface OreNoiseParams {
  offset: number;
  scale: number;
  spread: LtVec3;
  seed: number;
  octaves: number;
  persist: number;
}

export interface LtOreDef {
  ore_type: OreType;

  /**`default:stone_with_coal`*/
  ore: LtItemName;

  /**`default:stone`
   * a list of nodenames is supported too
   */
  wherein: LtNodeName | Array<LtNodeName>;

  /**8 * 8 * 8
   * Ore has a 1 out of clust_scarcity chance of spawning in a node
   * This value should be * MUCH * higher than your intuition might tell you!
   */
  clust_scarcity: number;

  /**
   * 8
   * Number of ores in a cluster
   */
  clust_num_ores: number;

  /**Size of the bounding box of the cluster
   * In this example, there is a 3x3x3 cluster where 8 out of the 27 nodes are coal ore
   */
  clust_size: number;

  /**
   * -31000
   */
  y_min: number;
  /**64*/
  y_max: number;

  /**Attributes for this ore generation*/
  flags: string;

  /**0.5
   * If noise is above this threshold, ore is placed.Not needed for a uniform distribution
   */
  noise_threshold: number;

  /**
   * NoiseParams structure describing the perlin noise used for ore distribution.
   * Needed for sheet ore_type.Omit from scatter ore_type for a uniform ore distribution
   */
  noise_params: OreNoiseParams;

  /**
   * Multiplier of the randomness contribution to the noise value at any
   * given point to decide if ore should be placed.Set to 0 for solid veins
   * This parameter is only valid for ore_type == "vein"
   */
  random_factor: number;
  /**
   * List of biomes in which this decoration occurs.Occurs in all biomes if this is omitted,
   * and ignored if the Mapgen being used does not support biomes.
   * can be a list of(or a single) biome names, IDs, or definitions
   */
  biomes: Array<string>;
}
