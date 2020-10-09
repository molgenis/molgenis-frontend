<template>
  <table v-if="entitiesToShow.length" class="table">
    <table-header :visible-columns="visibleColumns" :is-shop="isShop"></table-header>
    <tbody>
      <table-row
        v-for="(entity, index) in entitiesToShow"
        :id="getEntityId(entity)"
        :key="index"
        :table-name="tableName"
        :row-data="entity"
        :visible-columns="visibleColumns"
        :is-selected="isSelected(entity)"
        :is-shop="isShop"
        :is-editable="hasEditRights"
      ></table-row>
    </tbody>
  </table>
</template>

<script>
import Vue from 'vue'
import TableRow from '../components/dataView/TableRow'
import TableHeader from '../components/dataView/TableHeader'
import { mapState, mapActions, mapGetters } from 'vuex'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons'
library.add(faShoppingBag)

export default Vue.extends({
  name: 'TableView',
  components: { TableRow, TableHeader },
  props: {
    entitiesToShow: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapState(['tableName', 'tableMeta', 'selectedItemIds', 'isShop']),
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
      return this.selectedItemIds.includes(this.getEntityId(entity))
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
})
</script>
