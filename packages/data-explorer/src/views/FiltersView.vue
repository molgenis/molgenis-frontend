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
    isFilterDataLoaded: vm => !!vm.tableMeta && vm.isSettingsLoaded,
    filterSelections: {
      get () {
        return this.filters.selections
      },
      set (val) {
        this.filters.selections = val
        this.bookmarkSelections = val
        this.addBookmark()
      }
    },
    filterShown: {
      get () {
        if (this.filters.shown.length > 0) {
          return this.filters.shown
        } else {
          return this.bookmarkShown
        }
      },
      set (val) {
        this.setFiltersShown(val)
      }
    }
  },
  methods: {
    ...mapMutations([
      'setHideFilters',
      'applyBookmarkedFilters',
      'setFiltersShown',
      'setBookmark'
    ]),
    updateState (shownFilters) {
      this.setFiltersShown(shownFilters)
      this.bookmarkShown = shownFilters
      this.addBookmark()
    },
    addBookmark () {
      const filterBookmark = createBookmark(
        this.bookmarkShown,
        this.bookmarkSelections
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
    }
  },
  watch: {
    '$route.query': function (query) {
      // need to check if component triggered query, if so ignore.
      if (!this.componentRoute) {
        console.log('trigger too?')
        this.applyBookmarkedFilters(query)
        this.renderCount++ // this is a work-around for issue #42 of molgenis-ui-filter
      } else this.componentRoute = false
    },
    tableMeta: function (meta) {
      if (this.$route.query) {
        this.applyBookmarkedFilters(this.$route.query, meta)
        this.bookmarkShown = this.bookmarkedShownFilters
        this.bookmarkSelections = this.bookmarkedSelections
        this.renderCount++
      }
    }
  }
})
</script>
