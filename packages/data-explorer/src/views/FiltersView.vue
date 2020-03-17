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
          v-model="filters.selections"
          :filters="filters.definition"
          :filters-shown="filters.shown"
          :can-edit="true"
          @update="updateState"
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
import { encodeBookmark, decodeBookmark } from '../store/helpers'

library.add(faChevronLeft)

export default Vue.extend({
  name: 'FiltersView',
  components: { FilterContainer, FontAwesomeIcon },
  data: () => {
    return { renderCount: 0 }
  },
  computed: {
    ...mapState(['filters', 'tableMeta', 'isSettingsLoaded']),
    isFilterDataLoaded: vm => !!vm.tableMeta && vm.isSettingsLoaded
  },
  methods: {
    ...mapMutations([
      'setHideFilters',
      'setFiltersShown',
      'applyBookmarkedFilters'
    ]),
    updateState (newState) {
      this.setFiltersShown(newState)
      this.bookmarkFilters()
    },
    bookmarkFilters () {
      const encodedFilters = encodeBookmark(this.filters)

      this.$router.push(
        {
          name: 'root',
          query: { filters: encodedFilters }
        },
        // to prevent error, which occurs on routing to same page (Vue issue)
        () => {}
      )
    }
  },
  watch: {
    '$route.query': function () {
      this.applyBookmarkedFilters(decodeBookmark(this.$route.query))
      this.renderCount++ // this is a work-around for issue #42 of molgenis-ui-filter
    }
  }
})
</script>
