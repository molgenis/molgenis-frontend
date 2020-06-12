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
const testBookmark = 'N4IgzgpghgTgxgCwCoQB4BcQC4QgDTgID2A7gHbYhR4BG%2BVlAjHgEx4DM9dOAgiAL5A%3D'

beforeEach(() => {
  store.state.filters.shown = []
  store.state.filters.selections = {}
  store.state.bookmark = ''
})

describe('bookmarkMapper.ts', () => {
  it('bookmarks shown filters and selection as a base64 encoded zipped string', () => {
    store.state.filters.shown = testShownFilters
    store.state.filters.selections = testfilterSelections
    createBookmark(router)
    // @ts-ignore
    expect(router.history.current.fullPath).toBe(`/root_hospital_patients?bookmark=${testBookmark}`)
  })

  it('should not show a bookmark when shown array is empty', () => {
    createBookmark(router)
    // @ts-ignore
    expect(router.history.current.fullPath).toBe('/root_hospital_patients')
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
