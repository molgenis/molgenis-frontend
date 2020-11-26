<template>
  <page-component id="app" @contextLoaded="setContext" :class="{ 'app-like': dataDisplayLayout=='TableView' }">
    <router-view />
  </page-component>
</template>

<script>
import Vue from 'vue'
import PageComponent from '../node_modules/@molgenis/molgenis-ui-context/src/components/PageComponent.vue'
import '../node_modules/@molgenis/molgenis-ui-context/public/sticky-footer.css'
import { mapMutations, mapState } from 'vuex'

export default Vue.extend({
  name: 'app',
  components: { PageComponent },
  methods: { ...mapMutations('account', ['setContext']) },
  computed: { ...mapState(['dataDisplayLayout']) }
})
</script>

<style>
  .app-like main.mg-page-content{
    flex: 0 1 auto;
    overflow: hidden;
  }

  .app-like main .d-flex.flex-column.h-100,
  .app-like main .flex-mainview{
    overflow: hidden;
    overflow: hidden;
  }

  .app-like main .flex-data,
  .app-like main .flex-filter{
    overflow: auto;
  }
</style>
