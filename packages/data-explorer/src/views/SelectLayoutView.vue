<template>
  <div class="mt-3 entity-table" v-if="tableData && tableData.items.length > 0 && tableMeta">
    <div v-if="tableData.items.length === 0" class="alert alert-warning">
      {{ 'dataexplorer_empty_table' | i18n}}
    </div>
    <component
      :is="dataDisplayLayout"
      :entitiesToShow="tableData.items"
    />
  </div>
</template>

<script>
import CardView from './CardView'
import TableView from './TableView'
import ExplorerCard from '../components/dataView/ExplorerCard'
import TableRow from '../components/dataView/TableRow'
import TableHeader from '../components/dataView/TableHeader'
import { mapState } from 'vuex'

export default {
  name: 'SelectLayoutView',
  components: { ExplorerCard, TableRow, TableHeader, CardView, TableView },
  computed: {
    ...mapState(['dataDisplayLayout', 'tableMeta', 'tableData'])
  }
}
</script>
