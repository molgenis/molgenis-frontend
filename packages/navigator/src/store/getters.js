const getters = {
  query: (state) => state.route.query.q,
  folderId: (state) => state.route.params.folderId,
  folderPath: (state) => {
    let folderPath = []
    if (state.folder) {
      let folder = state.folder
      while (folder) {
        folderPath.push({id: folder.id, label: folder.label})
        folder = folder.parent
      }
      folderPath.reverse()
    }
    return folderPath
  },
  nrSelectedResources: (state) => state.selectedResources.length,
  nrClipboardResources: (state) => state.clipboard ? state.clipboard.resources.length : 0
}
export default getters
