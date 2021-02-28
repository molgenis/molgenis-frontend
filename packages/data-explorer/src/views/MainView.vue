<template>
  <div class="mg-mainview d-flex flex-column h-100 overflow-control">
    <div class="container-fluid">
      <breadcrumb-bar
        v-if="isUserAuthenticated"
        :breadcrumbs="breadcrumbs"
        @fetchItems="fetchPackageTables"
        :headItemTooltip="tableMeta && tableMeta.description"
      >
      </breadcrumb-bar>
      <nav v-else aria-label="breadcrumb">
        <ol v-if="tableMeta" class="breadcrumb">
          <li class="breadcrumb-item active" aria-current="page">
            <span id="mainView-headItemTooltipID">
              {{ tableMeta.label }}
            </span>
            <b-tooltip v-if="tableMeta.description" placement="bottom" target="mainView-headItemTooltipID" triggers="hover">
              {{ tableMeta.description }}
            </b-tooltip>
          </li>
        </ol>
      </nav>
      <Toaster v-model="toasts" />
    </div>
    <div class="mg-content d-flex h-100 overflow-control">
      <button
        @click="showSidebar"
        class="btn btn-outline-secondary mg-filter-tab"
        :class="{'active': filters.hideSidebar}"
        :title="$t('dataexplorer_filters_show_btn_label')"
      >
          <font-awesome-icon icon="chevron-right"/>
      </button>
      <filters-view class="mg-filter mr-2" :class="{'active': filters.hideSidebar}"/>

      <div class="d-flex flex-column mr-2 h-100 overflow-control w-100">
        <active-filters @input="saveFilterState" :value="activeFilterSelections" :filters="filterDefinitions"></active-filters>
        <toolbar-view class="mb-2"></toolbar-view>

        <div class="mg-data-view-container">
          <data-view v-if="!tablePagination.loading"></data-view>
        </div>
        <pagination class="mt-2" v-model="tablePagination" />
      </div>
    </div>
    <b-overlay :show="loading" no-wrap />
  </div>
</template>

<script>
import Vue from 'vue'
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

export default Vue.extend({
  name: 'MainView',
  components: { FiltersView, DataView, BreadcrumbBar, Pagination, Toaster, ToolbarView, ActiveFilters },
  computed: {
    tablePagination: {
      get: function () {
        return this.$store.state.tablePagination
      },
      set: function (value) {
        this.$router.push({
          name: 'main-view',
          query: { ...this.$route.query, page: value.page, size: value.size }
        })
      }
    },
    toasts: {
      get: function () {
        return this.$store.state.toasts
      },
      set: function (value) {
        this.setToasts(value)
      }
    },
    ...mapState(['filters', 'showSelected', 'dataDisplayLayout', 'tableData', 'tableName', 'tableMeta', 'tableSettings', 'searchText', 'loading']),
    ...mapState('header', ['breadcrumbs']),
    ...mapGetters(['isUserAuthenticated', 'compressedRouteFilter']),
    activeFilterSelections () {
      return this.searchText ? { ...this.filters.selections, _search: this.searchText } : this.filters.selections
    },
    filterDefinitions () {
      const searchDef = {
        type: 'string',
        label: 'search',
        name: '_search'
      }
      return this.searchText ? [...this.filters.definition, searchDef] : this.filters.definition
    }
  },
  methods: {
    ...mapMutations(['setTableName', 'setToasts', 'setSearchText', 'setFilterSelection', 'setDataDisplayLayout', 'setRouteQuery']),
    ...mapActions(['deleteRow', 'fetchViewData', 'fetchTableMeta', 'fetchTablePermissions']),
    ...mapActions('header', ['fetchPackageTables']),
    saveFilterState (newSelections) {
      if (newSelections['_search'] === undefined) {
        this.setSearchText('')
      }
      this.setFilterSelection(newSelections)
      this.$router.push({
        name: 'main-view',
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
        name: 'main-view',
        query: { ...this.$route.query, filter: this.compressedRouteFilter, hideSidebar: String(false) }
      })
    }
  },
  async created () {
    this.$eventBus.$on('delete-item', (data) => {
      this.handeldeleteItem(data)
    })
    const tableName = this.$route.params.entity
    this.fetchTablePermissions({ tableName })
    await this.fetchTableMeta({ tableName })
    this.setRouteQuery(this.$route.query)
    this.setDataDisplayLayout(this.$route.params.view)
    this.fetchViewData()
  },
  destroyed () {
    this.$eventBus.$off('delete-item')
  },
  async beforeRouteUpdate (to, from, next) {
    if (to.params.entity !== from.params.entity) {
      const tableName = to.params.entity
      this.fetchTablePermissions({ tableName })
      await this.fetchTableMeta({ tableName })
    }
    this.setRouteQuery(to.query)
    this.setDataDisplayLayout(to.params.view)
    await this.fetchViewData()
    next()
  }
})
</script>

<style scoped>
  .mg-content {
    white-space: normal;
  }

  .mg-data-view-container {
    width: 100%;
  }

  .mg-filter {
    transition: max-width 0.3s, min-width 0.3s, transform 0.3s;
    min-width: 20rem;
    max-width: 20rem;
  }

  .mg-filter.active {
    transition: max-width 0.3s, min-width 0.3s, transform 0.6s;
    transform: translateX(-20rem);
    max-width: 0;
    min-width: 0;
    padding-right: 0;
  }

  .mg-filter.active + div > .mg-data-view-container{
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
      min-width: 0;
      max-width: none;
      padding: 0;
    }
  }
</style>
