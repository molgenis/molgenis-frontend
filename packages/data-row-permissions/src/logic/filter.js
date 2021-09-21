/**
 * @param {[{}]} objectArray
 * @param {string[]} propArray properties that contain strings in which you want to search
 * @param {string} search string: search term
 * @param {string[]} searchProps array of strings, case sensitive. Represents the properties that can trigger a result
 *                               e.g. role or user
 * @returns matching objects from objectArray
 */

export const filterObjectOnStringProperties = (objectArray, propArray, search, searchProps = []) => {
  if (!search) {
    return objectArray
  }

  let matches = []
  const matchOn = search.toLowerCase()

  const numberOfProperties = propArray.length
  for (let i = 0; i < numberOfProperties; i++) {
    let match = []

    if (!searchProps.length) {
      match = objectArray.filter(object => object[propArray[i]] && object[propArray[i]].toLowerCase().includes(matchOn))
    } else {
      match = objectArray.filter(object => object[propArray[i]] &&
        (object[propArray[i]].toLowerCase().includes(matchOn) ||
        (searchProps.includes(propArray[i]) && propArray[i].toLowerCase().includes(search))))
    }

    if (matches.length) {
      for (const m of match) {
        // check if already found
        if (!matches.filter(matched => matched[propArray[0]] !== m[propArray[0]])) {
          matches.push(m)
        }
      }
    } else {
      matches = match
    }
  }
  return matches
}
