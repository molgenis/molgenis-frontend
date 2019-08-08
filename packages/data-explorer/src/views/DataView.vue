<template>
  <div>
    <toolbar-view />
    <entity-cards
      :entities="activeEntityData"
      :isShop="true"
      v-if="dataDisplayLayout === 'cards'" />
    <entity-table
      :entities="activeEntityData"
      :isShop="false"
      v-else />
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapState } from 'vuex'
import ToolbarView from './ToolbarView'
import EntityCards from '../components/DataView/EntityCards'
import EntityTable from '../components/DataView/EntityTable'

export default Vue.extend({
  name: 'DataView',
  computed: {
    ...mapGetters(['activeEntityData']),
    ...mapState(['dataDisplayLayout'])
  },
  created () {
    this.$store.dispatch('loadEntity')
    this.$store.dispatch('loadMetaData')
  },
  components: { ToolbarView, EntityCards, EntityTable }
})
</script>
