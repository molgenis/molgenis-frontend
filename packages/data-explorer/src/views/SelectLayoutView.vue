<template>
  <div class="entity-table">
    <div v-if="hasNoResults" class="alert alert-warning">
      {{ $t('dataexplorer_empty_table') }}
    </div>
    <component
      :is="dataDisplayLayout"
      v-else
      :entities-to-show="tableData.items"
    />
  </div>
</template>

<script>
import CardView from './CardView'
import TableView from './TableView'
import ExplorerCard from '../components/dataView/ExplorerCard'
import TableRow from '../components/dataView/TableRow'
import TableHeader from '../components/dataView/TableHeader'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'SelectLayoutView',
  components: { ExplorerCard, TableRow, TableHeader, CardView, TableView },
  computed: {
    ...mapState('explorer', ['dataDisplayLayout', 'tableData']),
    ...mapGetters('explorer', ['hasNoResults'])
  }
}
</script>
