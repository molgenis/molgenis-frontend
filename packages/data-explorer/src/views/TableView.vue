<template>
  <table class="table">
    <table-header :header="tableHeaderToShow" :isShop="isShop"></table-header>
    <tbody>
    <table-row v-for="(entity, index) in entitiesToShow"
               :key="index"
               :id="getEntityId(entity)"
               :rowData="entity.data"
               :isSelected="isSelected(entity)"
               :isShop="isShop"></table-row>
    </tbody>
  </table>
</template>

<script>
import TableRow from '../components/dataView/TableRow'
import TableHeader from '../components/dataView/TableHeader'
import { mapState } from 'vuex'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons'
library.add(faShoppingBag)

export default {
  name: 'TableView',
  props: {
    entitiesToShow: {
      type: Array,
      required: true
    }
  },
  components: { TableRow, TableHeader },
  computed: {
    ...mapState(['tableMeta', 'shoppedEntityItems', 'isShop']),
    idAttribute () {
      return this.tableMeta.idAttribute
    },
    tableHeaderToShow () {
      return Object.keys(this.entitiesToShow[0].data)
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
