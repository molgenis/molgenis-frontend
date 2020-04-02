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
import FilterContainer from '../../node_modules/@molgenis/molgenis-ui-filter/src/components/FilterContainer.vue'
import { createBookmark } from '../mappers/bookmarkMapper'

library.add(faChevronLeft)

export default Vue.extend({
  name: 'FiltersView',
  components: { FilterContainer, FontAwesomeIcon },
  data: () => {
    return {
      renderCount: 0,
      componentRoute: false,
      bookmarkShown: [],
      bookmarkSelections: {}
    }
  },
  computed: {
    ...mapState([
      'filters',
      'tableMeta',
      'isSettingsLoaded',
      'bookmarkedShownFilters',
      'bookmarkedSelections'
    ]),
    isFilterDataLoaded: vm => vm.tableMeta !== null && vm.isSettingsLoaded,
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
      'setFilters',
      'setFiltersShown',
      'setFilterSelection',
      'setBookmark'
    ]),
    updateState (shownFilters) {
      this.setFiltersShown(shownFilters)
      this.addBookmark()
    },
    addBookmark () {
      const filterBookmark = createBookmark(
        this.filters.shown,
        this.filters.selections
      )
      this.componentRoute = true
      this.$router.push(
        {
          name: 'root',
          query: filterBookmark
        },
        // to prevent error, which occurs on routing to same page (Vue issue)
        () => {}
      )
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
        this.setFilters(query)
        this.refreshFilterView()
      } else this.componentRoute = false
    },
    filterSelections: function () {
      this.addBookmark()
    },
    isFilterDataLoaded () {
      this.setFilters()
      this.refreshFilterView()
    }
  }
})
</script>
