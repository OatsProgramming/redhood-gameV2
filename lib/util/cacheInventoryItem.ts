/**
 * Stores previous item.amnt . Used to compare with new item.amnt when rerendering
 * 
 * @param key - item name 
 * @param value - item amnt
 */
export const itemCache = new Map<string, number>()

/**
 *  To cache item.amnt if item is an InventoryItem.
 *  This is to help with ItemCard memoization.
 * @param item 
 * @param inInventory 
 * @returns 
 */

export default function cacheInventoryItem(item: InventoryItem) {
    if (itemCache.has(item.name)) itemCache.delete(item.name)
    itemCache.set(item.name, (item as InventoryItem).amnt)
}
