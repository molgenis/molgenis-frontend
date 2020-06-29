<template>
  <table class="table" v-if="entitiesToShow.length">
    <table-header :visibleColumns="visibleColumns" :isShop="isShop"></table-header>
    <tbody>
    <table-row v-for="(entity, index) in entitiesToShow"
               :key="index"
               :id="getEntityId(entity)"
               :tableName="tableName"
               :rowData="entity"
               :visibleColumns="visibleColumns"
               :isSelected="isSelected(entity)"
               :isShop="isShop"
               :isEditable="hasEditRights"></table-row>
    </tbody>
  </table>
</template>

<script>
import TableRow from '../components/dataView/TableRow'
import TableHeader from '../components/dataView/TableHeader'
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
    ...mapGetters(['filterRsql', 'hasEditRights']),
    idAttribute () {
      return this.tableMeta.idAttribute
    },
    visibleColumns () {
      return this.tableMeta.attributes
        .filter(a => a.visible)
        .map(a => ({ id: a.id, name: a.name }))
    }
  },
  methods: {
    ...mapActions(['fetchTableViewData']),
    getEntityId (entity) {
      return entity[this.idAttribute.name].toString()
    },
    isSelected (entity) {
      return this.shoppedEntityItems.includes(this.getEntityId(entity))
    }
  },
  /**
  * Todo temp watch, remove watch when sync is done via url
  */
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
