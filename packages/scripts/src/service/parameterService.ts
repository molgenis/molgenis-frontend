const freeMarkerRegEx = /\${([\w-#]+)}/g // Match foo from ${foo}
// eslint-disable-next-line
const magmaRegEx = /\$\(\"([\w-#]+)\"\)|\$\(\'([\w-#]+)\'\)/g // Match foo from $('foo') or $("foo")
const validFirstChar = /[a-zA-Z]/ // only chars are allowed at the start

const isNotReservedWord = (word: string) => !['login', 'logout', 'csv', 'base', 'exist', 'meta', '_idValue'].includes(word)
const isNotStartingWithChar = (word: string) => validFirstChar.test(word.charAt(0))

const extractCandidates = (codeString: string, regEx: RegExp) => {
  let result
  const list = []
  while ((result = regEx.exec(codeString)) !== null) {
    list.push(result[1] || result[2]) // add the capture group
  }
  return list
}

const findParameters = (codeString: string, type: string): string[] => {
  const parameterRegEx = type === 'JavaScript (Magma)' ? magmaRegEx : freeMarkerRegEx
  const candidates = extractCandidates(codeString, parameterRegEx)

  const filtered = candidates.filter(isNotReservedWord).filter(isNotStartingWithChar)
  return filtered
}

export {
  findParameters
}
