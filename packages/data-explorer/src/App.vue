<template>
  <page-component id="app" @contextLoaded="setContext" :class="{ 'app-like': dataDisplayLayout === 'TableView' && $router.currentRoute.name === 'de-view' }">
    <router-view />
  </page-component>
</template>

<script>
import PageComponent from '../node_modules/@molgenis/molgenis-ui-context/src/components/PageComponent.vue'
import '../node_modules/@molgenis/molgenis-ui-context/public/sticky-footer.css'
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'app',
  components: { PageComponent },
  computed: { ...mapState('explorer', ['dataDisplayLayout']) },
  methods: { ...mapMutations('account', ['setContext']) }
}
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
    background-color: var(--border);
    padding: .75rem 1.5rem;
    list-style: none;
    margin-left: -2rem;
    margin-right: -2rem;
    margin-top: -1rem;
  }
  .mg-page .mg-page-content{
    margin-top: 0;
  }
  main.mg-page-content .table-bordered td, main.mg-page-content .table-bordered th,
  div.modal-dialog .table-bordered td, div.modal-dialog .table-bordered th{
    border: 1px solid var(--border);
    padding: 0.5rem;
  }
</style>
