const getters = {
  query: (state, _, rootState) => {
    return rootState.route.query.q
  },
  folderId: (state, _, rootState) => rootState.route.params.folderId,
  folderPath: (state) => {
    const folderPath:any = []
    if (state.folder) {
      let folder = state.folder
      while (folder) {
        folderPath.push({ id: folder.id, label: folder.label })
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
