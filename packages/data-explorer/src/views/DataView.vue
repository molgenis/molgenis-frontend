<template>
  <div class="d-flex h-100">
    <clipboard-view v-if="showSelected" />
    <template v-else>
      <select-layout-view />
      <cart-selection-toast
        v-if="tableSettings.isShop && selectedItemIds.length > 0"
        v-model="handleSelectionItems"
        :cart-selection-text="`${selectedItemIds.length} item${selectedItemIds.length==1?'':'s'} selected`"
        :click-handler="openSelectionList"
        title="Selection"
      >
        <template #removeButton>
          <font-awesome-icon icon="times" />
        </template>
        <template #buttonText>
          <font-awesome-icon icon="shopping-cart" />
          {{ $t('dataexplorer_show_cart_btn_label') }}
        </template>
      </cart-selection-toast>

      <b-modal
        id="reference-table-modal"
        :title="refTableMetaData.label || refTableMetaData.id"
        hide-footer
        body-class="ref-modal-body"
        dialog-class="ref-modal-dialog"
        @hidden="resetRefState"
      >
        <RefTable
          :is-data-loaded="isReferenceModalDataLoaded"
          :entities-to-show="refTableData"
          :meta-data="refTableMetaData"
        />
      </b-modal>
    </template>
  </div>
</template>

<script>
import SelectLayoutView from './SelectLayoutView'
import ClipboardView from './ClipboardView'
import RefTable from '@/components/dataDisplayTypes/RefTable'
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
import { CartSelectionToast } from '@molgenis-ui/components-library'

export default {
  name: 'DataView',
  components: { SelectLayoutView, ClipboardView, CartSelectionToast, RefTable },
  data () {
    return {
      isReferenceModalDataLoaded: false,
      refTableData: [],
      refTableMetaData: {}
    }
  },
  computed: {
    ...mapState('explorer', [
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
    ...mapGetters('explorer', ['tableLabelAttributeName', 'clipBoardItems']),
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
  created () {
    this.$eventBus.$on('show-reference-table', this.requestShowRefTable)
  },
  destroyed () {
    this.$eventBus.$off('show-reference-table')
  },
  methods: {
    ...mapMutations('explorer', [
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
  }
}
</script>

<style>
  .ref-modal-body {
    padding: 0;
  }

  .ref-modal-dialog {
    max-width: 90%;
  }
</style>
