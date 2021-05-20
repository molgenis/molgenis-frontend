<template>
  <div class="entity-table">
    <div v-if="hasNoResults" class="alert alert-warning mt-4">
      {{ $t('dataexplorer_empty_table') }}
    </div>
    <component
      :is="dataDisplayLayout"
      v-else-if="tableData"
      :entities-to-show="tableData.items"
    />
  </div>
</template>

<script>
import CardView from './CardView'
import TableView from './TableView'
import ExplorerCard from '../components/dataView/ExplorerCard'
import { mapGetters, mapState } from 'vuex'
import { TableRow, TableHeader } from '@molgenis-ui/components-library'

export default {
  name: 'SelectLayoutView',
  components: { ExplorerCard, TableRow, TableHeader, CardView, TableView },
  computed: {
    ...mapState('explorer', ['dataDisplayLayout', 'tableData']),
    ...mapGetters('explorer', ['hasNoResults'])
  }
}
</script>
