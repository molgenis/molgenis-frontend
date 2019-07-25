<template>
  <div>
    <toolbar-view />
    <EntityCards
      :entities="activeEntityData"
      v-if="getLayout === 'cards'" />
    <EntityTable
      :entities="activeEntityData"
      v-else />
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import ToolbarView from './ToolbarView'
import EntityCards from '../components/DataView/EntityCards'
import EntityTable from '../components/DataView/EntityTable'

export default Vue.extend({
  name: 'DataView',
  computed: {
    ...mapGetters(['activeEntityData']),
    getLayout () {
      return this.$store.state.dataDisplayLayout
    }
  },
  created () {
    this.$store.dispatch('loadEntity')
  },
  components: { ToolbarView, EntityCards, EntityTable }
})
</script>
