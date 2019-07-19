<template>
    <div class="container-fluid">
        <h2>Data-explorer</h2>
        <div class="row">
            <div class="col-3" >
                <filters-view />
            </div>
            <div class="col-9" >
                <pre>dataview</pre>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import FiltersView from './FiltersView'
export default Vue.extend({
  name: 'MainView',
  components: { FiltersView }
})
</script>
