<template>
  <div class="mt-2 entity-table" v-if="tableData && tableData.items.length > 0 && tableMeta">
    {{entitiesToShow}}
    <div v-if="entitiesToShow.length === 0" class="alert alert-warning">
      {{ 'dataexplorer_empty_shopping_cart' | i18n}}
    </div>
    <div v-else>
      <button class="btn btn-success" v-if="entitiesToShow.length > 10">
        <font-awesome-icon icon="shopping-bag"></font-awesome-icon> Order
      </button>
      <table class="table">
        <table-header :header="tableHeaderToShow" :isShop="true"></table-header>
        <tbody>
        <table-row v-for="(entity, index) in entitiesToShow"
                   :key="index"
                   :id="getEntityId(entity)"
                   :rowData="entity.data"
                   :isSelected="isSelected(entity)"
                   :isShop="true"></table-row>
        </tbody>
      </table>
      <button class="btn btn-success mb-2">
        <font-awesome-icon icon="shopping-bag"></font-awesome-icon> Order
      </button>
    </div>
  </div>
</template>

<script>
import TableRow from '../components/DataView/TableRow'
import TableHeader from '../components/DataView/TableHeader'
import { mapState } from 'vuex'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faShoppingBag)

export default {
  name: 'CartView',
  components: { TableRow, TableHeader, FontAwesomeIcon },
  computed: {
    ...mapState(['tableMeta', 'shoppedEntityItems', 'tableData']),
    idAttribute () {
      return this.tableMeta.idAttribute
    },
    tableHeaderToShow () {
      return Object.keys(this.entitiesToShow[0].data)
    },
    entitiesToShow () {
      return this.tableData.items.filter((entity) => this.shoppedEntityItems.includes(this.getEntityId(entity)))
    }
  },
  methods: {
    getEntityId (entity) {
      return entity.data[this.idAttribute].toString()
    },
    isSelected (entity) {
      return this.shoppedEntityItems.includes(this.getEntityId(entity))
    }
  }
}
</script>
