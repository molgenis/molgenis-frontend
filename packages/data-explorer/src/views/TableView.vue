<template>
  <table class="table" v-if="entitiesToShow.length">
    <table-header :header="tableHeaderToShow" :isShop="isShop"></table-header>
    <tbody>
    <table-row v-for="(entity, index) in entitiesToShow"
               :key="index"
               :id="getEntityId(entity)"
               :rowData="entity"
               :isSelected="isSelected(entity)"
               :isShop="isShop"></table-row>
    </tbody>
  </table>
</template>

<script>
import TableRow from '../components/DataView/TableRow'
import TableHeader from '../components/DataView/TableHeader'
import { mapState, mapActions, mapGetters } from 'vuex'
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
    ...mapState(['tableName', 'tableMeta', 'shoppedEntityItems', 'isShop']),
    ...mapGetters(['filterRsql']),
    idAttribute () {
      return this.tableMeta.idAttribute
    },
    tableHeaderToShow () {
      return Object.keys(this.entitiesToShow[0])
    }
  },
  methods: {
    ...mapActions(['fetchTableViewData']),
    getEntityId (entity) {
      return entity[this.idAttribute].toString()
    },
    isSelected (entity) {
      return this.shoppedEntityItems.includes(this.getEntityId(entity))
    }
  },
  watch: {
    filterRsql: {
      handler: function () {
        this.fetchTableViewData({ tableName: this.tableName })
      },
      immediate: true
    }
  }
}
</script>
