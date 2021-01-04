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
              {{tableMeta.label}}
            </span>
            <b-tooltip placement='bottom' target="mainView-headItemTooltipID" triggers="hover">
              {{tableMeta.description}}
            </b-tooltip>
          </li>
        </ol>
      </nav>
      <Toaster v-model="toasts"/>
    </div>
    <div class="mg-content d-flex h-100 overflow-control" :class="{'hidefilters': filters.hideSidebar}">
      <div class="mg-filter mr-2">
        <filters-view></filters-view>
      </div>
      <div class="d-flex flex-column mr-2 h-100 overflow-control w-100">
        <active-filters
          @input="saveFilterState"
          :value="activeFilterSelections"
          :filters="filterDefinitions"
        ></active-filters>
        <toolbar-view class="mb-2"></toolbar-view>
        <pagination v-if="dataDisplayLayout === 'CardView'" class="mt-2 mb-1" v-model="pagination" />
        <div class="mg-data-view-container" >
          <data-view v-if="!pagination.loading"></data-view>
        </div>
        <!--
          (!) This pagination component is always rendered, because it is
          responsible for the data fetching in the background. It is only
          visible in the CardView when the amount of items justifies an
          extra pagination ui at the bottom of the page.
        -->
        <pagination
          v-show="(dataDisplayLayout === 'TableView') || (!pagination.loading && itemsCount > pagination.size)" class="mt-2"
          v-model="pagination"
          :fetchItems="paginateEntities"
        />
        </div>
    </div>
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
  data () {
    return {
      itemsCount: [],
      pagination: { size: 20 }
    }
  },
  name: 'MainView',
  components: { FiltersView, DataView, BreadcrumbBar, Pagination, Toaster, ToolbarView, ActiveFilters },
  computed: {
    toasts: {
      get: function () {
        return this.$store.state.toasts
      },
      set: function (value) {
        this.setToasts(value)
      }
    },
    ...mapState([
      'filters',
      'showSelected',
      'dataDisplayLayout',
      'tableName',
      'tableMeta',
      'tableSettings'
    ]),
    ...mapState('header', [
      'breadcrumbs'
    ]),
    ...mapGetters([
      'isUserAuthenticated'
    ]),
    activeFilterSelections: (vm) => {
      return vm.searchText ? { ...vm.filters.selections, _search: vm.searchText } : vm.filters.selections
    },
    filterDefinitions: (vm) => {
      const searchDef = {
        type: 'string',
        label: 'search',
        name: '_search'
      }
      return vm.searchText ? [ ...vm.filters.definition, searchDef ] : vm.filters.definition
    }
  },
  methods: {
    ...mapMutations([
      'setHideFilters',
      'setTableName',
      'setToasts',
      'setSearchText',
      'setFilterSelection'
    ]),
    ...mapActions([
      'deleteRow',
      'fetchViewData'
    ]),
    ...mapActions('header', [
      'fetchPackageTables'
    ]),
    saveFilterState (newSelections) {
      if (newSelections['_search'] === undefined) {
        this.setSearchText('')
      }
      this.setFilterSelection(newSelections)
    },
    async handeldeleteItem (itemId) {
      const msg = 'Are you sure you want to delete this item ?'
      const isDeleteConfirmed = await this.$bvModal.msgBoxConfirm(msg, deleteConfirmOptions)
      if (isDeleteConfirmed) {
        this.deleteRow({ rowId: itemId })
      }
    },
    async paginateEntities () {
      // The data-API uses zero-based page numbering, where pagination is one-based.
      const pagination = { ...this.pagination, page: this.pagination.page - 1 }
      const request = await this.fetchViewData({ tableName: this.$route.params.entity, pagination })
      if (!request || !request.items.length) {
        this.itemsCount = 0
      } else {
        this.itemsCount = request.response.data.page.totalElements
      }

      return { count: this.itemsCount }
    }
  },
  created () {
    this.$eventBus.$on('delete-item', (data) => {
      this.handeldeleteItem(data)
    })
  },
  destroyed () {
    this.$eventBus.$off('delete-item')
  },
  async beforeRouteUpdate (to, from, next) {
    if (this.$route.params.entity !== to.params.entity) {
      await this.fetchViewData({ tableName: to.params.entity, pagination: this.pagination })
    }
    next()
  }
})
</script>

<style scoped>
  >>> .breadcrumb {
    margin: -16px -16px 16px -16px;
  }
  .mg-content {
    white-space: normal;
  }
  .mg-filter {
    z-index: 1; /* prioritizes stacking index of sidebar: needed for datepicker */
    transition: max-width 0.3s, min-width 0.3s, transform 0.3s;
    min-width: 20rem;
    max-width: 20rem;
    transform: translateX( 0 );
  }

  .mg-data-view-container {
    width: 100%;
  }
  .hidefilters .mg-filter {
    transition: max-width 0.3s, min-width 0.3s, transform 0.6s;
    transform: translateX( -20rem );
    max-width: 0;
    min-width: 0;
    padding-right: 0;
  }
  .hidefilters .mg-data-view-container{
    max-width: 100%;
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
