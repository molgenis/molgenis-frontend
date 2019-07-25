<template>
  <div class="container-fluid mb-4">
    <h2>{{activeEntity}}<small><small> (maybe some breadcrumbs?)</small></small></h2>
    <div class="row" :class="{'showfilters': !showFilters}">
      <div class="col-sm-3" >
        <filters-view />
      </div>
      <div class="col-sm-9" >
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
  .col-sm-3{
    transition: flex 0.3s, padding 0.3s;
    overflow: hidden;
  }
  .showfilters .col-sm-3{
    flex: 0 0 0%;
    padding: 0;
  }
  .showfilters .col-sm-9{
    flex: 0 0 100%;
    max-width: 100%;
  }
</style>
