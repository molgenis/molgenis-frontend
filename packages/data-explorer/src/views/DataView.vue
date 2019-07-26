<template>
  <div>
    <toolbar-view />
    <EntityCards
      :entities="activeEntityData"
      v-if="dataDisplayLayout === 'cards'" />
    <EntityTable
      :entities="activeEntityData"
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
  },
  components: { ToolbarView, EntityCards, EntityTable }
})
</script>
