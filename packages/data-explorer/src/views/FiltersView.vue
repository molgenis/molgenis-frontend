<template>
  <div>
    <div>
      <div class="p-0 px-2 d-flex justify-content-between align-items-center">
        <h2 class="m-0">Filters</h2>
        <button
          type="button"
          class="btn btn-light btn-outline-secondary hide-filters"
          title="Hide Filters"
          @click="setHideFilters(true)"
        >
          <font-awesome-icon icon="chevron-left"></font-awesome-icon>
        </button>
      </div>
      <div class="p-2">
        <filter-container
         v-if="isFilterDataLoaded"
          :key="renderCount"
          v-model="filterSelections"
          :filters="filters.definition"
          :filters-shown="filterShown"
          @update="updateState"
          :can-edit="true"
        ></filter-container>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapMutations, createNamespacedHelpers } from 'vuex'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { FilterContainer } from '@molgenis-ui/components-library'
import { createBookmark } from '../mappers/bookmarkMapper'

library.add(faChevronLeft)

export default Vue.extend({
  name: 'FiltersView',
  components: { FilterContainer, FontAwesomeIcon },
  data: () => {
    return {
      renderCount: 0
    }
  },
  computed: {
    ...mapState([
      'filters',
      'tableMeta',
      'bookmarkedShownFilters',
      'bookmarkedSelections',
      'componentRoute'
    ]),
    isFilterDataLoaded () {
      return this.tableMeta !== null
    },
    filterSelections: {
      get () {
        return this.filters.selections
      },
      set (val) {
        this.setFilterSelection(val)
        this.addBookmark()
      }
    },
    filterShown: {
      get () {
        return this.filters.shown
      },
      set (val) {
        this.setFiltersShown(val)
        this.addBookmark()
      }
    }
  },
  methods: {
    ...mapMutations([
      'setHideFilters',
      'applyBookmark',
      'setFiltersShown',
      'setFilterSelection',
      'setComponentRoute'
    ]),
    updateState (shownFilters) {
      this.setFiltersShown(shownFilters)
      this.addBookmark()
    },
    addBookmark () {
      createBookmark(this.$router)
    },
    refreshFilterView () {
      // Refresh the filtercomponent
      this.renderCount++
    }
  },
  watch: {
    '$route.query': function (query) {
      // need to check if component triggered query, if so ignore.
      if (!this.componentRoute) {
        this.applyBookmark(query.bookmark)
        this.refreshFilterView()
      } else this.setComponentRoute(false)
    }
  }
})
</script>
