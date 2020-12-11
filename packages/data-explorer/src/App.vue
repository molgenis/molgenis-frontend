<template>
  <page-component id="app" @contextLoaded="setContext"  :class="{ 'app-like': dataDisplayLayout=='TableView' }">
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
  computed: { ...mapState(['dataDisplayLayout']) },
  methods: { ...mapMutations('account', ['setContext']) }
})
</script>

<style>
  .mg-page{
    padding: 0;
  }
  .mg-mainview{
    padding: 16px;
  }
  /* todo add doc */
  .app-like main.mg-page-content{
    flex: 1 1 auto;
    overflow: hidden;
    height: 100%;
  }
  .app-like .overflow-control{
    overflow: hidden;
  }
  .app-like .mg-data-view-container,
  .app-like .mg-filter{
    overflow: auto;
  }

  /*
  * fix for safari scroll bug
  * https://stackoverflow.com/questions/32971425/overflow-auto-not-working-in-safari-osx
  */
  @supports (-webkit-touch-callout: none) {
    .app-like .mg-data-view-container,
    .app-like .mg-filter{
      white-space:nowrap;
      overflow: scroll !important;
      -webkit-overflow-scrolling: touch;
    }
  }

  /*
  * temporary fix for strange molgenis theme behaviour
  */
  .breadcrumb{
    background-color: var(--gray-light);
    padding: .75rem 1rem;
    list-style: none;
  }
  .mg-page .mg-page-content{
    margin-top: 0;
  }
  .table-bordered, .table-bordered td, .table-bordered th{
    border: 1px solid var(--border) !important;
    padding: 0.5rem !important;
  }
</style>
