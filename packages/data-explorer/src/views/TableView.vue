<template>
  <table v-if="entitiesToShow.length" class="table table-bordered h-100">
    <table-header
      :visible-columns="visibleColumns"
      :is-shop="tableSettings.isShop"
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
        :is-shop="tableSettings.isShop"
        :is-editable="hasEditRights"
        :show-selected="showSelected"
        @toggleSelectedItemsHandler="toggleSelectedItems"
      />
    </tbody>
  </table>
</template>

<script>
import TableRow from '../components/dataView/TableRow'
import TableHeader from '../components/dataView/TableHeader'
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'TableView',
  components: { 'table-row': TableRow, TableHeader },
  props: {
    entitiesToShow: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapState('explorer', ['tableName', 'tableMeta', 'selectedItemIds', 'tableSettings', 'showSelected', 'sort', 'hiddenColumns']),
    ...mapGetters('explorer', ['filterRsql', 'hasEditRights', 'compressedRouteFilter']),
    idAttribute () {
      return this.tableMeta.idAttribute
    },
    visibleColumns () {
      return this.tableMeta.attributes
        .filter(a => a.visible)
        .filter(a => !this.hiddenColumns.includes(a.name))
        .map(a => ({
          id: a.id,
          name: a.name,
          label: a.label,
          type: a.type,
          refEntityType: a.refEntityType,
          expression: a.expression
        }))
    }
  },
  methods: {
    ...mapMutations('explorer', ['toggleSelectedItems', 'setSortColumn', 'setIsSortOrderReversed']),
    ...mapActions('explorer', ['fetchTableViewData']),
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
        name: 'de-view',
        query: { ...this.$route.query, sort: sortQueryParam }
      })
    }
  }
}
</script>

<style scoped>
  tbody th {
    left: 0;
    position: sticky; /* for Safari */
    position: sticky;
  }
</style>
