<template>
  <div class="d-flex h-100">
    <clipboard-view v-if="showSelected"></clipboard-view>
    <template v-else>
      <select-layout-view></select-layout-view>
      <cart-selection-toast
        v-if="tableSettings.isShop && selectedItemIds.length > 0"
        :cartSelectionText="`${selectedItemIds.length} item${selectedItemIds.length==1?'':'s'} selected`"
        :clickHandler="openSelectionList"
        title="Selection"
        v-model="handleSelectionItems"
      >
        <template v-slot:removeButton><font-awesome-icon icon="times"></font-awesome-icon></template>
        <template v-slot:buttonText>
          <font-awesome-icon icon="shopping-cart"></font-awesome-icon>
          {{ 'dataexplorer_show_cart_btn_label' | i18n}}
        </template>

      </cart-selection-toast>

      <b-modal
        id="reference-table-modal"
        :title="refTableMetaData.label || refTableMetaData.id"
        @hidden="resetRefState"
        hide-footer
        body-class="ref-modal-body"
        dialog-class="ref-modal-dialog">
        <RefTable
          :isDataLoaded="isReferenceModalDataLoaded"
          :entitiesToShow="refTableData"
          :metaData="refTableMetaData"
        ></RefTable>
      </b-modal>
    </template>
  </div>
</template>

<script>
import Vue from 'vue'
import SelectLayoutView from './SelectLayoutView'
import ClipboardView from './ClipboardView'
import RefTable from '@/components/dataDisplayTypes/RefTable'
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
import { CartSelectionToast } from '@molgenis-ui/components-library'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes, faShoppingCart } from '@fortawesome/free-solid-svg-icons'

library.add(faTimes, faShoppingCart)

export default Vue.extend({
  name: 'DataView',
  components: { SelectLayoutView, ClipboardView, CartSelectionToast, FontAwesomeIcon, RefTable },
  data () {
    return {
      isReferenceModalDataLoaded: false,
      refTableData: [],
      refTableMetaData: {}
    }
  },
  computed: {
    ...mapState([
      'showSelected',
      'tableName',
      'tableMeta',
      'tableSettings',
      'searchText',
      'filters',
      'selectedItemIds',
      'tableData',
      'tableMeta'
    ]),
    ...mapGetters(['tableLabelAttributeName', 'clipBoardItems']),
    handleSelectionItems: {
      get () {
        return this.clipBoardItems
      },
      set (value) {
        this.setSelectedItems(value.map(item => item.id))
      }
    },
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
      'setFilterSelection',
      'setShowSelected',
      'setHideFilters',
      'setSelectedItems'
    ]),
    ...mapActions('reference', ['fetchRefData']),
    openSelectionList () {
      this.setShowSelected(true)
      this.setHideFilters(true)
    },
    // Value is either refObject {id {string}, label{string}} or list of refObjects (mref)
    async requestShowRefTable ({ refEntityType, value }) {
      this.$bvModal.show('reference-table-modal')
      const { metaData, data } = await this.fetchRefData({ refEntityType, value })
      this.refTableMetaData = metaData
      this.refTableData = data
      this.isReferenceModalDataLoaded = true
    },
    resetRefState () {
      this.isReferenceModalDataLoaded = false
      this.refTableData = []
      this.refTableMetaData = {}
    }
  },
  created () {
    this.$eventBus.$on('show-reference-table', this.requestShowRefTable)
  },
  destroyed () {
    this.$eventBus.$off('show-reference-table')
  }
})
</script>

<style>
  .ref-modal-body{
    padding: 0;
  }
  .ref-modal-dialog{
    max-width: 90%;
  }
</style>
