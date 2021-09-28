/**
 * @param {[{}]} objectArray objects in an array to perform the search on
 * @param {string[]} propArray properties (case sensitive) that contain strings in which you want to search
 * @param {string} search string to match on
 * @param {string[]} searchProps array of strings (case sensitive). Represents the presence of properties that can trigger a result
 *                               e.g. role or user
 * @returns matching objects from objectArray
 */
export const filterObjectOnStringProperties = (objectArray, propArray, search, searchProps = []) => {
  if (!search) {
    return objectArray
  }
  const matchOn = new RegExp(search, 'i')
  return objectArray.filter(object =>
    propArray
      .map(prop => object[prop])
      .some(value => matchOn.test(value)) ||
    searchProps
      .filter(prop => matchOn.test(prop))
      .some(prop => object[prop])
  )
}
