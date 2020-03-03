<template>
  <page-component id="app">
    <router-view />
  </page-component>
</template>

<script>
import Vue from 'vue'
import PageComponent from '../node_modules/@molgenis/molgenis-ui-context/src/components/PageComponent.vue'
import '../node_modules/@molgenis/molgenis-ui-context/public/sticky-footer.css'

export default Vue.extend({
  name: 'app',
  components: { PageComponent }
})
</script>

<style>
/* TODO: This needs to be fixed in the base style sheet */
.modal-backdrop{
  background-color: rgba(0,0,0,0.3);
}
</style>
