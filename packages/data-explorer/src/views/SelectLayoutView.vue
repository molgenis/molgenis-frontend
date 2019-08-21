<template>
  <div class="mt-3 entity-table" v-if="activeEntityData && activeEntityData.items.length > 0 && entityMeta">
    <div v-if="entitiesToShow.length === 0" class="alert alert-warning">
      {{ 'dataexplorer_empty_table' | i18n}}
    </div>

    <component
      :is="dataDisplayLayout"
      :entitiesToShow="entitiesToShow"
    />
  </div>
</template>

<script>
import CardView from './CardView'
import TableView from './TableView'
import ExplorerCard from '../components/DataView/ExplorerCard'
import TableRow from '../components/DataView/TableRow'
import TableHeader from '../components/DataView/TableHeader'
import { mapGetters, mapState } from 'vuex'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons'
library.add(faShoppingBag)

export default {
  name: 'EntityView',
  components: { ExplorerCard, TableRow, TableHeader, CardView, TableView },
  computed: {
    ...mapGetters(['activeEntityData']),
    ...mapState(['dataDisplayLayout', 'showShoppingCart', 'entityMeta', 'shoppedEntityItems']),
    entitiesToShow () {
      if (this.showShoppingCart) {
        return this.activeEntityData.items.filter((entity) => this.shoppedEntityItems.includes(this.getEntityId(entity)))
      } else {
        return this.activeEntityData.items
      }
    }
  }
}
</script>
