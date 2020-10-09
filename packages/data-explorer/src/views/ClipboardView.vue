<template>
  <div v-if="tableData && tableData.items && tableData.items.length > 0 && tableMeta" class="entity-table">
    <div v-if="entitiesToShow.length === 0" class="alert alert-warning">
      {{ 'dataexplorer_empty_shopping_cart' | i18n }}
    </div>
    <div v-else>
      <button v-if="entitiesToShow.length > 5" class="btn btn-primary cart-back mr-2" @click="closeShoppingCart">
        <font-awesome-icon icon="chevron-left"></font-awesome-icon> Back
      </button>
      <button v-if="entitiesToShow.length > 5" class="btn btn-success cart-order mr-2">
        <font-awesome-icon icon="shopping-bag"></font-awesome-icon> Order
      </button>
      <table class="table">
        <table-header :visible-columns="visibleColumns" :is-shop="true"></table-header>
        <tbody>
          <table-row
            v-for="(entity, index) in entitiesToShow"
            :id="getEntityId(entity)"
            :key="index"
            :table-name="tableName"
            :row-data="entity"
            :visible-columns="visibleColumns"
            :is-selected="isSelected(entity)"
            :is-shop="true"
          ></table-row>
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
import Vue from 'vue'
import TableRow from '../components/dataView/TableRow'
import TableHeader from '../components/dataView/TableHeader'
import { mapState, mapMutations, mapActions } from 'vuex'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faShoppingBag, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faShoppingBag, faChevronLeft)

export default Vue.extends({
  name: 'ClipboardView',
  components: { TableRow, TableHeader, FontAwesomeIcon },
  computed: {
    ...mapState(['tableMeta', 'selectedItemIds', 'tableData', 'tableName']),
    idAttribute () {
      return this.tableMeta.idAttribute
    },
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
      return entity[this.idAttribute.name].toString()
    },
    isSelected (entity) {
      return this.selectedItemIds.includes(this.getEntityId(entity))
    },
    closeShoppingCart () {
      this.setShowSelected(false)
      this.setHideFilters(false)
    }
  }
})
</script>
