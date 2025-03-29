import { LtItemStack } from "./item";

export interface LtInvRef {
  /**return true if list is empty*/
  is_empty(listname: string): boolean;

  /**get size of a list*/
  get_size(listname: string): number;

  /**set size of a list
   * returns false on error (e.g. invalid listname or size)
   */
  set_size(listname: string, size: number): void | false;

  /**get width of a list*/
  get_width(listname: string): number;
  /**set width of list; currently used for crafting*/
  set_width(listname: string, width: number): void;

  /**get a copy of stack index i in list*/
  get_stack(listname: string, i: number): LtItemStack;

  /**copy stack to index i in list*/
  set_stack(listname: string, i: number, stack: LtItemStack): LtItemStack;

  /**return full list*/
  get_list(listname: string): LtItemStack[];

  /**set full list (size will not change)*/
  set_list(listname: string, list: LtItemStack[]): void;

  /**returns list of inventory lists*/
  get_lists(): any;

  /**sets inventory lists (size will not change)*/
  set_lists(lists: any): void;

  /**add item somewhere in list, returns leftover ItemStack*/
  add_item(listname: string, stack: LtItemStack): LtItemStack;

  /**returns true if the stack of items can be fully added to the list*/
  room_for_item(listname: string, stack: LtItemStack): boolean;

  /**returns true if the stack of items can be fully taken from the list*/
  contains_item(listname: string, stack: LtItemStack): boolean;

  /**take as many items as specified from the list
   * returns the items that were actually removed (as an ItemStack)
   * @note: any item metadata is ignored
   * attempting to remove a specific unique item
   * this way will likely remove the wrong one
   * use set_stack with an empty ItemStack instead*/
  remove_item(listname: string, stack: LtItemStack): LtItemStack;

  /**returns a location compatible to core.get_inventory(location)
   * returns {type="undefined"} in case location is not known
   */
  get_location(): any;
}
