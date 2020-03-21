<template>
  <div>
    <div>
      <div class="p-0 pl-3 d-flex justify-content-between align-items-center">
        <h2>Filters</h2>
        <button
          type="button"
          class="btn btn-light m-2 btn-outline-secondary hide-filters"
          title="Hide Filters"
          @click="setHideFilters(true)"
        >
          <font-awesome-icon icon="chevron-left"></font-awesome-icon>
        </button>
      </div>
      <div class="p-2">
        <filter-container
          :key="renderCount"
          v-if="isFilterDataLoaded"
          v-model="filterSelections"
          :filters="filters.definition"
          :filters-shown="filters.shown"
          @update="updateState"
          :can-edit="true"
        ></filter-container>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import FilterContainer from '../../node_modules/@molgenis/molgenis-ui-filter/src/components/FilterContainer.vue'
import { bookmarkShown, bookmarkSelection } from '../mappers/bookmarkMapper'

library.add(faChevronLeft)

export default Vue.extend({
  name: 'FiltersView',
  components: { FilterContainer, FontAwesomeIcon },
  data: () => {
    return { renderCount: 0, componentRoute: false }
  },
  computed: {
    ...mapState(['filters', 'tableMeta', 'isSettingsLoaded']),
    isFilterDataLoaded: vm => !!vm.tableMeta && vm.isSettingsLoaded,
    filterSelections: {
      get () {
        return this.filters.selections
      },
      set (val) {
        this.filters.selections = val
        const filterBookmark = bookmarkSelection(val)
        this.addBookmark(filterBookmark)
      }
    }
  },
  methods: {
    ...mapMutations([
      'setHideFilters',
      'applyBookmarkedFilters',
      'setFiltersShown'
    ]),
    updateState (filterSelection) {
      this.setFiltersShown(filterSelection)
      const filterBookmark = bookmarkShown(filterSelection)
      this.addBookmark(filterBookmark)
    },
    addBookmark (filterBookmark) {
      this.componentRoute = true
      console.log(filterBookmark)
      this.$router.push(
        {
          name: 'root',
          query: filterBookmark
        },
        // to prevent error, which occurs on routing to same page (Vue issue)
        () => {}
      )
    }
  },
  watch: {
    '$route.query': function (query) {
      // need to check if component triggered query, if so ignore.
      if (!this.componentRoute) {
        this.applyBookmarkedFilters(query)
        this.renderCount++ // this is a work-around for issue #42 of molgenis-ui-filter
      } else this.componentRoute = false
    }
  },
  mounted () {
    if (this.$route.query) {
      this.applyBookmarkedFilters(this.$route.query)
    }
  }
})
</script>
