<template>
    <div class="container-fluid mb-4">
      <h2>Entity name <small><small>(maybe some breadcrumbs?)</small></small></h2>
        <div class="row">
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
export default Vue.extend({
  name: 'MainView',
  components: { FiltersView, DataView }
})
</script>
