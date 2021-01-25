<template>
  <table class="table table-bordered h-100" v-if="entitiesToShow.length">
    <table-header
      :visibleColumns="visibleColumns"
      :isShop="tableSettings.isShop"
      :sortColumnName="sort.sortColumnName"
      :isSortOrderReversed="sort.isSortOrderReversed"
      @sort="handleSortEvent">
    </table-header>
    <tbody>

    <table-row v-for="(entity, index) in entitiesToShow"
               :key="index"
               :id="getEntityId(entity)"
               :tableName="tableName"
               :rowData="entity"
               :visibleColumns="visibleColumns"
               :isSelected="isSelected(entity)"
               :isShop="tableSettings.isShop"
               :isEditable="hasEditRights"
               :showSelected="showSelected"
               @toggleSelectedItemsHandler="toggleSelectedItems"
               ></table-row>
    </tbody>
  </table>
</template>

<style scoped>
  tbody th {
    position: -webkit-sticky; /* for Safari */
    position: sticky;
    left: 0;
  }
</style>

<script>
import TableRow from '../components/dataView/TableRow'
import TableHeader from '../components/dataView/TableHeader'
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
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
    ...mapState(['tableName', 'tableMeta', 'selectedItemIds', 'tableSettings', 'showSelected', 'sort']),
    ...mapGetters(['filterRsql', 'hasEditRights', 'compressedRouteFilter']),
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
    ...mapMutations(['toggleSelectedItems', 'setSortColumn', 'setIsSortOrderReversed']),
    ...mapActions(['fetchTableViewData']),
    getEntityId (entity) {
      return entity[this.idAttribute.name].toString()
    },
    isSelected (entity) {
      return this.selectedItemIds.includes(this.getEntityId(entity))
    },
    handleSortEvent (sortOrderColumn) {
      const isSortOrderReversed = sortOrderColumn === this.sort.sortColumnName ? !this.sort.isSortOrderReversed : false
      const sortQueryParam = isSortOrderReversed ? '-' + sortOrderColumn : sortOrderColumn

      this.$router.push({
        name: this.$router.currentRoute.name,
        path: this.$router.currentRoute.path,
        query: { ...this.$route.query, sort: sortQueryParam }
      })
    }
  }
}
</script>
