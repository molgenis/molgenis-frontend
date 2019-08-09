<template>
  <div>
    <toolbar-view />
    <entity-view :isShop="true"/>
  </div>
</template>

<script>
import Vue from 'vue'
import ToolbarView from './ToolbarView'
import EntityView from './EntityView'

export default Vue.extend({
  name: 'DataView',
  created () {
    this.$store.dispatch('loadEntity')
    this.$store.dispatch('loadMetaData')
  },
  components: { ToolbarView, EntityView }
})
</script>
