import { createBookmark, applyFilters } from '@/mappers/bookmarkMapper'
import router from '@/router'
import store from '@/store/store'

const filterADefinition = {
  name: 'a',
  label: 'a',
  type: 'multi-filter',
  dataType: 'categorical'
}
const filterBDefinition = {
  name: 'b',
  label: 'b',
  type: 'string-filter',
  dataType: 'string'
}

store.state.filters.definition = [filterADefinition, filterBDefinition]

const testShownFilters = ['a', 'b']
const testfilterSelections = { 'a': ['1', '2', '3'], 'b': 'A' }
const testBookmark = 'N4IgzgFg9g7gdiAXCAhgGgEYjeApigJwGMIAVXADwBckRtVaBGNAJjQGZ6tkBBEAXyA%3D'

beforeEach(() => {
  store.state.filters.shown = []
  store.state.filters.selections = {}
  store.state.bookmark = ''
})

describe('bookmarkMapper.ts', () => {
  it('bookmarks shown filters and selection as a base64 encoded zipped string', async () => {
    store.state.filters.shown = testShownFilters
    store.state.filters.selections = testfilterSelections
    await router.push({ name: 'main-view', params: { entity: 'sys_ts_DataExplorerEntitySettings' } })
    await createBookmark(router)

    // @ts-ignore
    expect(router.history.current.fullPath).toBe(`/sys_ts_DataExplorerEntitySettings?bookmark=${testBookmark}`)
  })

  it('should not show a bookmark when shown array is empty', async () => {
    await router.push({ name: 'main-view', params: { entity: 'sys_ts_DataExplorerEntitySettings' } })
    createBookmark(router)
    // @ts-ignore
    expect(router.history.current.fullPath).toBe('/sys_ts_DataExplorerEntitySettings')
  })

  it('sets filters based on bookmark', () => {
    applyFilters(testBookmark)
    const shownFilters = store.state.filters.shown
    const filterSelections = store.state.filters.selections

    expect(shownFilters).toEqual(testShownFilters)
    expect(filterSelections).toEqual(testfilterSelections)
  })

  it('sets default filters if no bookmark is given', () => {
    applyFilters(undefined, ['defaultA', 'defaultB'])
    const shownFilters = store.state.filters.shown

    expect(shownFilters).toEqual(['defaultA', 'defaultB'])
  })
})
