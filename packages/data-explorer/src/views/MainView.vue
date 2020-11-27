<template>
  <div class="mg-mainview d-flex flex-column h-100 overflow-control">
    <div class="container-fluid">
      <breadcrumb-bar
        v-if="isUserAuthenticated"
        :breadcrumbs="breadcrumbs"
        @fetchItems="fetchPackageTables"
        >
      </breadcrumb-bar>
      <Toaster v-model="toasts"/>
      <page-header-view v-if="!loading && dataDisplayLayout !== 'TableView' "></page-header-view>
    </div>
    <div class="mg-content d-flex h-100 overflow-control" :class="{'hidefilters': filters.hideSidebar}">
      <div class="mg-filter mr-2">
        <filters-view v-if="!loading"></filters-view>
      </div>
      <div class="d-flex flex-column mr-2 h-100 overflow-control w-100">
        <toolbar-view class="mb-2"></toolbar-view>
        <active-filters
          @input="saveFilterState"
          :value="activeFilterSelections"
          :filters="filterDefinitions"
        ></active-filters>
        <div class="mg-data-view-container" >
          <button
            type="button"
            class="btn btn-light m-0 btn-outline-secondary show-filters-button py-1"
            title="Show Filters"
            v-if="filters.hideSidebar && !showSelected"
            @click="setHideFilters(false)">
            <font-awesome-icon icon="chevron-up"></font-awesome-icon>
            <span class="ml-2">Filters</span>
          </button>

          <data-view v-if="!loading"></data-view>
        </div>
        </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import FiltersView from './FiltersView'
import BreadcrumbBar from '@/components/BreadcrumbBar.vue'
import { ActiveFilters, Toaster } from '@molgenis-ui/components-library'

import DataView from './DataView'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import PageHeaderView from './PageHeaderView'
import ToolbarView from './ToolbarView'

library.add(faChevronUp)

const deleteConfirmOptions = {
  okVariant: 'danger',
  okTitle: 'Delete',
  cancelTitle: 'Cancel',
  hideHeaderClose: false,
  centered: true
}

export default Vue.extend({
  name: 'MainView',
  components: { FiltersView, DataView, FontAwesomeIcon, PageHeaderView, BreadcrumbBar, Toaster, ToolbarView, ActiveFilters },
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
      'tableName'
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
  data () {
    return {
      loading: false
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
      'fetchTableMeta',
      'fetchCardViewData',
      'fetchTableViewData',
      'fetchTableMeta'
    ]),
    ...mapActions('header', [
      'fetchBreadcrumbs',
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
    async fetchViewData (tableName) {
      if (this.tableName !== tableName) {
        this.loading = true
        await this.fetchTableMeta({ tableName })
        if (this.isUserAuthenticated) {
          this.fetchBreadcrumbs()
        }
        this.setTableName(tableName)
      }
      if (this.dataDisplayLayout === 'CardView') {
        this.fetchCardViewData()
      } else {
        this.fetchTableViewData()
      }
      this.loading = false
    }
  },
  created () {
    this.$eventBus.$on('delete-item', (data) => {
      this.handeldeleteItem(data)
    })
    this.fetchViewData(this.$route.params.entity)
  },
  destroyed () {
    this.$eventBus.$off('delete-item')
  },
  async beforeRouteUpdate (to, from, next) {
    await this.fetchViewData(to.params.entity)
    next()
  }
})
</script>

<style scoped>
  .show-filters-button {
    display: inline-block;
    white-space: nowrap;
    position: absolute;
    left: -1px;
    transform: rotate(90deg);
    transform-origin: 0 100%;
    z-index: 2;
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

  .container-fluid >>> .breadcrumb {
    margin-left: -15px;
    margin-right: -15px;
  }
</style>
