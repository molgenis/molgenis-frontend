<template>
  <div class="container-fluid mb-4">
    <h2>{{activeEntity}}<small><small> (maybe some breadcrumbs?)</small></small></h2>
    <div class="flex-mainview" :class="{'showfilters': !showFilters}">
      <div class="flex-filter" >
        <filters-view />
      </div>
      <div class="flex-data" >
        <data-view />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import FiltersView from './FiltersView'
import DataView from './DataView'
import { mapState } from 'vuex'

export default Vue.extend({
  name: 'MainView',
  computed: {
    ...mapState(['showFilters', 'activeEntity'])
  },
  created () {
    this.$store.commit('setActiveEntity', this.$route.params.entity)
  },
  components: { FiltersView, DataView }
})
</script>

<style scoped>
  .flex-mainview{
    display: flex;
    white-space: normal;
  }
  .flex-filter{
    transition: max-width 0.3s, min-width 0.3s;
    min-width: 15rem;
    max-width: 20rem;
    padding-right: 1rem;
    flex: 1 0 0rem;
    overflow: hidden;

  }
  .showfilters .flex-filter{
    flex: 0 0 0;
    max-width: 0;
    min-width: 0;
    padding-right: 0;
  }
  .flex-data{
    flex: 1 0 0
  }

  @media only screen and (max-width: 576px) { /* Bootstrap brakepoint sm */
    .flex-mainview{
      display: block;
    }
    .flex-mainview .flex-filter{
      min-width: 0;
      max-width: none;
      padding: 0;
    }
  }
</style>
