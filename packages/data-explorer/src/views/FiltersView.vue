<template>
  <div>
    <div>
      <div class="p-0 mb-2 d-flex justify-content-between align-items-center">
        <h2 class="m-0">{{ 'dataexplorer_filters_header' | i18n}}</h2>
        <button
          type="button"
          class="btn btn-light btn-outline-secondary hide-filters"
          :title="$t('dataexplorer_filters_hide_btn_label')"
          @click="toggleFilterbar"
        >
          <font-awesome-icon icon="chevron-left"></font-awesome-icon>
        </button>
      </div>

      <filter-container
        v-if="isFilterDataLoaded"
        v-model="filterSelections"
        :filters="filters.definition"
        :filters-shown="filterShown"
        @update="updateState"
        :can-edit="true"
        dialogStyle="dropdown"
      ></filter-container>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapMutations, mapGetters } from 'vuex'
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
    },
    toggleFilterbar () {
      const filterbar = !this.$store.state.filters.hideSidebar ? '0' : '1'
      this.$router.push({
        name: 'main-view',
        query: { ...this.$route.query, filter: this.compressedRouteFilter, filterbar }
      })
    }
  }
})
</script>
