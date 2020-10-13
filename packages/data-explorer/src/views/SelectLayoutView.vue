<template>
  <div v-if="tableMeta && tableData" class="entity-table">
    <div v-if="tableData && tableData.items && tableData.items.length === 0" class="alert alert-warning">
      {{ 'empty table' }}
    </div>
    <component
      :is="dataDisplayLayout"
      :entities-to-show="(tableData && tableData.items) ? tableData.items : []"
    />

    <end-of-results v-if="tableData && tableData.items && tableData.items.length >= dataDisplayLimit" :data-display-limit="dataDisplayLimit" class="mt-4"></end-of-results>
  </div>
</template>

<script>
import Vue from 'vue'
import CardView from './CardView'
import TableView from './TableView'
import ExplorerCard from '../components/dataView/ExplorerCard'
import TableRow from '../components/dataView/TableRow'
import TableHeader from '../components/dataView/TableHeader'
import EndOfResults from '../components/dataView/EndOfResults'
import { mapState } from 'vuex'

export default Vue.extend({
  name: 'SelectLayoutView',
  components: { ExplorerCard, TableRow, TableHeader, CardView, TableView, EndOfResults },
  computed: {
    ...mapState(['dataDisplayLayout', 'dataDisplayLimit', 'tableMeta', 'tableData'])
  }
})
</script>
