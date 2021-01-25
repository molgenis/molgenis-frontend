<template>
  <div class="entity-table" v-if="tableData && tableData.items && tableData.items.length > 0 && tableMeta">
    <div v-if="entitiesToShow.length === 0" class="alert alert-warning">
      {{ 'dataexplorer_empty_shopping_cart' | i18n}}
    </div>
    <div v-else>
      <button class="btn btn-primary cart-back mr-2" @click="closeShoppingCart" v-if="entitiesToShow.length > 5">
        <font-awesome-icon icon="chevron-left"></font-awesome-icon> Back
      </button>
      <button class="btn btn-success cart-order mr-2" v-if="entitiesToShow.length > 5">
        <font-awesome-icon icon="shopping-bag"></font-awesome-icon> Order
      </button>
      <table class="table table-bordered overflow-hidden">
        <table-header :visibleColumns="visibleColumns" :isShop="true"></table-header>
        <tbody>
        <table-row v-for="(entity, index) in entitiesToShow"
                   :key="index"
                   :rowIndex="index"
                   :id="getEntityId(entity)"
                   :tableName="tableName"
                   :rowData="entity"
                   :visibleColumns="visibleColumns"
                   :isSelected="isSelected(entity)"
                   :isShop="true"
                   :showSelected="showSelected"></table-row>
        </tbody>
      </table>
    </div>
    <button class="btn btn-primary cart-back mr-2" @click="closeShoppingCart">
      <font-awesome-icon icon="chevron-left"></font-awesome-icon> Back
    </button>
    <button v-if="entitiesToShow.length > 0" class="btn btn-success cart-order mr-2">
      <font-awesome-icon icon="shopping-bag"></font-awesome-icon> Order
    </button>
  </div>
</template>

<script>
import TableRow from '../components/dataView/TableRow'
import TableHeader from '../components/dataView/TableHeader'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faShoppingBag, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faShoppingBag, faChevronLeft)

export default {
  name: 'ClipboardView',
  components: { TableRow, TableHeader, FontAwesomeIcon },
  computed: {
    ...mapState(['tableMeta', 'selectedItemIds', 'tableData', 'tableName', 'showSelected']),
    ...mapGetters(['tableIdAttributeName']),
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
    ...mapActions(['fetchTableViewData']),
    ...mapMutations(['setShowSelected', 'setHideFilters']),
    getEntityId (entity) {
      return entity[this.tableIdAttributeName].toString()
    },
    isSelected (entity) {
      return this.selectedItemIds.includes(this.getEntityId(entity))
    },
    closeShoppingCart () {
      this.setShowSelected(false)
      this.setHideFilters(false)
    }
  }
}
</script>
