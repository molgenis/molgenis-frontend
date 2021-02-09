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
          v-model="filterSelections"
          :filters="filters.definition"
          :filters-shown="filterShown"
          @update="updateState"
          :can-edit="true"
          dialogStyle="modal"
        ></filter-container>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapMutations, mapGetters, createNamespacedHelpers } from 'vuex'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { FilterContainer } from '@molgenis-ui/components-library'

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
      'tableMeta'
    ]),
    ...mapGetters([
      'compressedRouteFilter'
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
        this.updateRoute()
      }
    },
    filterShown: {
      get () {
        return this.filters.shown
      },
      set (val) {
        this.setFiltersShown(val)
        this.updateRoute()
      }
    }
  },
  methods: {
    ...mapMutations([
      'setHideFilters',
      'setFiltersShown',
      'setFilterSelection'
    ]),
    updateState (shownFilters) {
      this.setFiltersShown(shownFilters)
      this.updateRoute()
    },
    updateRoute () {
      this.$router.push({
        name: 'main-view',
        query: { ...this.$route.query, filter: this.compressedRouteFilter }
      })
    }
  }
})
</script>
