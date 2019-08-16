<template>
  <div>
    <h2 v-if="entityMeta && entityMeta.label" class="mb-0">{{entityMeta.label}}</h2>
    <small v-if="entityMeta && entityMeta.description" class="text-secondary"><em>{{entityMeta.description}}</em></small>

    <!--TODO: hasCart and isShop should be set to true when entityType is tagged as "SHOPABLE"-->
    <toolbar-view :hasCart="true"/>
    <entity-view :isShop="true"/>
  </div>
</template>

<script>
import Vue from 'vue'
import ToolbarView from './ToolbarView'
import EntityView from './EntityView'
import { mapState } from 'vuex'

export default Vue.extend({
  name: 'DataView',
  computed: {
    ...mapState(['activeEntity', 'entityMeta'])
  },
  created () {
    this.$store.dispatch('loadEntity')
    this.$store.dispatch('loadMetaData')
  },
  components: { ToolbarView, EntityView }
})
</script>
