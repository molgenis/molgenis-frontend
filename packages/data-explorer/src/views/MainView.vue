<template>
  <div class="mg-mainview d-flex flex-column h-100 overflow-control">
    <div class="container-fluid">
      <breadcrumb-bar
        v-if="isUserAuthenticated"
        :breadcrumbs="breadcrumbs"
        :head-item-tooltip="tableMeta && tableMeta.description"
        @fetchItems="fetchPackageTables"
      />
      <nav v-else aria-label="breadcrumb">
        <ol v-if="tableMeta" class="breadcrumb">
          <li class="breadcrumb-item active" aria-current="page">
            <span id="mainView-headItemTooltipId">
              {{ tableMeta.label }}
            </span>
            <b-tooltip
              v-if="tableMeta.description" placement="bottom"
              target="mainView-headItemTooltipId"
              triggers="hover"
            >
              {{ tableMeta.description }}
            </b-tooltip>
          </li>
        </ol>
      </nav>
      <Toaster v-model="_toasts" />
    </div>
    <div class="mg-content d-flex h-100 overflow-control">
      <button
        class="btn btn-outline-secondary mg-filter-tab"
        :class="{'active': filters.hideSidebar}"
        :title="$t('dataexplorer_filters_show_btn_label')"
        @click="showSidebar"
      >
        <font-awesome-icon icon="chevron-right" />
      </button>
      <filters-view class="mg-filter mr-2" :class="{'active': filters.hideSidebar}" />

      <div class="d-flex flex-column mr-2 h-100 overflow-control w-100">
        <active-filters :value="activeFilterSelections" :filters="filterDefinitions" @input="saveFilterState" />
        <toolbar-view class="mb-2" />

        <div class="mg-data-view-container">
          <data-view v-if="!_tablePagination.loading" />
        </div>
        <pagination v-show="!loading" v-model="_tablePagination" class="mt-2" />
      </div>
    </div>
    <b-overlay :show="loading" no-wrap />
  </div>
</template>

<script>
import FiltersView from './FiltersView'
import BreadcrumbBar from '@/components/BreadcrumbBar.vue'
import { ActiveFilters, Pagination, Toaster } from '@molgenis-ui/components-library'

import DataView from './DataView'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import ToolbarView from './ToolbarView'

const deleteConfirmOptions = {
  okVariant: 'danger',
  okTitle: 'Delete',
  cancelTitle: 'Cancel',
  hideHeaderClose: false,
  centered: true
}

export default {
  name: 'MainView',
  components: { FiltersView, DataView, BreadcrumbBar, Pagination, Toaster, ToolbarView, ActiveFilters },
  async beforeRouteUpdate (to, from, next) {
    this.setLoading(true)
    if (to.params.entity !== from.params.entity) {
      const tableName = to.params.entity
      this.fetchTablePermissions({ tableName })
      await this.fetchTableMeta({ tableName })
    }
    this.setRouteQuery(to.query)
    this.setDataDisplayLayout(to.query.view)
    await this.fetchViewData()
    this.setLoading(false)
    next()
  },
  computed: {
    _tablePagination: {
      get: function () {
        return this.tablePagination
      },
      set: function (value) {
        this.$router.push({
          name: 'de-view',
          query: { ...this.$route.query, page: value.page, size: value.size }
        })
      }
    },
    _toasts: {
      get: function () {
        return this.toasts
      },
      set: function (value) {
        this.setToasts(value)
      }
    },
    ...mapState('explorer', [ 'filters', 'showSelected', 'dataDisplayLayout', 'tablePagination', 'tableData', 'tableName', 'tableMeta', 'tableSettings', 'toasts', 'searchText', 'loading' ]),
    ...mapState('header', [ 'breadcrumbs' ]),
    ...mapGetters('explorer', [ 'isUserAuthenticated', 'compressedRouteFilter' ]),
    activeFilterSelections () {
      return this.searchText ? { ...this.filters.selections, _search: this.searchText } : this.filters.selections
    },
    filterDefinitions () {
      const searchDef = {
        type: 'string',
        label: 'search',
        name: '_search'
      }
      return this.searchText ? [ ...this.filters.definition, searchDef ] : this.filters.definition
    }
  },
  async created () {
    this.setLoading(true)
    this.$eventBus.$on('delete-item', (data) => {
      this.handeldeleteItem(data)
    })
    const tableName = this.$route.params.entity
    this.fetchTablePermissions({ tableName })
    await this.fetchTableMeta({ tableName })
    this.setRouteQuery(this.$route.query)
    this.setDataDisplayLayout(this.$route.query.view)
    await this.fetchViewData()
    this.setLoading(false)
  },
  destroyed () {
    this.$eventBus.$off('delete-item')
  },
  methods: {
    ...mapMutations('explorer', [ 'setToasts', 'setLoading', 'setSearchText', 'setFilterSelection', 'setDataDisplayLayout', 'setRouteQuery' ]),
    ...mapActions('explorer', [ 'deleteRow', 'fetchViewData', 'fetchTableMeta', 'fetchTablePermissions' ]),
    ...mapActions('header', [ 'fetchPackageTables' ]),
    saveFilterState (newSelections) {
      if (newSelections['_search'] === undefined) {
        this.setSearchText('')
      }
      this.setFilterSelection(newSelections)
      this.$router.push({
        name: 'de-view',
        query: { ...this.$route.query, filter: this.compressedRouteFilter }
      })
    },
    async handeldeleteItem (itemId) {
      const msg = 'Are you sure you want to delete this item ?'
      const isDeleteConfirmed = await this.$bvModal.msgBoxConfirm(msg, deleteConfirmOptions)
      if (isDeleteConfirmed) {
        this.deleteRow({ rowId: itemId })
      }
    },
    showSidebar () {
      this.$router.push({
        name: 'de-view',
        query: { ...this.$route.query, filter: this.compressedRouteFilter, hideSidebar: String(false) }
      })
    }
  }
}
</script>

<style scoped>
  .mg-content {
    white-space: normal;
  }

  .mg-data-view-container {
    width: 100%;
  }

  .mg-filter {
    max-width: 20rem;
    min-width: 20rem;
    transition: max-width 0.3s, min-width 0.3s, transform 0.3s;
  }

  .mg-filter.active {
    max-width: 0;
    min-width: 0;
    padding-right: 0;
    transform: translateX(-20rem);
    transition: max-width 0.3s, min-width 0.3s, transform 0.6s;
  }

  .mg-filter.active + div > .mg-data-view-container {
    max-width: 100%;
  }

  .mg-filter-tab {
    align-items: center;
    display: flex;
    height: 100px;
    justify-content: center;
    left: 0;
    padding: 0;
    position: absolute;
    transform: translateX(-20px);
    transition: transform 0.3s;
    vertical-align: middle;
    width: 12px;
    z-index: 900;
  }

  .mg-filter-tab.active {
    transform: translateX(0);
  }

  .mg-filter-tab:hover {
    cursor: pointer;
  }

  @media only screen and (max-width: 576px) { /* Bootstrap brakepoint sm */
    .mg-content {
      display: block;
    }

    .mg-content .mg-filter {
      max-width: none;
      min-width: 0;
      padding: 0;
    }
  }
</style>
