<template>
  <div>
    <div>
      <div class="p-0 mb-2 d-flex justify-content-between align-items-center">
        <h2 class="m-0">{{ $t('dataexplorer_filters_header') }}</h2>
        <button
          type="button"
          class="btn btn-light btn-outline-secondary hide-filters"
          :title="$t('dataexplorer_filters_hide_btn_label')"
          @click="hideSidebar"
        >
          <font-awesome-icon icon="chevron-left"></font-awesome-icon>
        </button>
      </div>

      <filter-container
        v-if="isFilterDataLoaded"
        v-model="filterSelections"
        :filters="filters.definition"
        :filters-shown="filterShown"
        :filterActionLabel="$t('dataexplorer_filter_action_Label')"
        :filterListLabel="$t('dataexplorer_filter_list_Label')"
        @update="updateState"
        :can-edit="true"
        dialogStyle="dropdown"
      ></filter-container>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import { FilterContainer } from '@molgenis-ui/components-library'

export default {
  name: 'FiltersView',
  components: { FilterContainer },
  data: () => {
    return {
      renderCount: 0
    }
  },
  computed: {
    ...mapState('explorer', [
      'filters',
      'tableMeta'
    ]),
    ...mapGetters('explorer', [
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
    ...mapMutations('explorer', [
      'setFiltersShown',
      'setFilterSelection'
    ]),
    updateState (shownFilters) {
      this.setFiltersShown(shownFilters)
      this.updateRoute()
    },
    updateRoute () {
      this.$router.push({
        name: 'de-view',
        query: { ...this.$route.query, filter: this.compressedRouteFilter }
      })
    },
    hideSidebar () {
      this.$router.push({
        name: 'de-view',
        query: { ...this.$route.query, filter: this.compressedRouteFilter, hideSidebar: String(true) }
      })
    }
  }
}
</script>
