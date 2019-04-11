const freeMarkerRegEx = /\${(\w+)}/g // Match foo from ${foo}
const magmaRegEx = /\$\('(\w+)'\)/g // Match foo from $('foo')

const findParameters = (codeString: string, type: string): string[] => {
  const parameterRegEx = type === 'JavaScript (Magma)' ? magmaRegEx : freeMarkerRegEx
  let result
  let list = []
  while ((result = parameterRegEx.exec(codeString)) !== null) {
    list.push(result[1]) // add the capture group
  }
  return list
}

export {
  findParameters
}
