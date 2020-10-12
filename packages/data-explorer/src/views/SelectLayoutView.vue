<template>
  <div class="entity-table" v-if="tableMeta && tableData">
    <div v-if="tableData && tableData.items && tableData.items.length === 0" class="alert alert-warning">
      {{ 'empty table' }}
    </div>
    <component
      :is="dataDisplayLayout"
      :entitiesToShow="(tableData && tableData.items) ? tableData.items : []"
    />

    <end-of-results v-if="tableData && tableData.items && tableData.items.length >= dataDisplayLimit" :dataDisplayLimit="dataDisplayLimit" class="mt-4"></end-of-results>
  </div>
</template>

<script>
import CardView from './CardView'
import TableView from './TableView'
import ExplorerCard from '../components/dataView/ExplorerCard'
import TableRow from '../components/dataView/TableRow'
import TableHeader from '../components/dataView/TableHeader'
import EndOfResults from '../components/dataView/EndOfResults'
import { mapState } from 'vuex'

export default {
  name: 'SelectLayoutView',
  components: { ExplorerCard, TableRow, TableHeader, CardView, TableView, EndOfResults },
  computed: {
    ...mapState(['dataDisplayLayout', 'dataDisplayLimit', 'tableMeta', 'tableData'])
  }
}
</script>
