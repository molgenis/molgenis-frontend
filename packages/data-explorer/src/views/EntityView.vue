<template>
  <div>
    <entity-cards
      :entities="activeEntityData"
      :isShop="true"
      v-if="dataDisplayLayout === 'cards'"/>
    <entity-table
      :entities="activeEntityData"
      :isShop="true"
      v-else/>
  </div>
</template>

<script>
import EntityCards from '../components/DataView/EntityCards'
import EntityTable from '../components/DataView/EntityTable'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'EntityView',
  components: { EntityCards, EntityTable },
  computed: {
    ...mapGetters(['activeEntityData']),
    ...mapState(['dataDisplayLayout'])
  }
}
</script>
