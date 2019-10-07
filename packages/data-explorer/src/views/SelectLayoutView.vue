<template>
  <div class="mt-3 entity-table" v-show="tableData && tableData.items && tableData.items.length > 0 && tableMeta">
    <div v-if="tableData && tableData.items && tableData.items.length === 0" class="alert alert-warning">
      {{ 'dataexplorer_empty_table' | i18n}}
    </div>
    <component
      :is="dataDisplayLayout"
      :entitiesToShow="(tableData && tableData.items) ? tableData.items : []"
    />
  </div>
</template>

<script>
import CardView from './CardView'
import TableView from './TableView'
import ExplorerCard from '../components/DataView/ExplorerCard'
import TableRow from '../components/DataView/TableRow'
import TableHeader from '../components/DataView/TableHeader'
import { mapState } from 'vuex'

export default {
  name: 'SelectLayoutView',
  components: { ExplorerCard, TableRow, TableHeader, CardView, TableView },
  computed: {
    ...mapState(['dataDisplayLayout', 'tableMeta', 'tableData'])
  }
}
</script>
