<template>
  <div class="container-fluid">
    <breadcrumb-bar v-if="isUserAuthenticated" :breadcrumbs="breadcrumbs" />
    <toast-component
      class="toast-component mt-2"
      v-if="toast"
      :type="toast.type"
      :message="toast.message"
      @toastCloseBtnClicked="clearToast">
    </toast-component>
    <page-header-view v-if="!loading"></page-header-view>
    <div class="flex-mainview d-flex" :class="{'hidefilters': filters.hideSidebar}">
      <div class="flex-filter">
        <filters-view v-if="!loading"></filters-view>
      </div>
      <div class="flex-data ml-4" >
        <button
          type="button"
          class="btn btn-light m-0 btn-outline-secondary show-filters-button py-1"
          title="Show Filters"
          v-if="filters.hideSidebar && !showShoppingCart"
          @click="setHideFilters(false)">
          <font-awesome-icon icon="chevron-up"></font-awesome-icon>
          <span class="ml-2">Filters</span>
        </button>

        <data-view v-if="!loading"></data-view>
      </div>
    </div>

  </div>
</template>

<script>
import Vue from 'vue'
import FiltersView from './FiltersView'
import ToastComponent from '../components/utils/ToastComponent'
import BreadcrumbBar from '@/components/BreadcrumbBar.vue'
import DataView from './DataView'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import PageHeaderView from './PageHeaderView'

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
  components: { FiltersView, DataView, ToastComponent, FontAwesomeIcon, PageHeaderView, BreadcrumbBar },
  computed: {
    ...mapState([
      'filters',
      'toast',
      'showShoppingCart',
      'dataDisplayLayout',
      'tableName'
    ]),
    ...mapState('header', [
      'breadcrumbs'
    ]),
    ...mapGetters([
      'isUserAuthenticated'
    ])
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    ...mapMutations([
      'clearToast',
      'setHideFilters',
      'setTableName'
    ]),
    ...mapActions([
      'deleteRow',
      'fetchTableMeta',
      'fetchCardViewData',
      'fetchTableViewData',
      'fetchTableMeta'
    ]),
    ...mapActions('header', [
      'fetchBreadcrumbs'
    ]),
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
        if(this.isUserAuthenticated) {
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
  }
  .flex-mainview {
    white-space: normal;
  }
  .flex-filter {
    z-index: 1; /* prioritizes stacking index of sidebar: needed for datepicker */
    transition: max-width 0.3s, min-width 0.3s, transform 0.3s;
    min-width: 20rem;
    max-width: 20rem;
    padding-right: 1rem;
    transform: translateX( 0 );
  }

  .flex-data {
    max-width: calc(100% - 22rem);
    width: 100%;
  }
  .hidefilters .flex-filter {
    transition: max-width 0.3s, min-width 0.3s, transform 0.6s;
    transform: translateX( -20rem );
    max-width: 0;
    min-width: 0;
    padding-right: 0;
  }
  .hidefilters .flex-data {
    max-width: 100%;
  }

  @media only screen and (max-width: 576px) { /* Bootstrap brakepoint sm */
    .flex-mainview {
      display: block;
    }
    .flex-mainview .flex-filter {
      min-width: 0;
      max-width: none;
      padding: 0;
    }
  }

  .container-fluid >>> .breadcrumb {
    margin-left: -1rem;
    margin-right: -1rem;
  }
</style>
