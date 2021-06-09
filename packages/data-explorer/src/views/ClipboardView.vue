<template>
  <div v-if="tableData && tableData.items && tableData.items.length > 0 && tableMeta" class="entity-table">
    <div v-if="entitiesToShow.length === 0" class="alert alert-warning">
      {{ $t('dataexplorer_empty_shopping_cart') }}
    </div>
    <div v-else>
      <button v-if="entitiesToShow.length > 5" class="btn btn-primary cart-back mr-2" @click="closeShoppingCart">
        <font-awesome-icon icon="chevron-left" /> {{ $t('dataexplorer_shopping_cart_back_btn_label') }}
      </button>
      <button v-if="entitiesToShow.length > 5" class="btn btn-success cart-order mr-2">
        <font-awesome-icon icon="shopping-bag" /> {{ $t('dataexplorer_shopping_cart_order_btn_label') }}
      </button>
      <table class="table table-bordered overflow-hidden">
        <table-header
          :visible-columns="visibleColumns"
          :sort-column-name="sort.sortColumnName"
          :is-sort-order-reversed="sort.isSortOrderReversed"
          @sort="handleSortEvent"
        />
        <tbody>
          <table-row
            v-for="(entity, index) in entitiesToShow"
            :id="getEntityId(entity)"
            :key="index"
            :row-index="index"
            :table-name="tableName"
            :row-data="entity"
            :visible-columns="visibleColumns"
            :is-selected="isSelected(entity)"
            :is-editable="false"
            :show-selected="true"
            @toggleSelectedItemsHandler="toggleSelectedItems"
          >
            <template #shopping-button>
              <shopping-button :id="getEntityId(entity)" :is-selected="isSelected(entity)" class="float-right" />
            </template>
          </table-row>
        </tbody>
      </table>
    </div>
    <button class="btn btn-primary cart-back mr-2" @click="closeShoppingCart">
      <font-awesome-icon icon="chevron-left" /> {{ $t('dataexplorer_shopping_cart_back_btn_label') }}
    </button>
    <button v-if="entitiesToShow.length > 0" class="btn btn-success cart-order mr-2">
      <font-awesome-icon icon="shopping-bag" /> {{ $t('dataexplorer_shopping_cart_back_btn_label') }}
    </button>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import { TableRow, TableHeader } from '@molgenis-ui/components-library'
import ShoppingButton from '../components/utils/ShoppingButton.vue'

export default {
  name: 'ClipboardView',
  components: { TableRow, TableHeader, ShoppingButton },
  computed: {
    ...mapState('explorer', ['tableMeta', 'selectedItemIds', 'tableData', 'sort', 'tableName', 'showSelected']),
    ...mapGetters('explorer', ['tableIdAttributeName']),
    entitiesToShow () {
      return this.tableData.items.filter((entity) => this.selectedItemIds.includes(this.getEntityId(entity)))
    },
    visibleColumns () {
      return this.tableMeta.attributes
        .filter(a => a.visible)
        .filter(a => a.idAttribute || a.labelAttribute || typeof a.lookupAttributeIndex === 'number')
        .map(a => ({ id: a.id, name: a.name }))
    }
  },
  methods: {
    ...mapActions('explorer', ['fetchTableViewData']),
    ...mapMutations('explorer', ['setShowSelected', 'setHideFilters', 'toggleSelectedItems']),
    getEntityId (entity) {
      return entity[this.tableIdAttributeName].toString()
    },
    isSelected (entity) {
      return this.selectedItemIds.includes(this.getEntityId(entity))
    },
    closeShoppingCart () {
      this.setShowSelected(false)
      this.setHideFilters(false)
    },
    handleSortEvent (sortOrderColumn) {
      const isSortOrderReversed = sortOrderColumn === this.sort.sortColumnName ? !this.sort.isSortOrderReversed : false
      const sortQueryParam = isSortOrderReversed ? '-' + sortOrderColumn : sortOrderColumn

      this.$router.push({
        name: 'de-view', // TODO: ADD ROUTE TO Clipboardview?
        query: { ...this.$route.query, sort: sortQueryParam }
      })
    }
  }
}
</script>
