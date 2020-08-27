/**
 * Find path to item in menu
 *
 * @param path path to item in menu
 * @param menu menu tree
 * @param itemId id of item to find
 *
 * @returns path to item found including the itemId or undefined if item is not found
 */
export const findPath = (path: string, menu: any, itemId: string):string | undefined => {
  path = `${path}/${menu.id}`
  if (path.endsWith(`/${itemId}`)) {
    return path // you are the item itself
  }

  if (menu.items) {
    if (menu.items.find((item: any) => item.id === itemId)) {
      return `${path}/${itemId}` // the item is a item in your menu
    }
    const found = menu.items
      .filter((item: any) => item.items)
      .find((menuItem: any) => {
        const subPath = findPath(path, menuItem, itemId) // search the submenus
        if (subPath && subPath.endsWith(`/${itemId}`)) {
          path = subPath // the item was found in a submenu
          return true
        }
      })
    return found ? path : undefined
  }
}
