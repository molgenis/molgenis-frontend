<template>
  <div class="mt-2 entity-table" v-if="tableData && tableData.items.length > 0 && tableMeta">
    <div v-if="entitiesToShow.length === 0" class="alert alert-warning">
      {{ 'dataexplorer_empty_shopping_cart' | i18n}}
    </div>
    <div v-else>
      <button class="btn btn-primary mr-2" @click="closeShoppingCart" v-if="entitiesToShow.length > 5">
        <font-awesome-icon icon="chevron-left"></font-awesome-icon> Back
      </button>
      <button class="btn btn-success mr-2" v-if="entitiesToShow.length > 5">
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
    </div>
    <button class="btn btn-primary mr-2" @click="closeShoppingCart">
      <font-awesome-icon icon="chevron-left"></font-awesome-icon> Back
    </button>
    <button v-if="entitiesToShow.length > 0" class="btn btn-success mr-2">
      <font-awesome-icon icon="shopping-bag"></font-awesome-icon> Order
    </button>
  </div>
</template>

<script>
import TableRow from '../components/dataView/TableRow'
import TableHeader from '../components/dataView/TableHeader'
import { mapState } from 'vuex'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faShoppingBag, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faShoppingBag, faChevronLeft)

export default {
  name: 'ClipboardView',
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
      return entity[this.idAttribute].toString()
    },
    isSelected (entity) {
      return this.shoppedEntityItems.includes(this.getEntityId(entity))
    },
    closeShoppingCart () {
      this.$store.commit('setShowShoppingCart', false)
      this.$store.commit('setHideFilters', true)
    }
  }
}
</script>
