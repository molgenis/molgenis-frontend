<template>
  <div class="entity-table">
    <div v-if="!loading && (!tableMeta || !tableData || !tableData.items.length)" class="alert alert-warning">
      {{ 'dataexplorer_empty_table' | i18n}}
    </div>
    <component v-else-if="!loading"
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
    ...mapState(['dataDisplayLayout', 'loading', 'tableMeta', 'tableData'])
  }
}
</script>
