<template>
  <div class="container-fluid">
    <h2>Data-explorer</h2>
    <div class="row">
      <div class="col-3" >
        <pre>filters</pre>
      </div>
      <div class="col-9" >
        <pre>dataview</pre>
        {{$route.params.entity}}
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  name: 'MainView',
  components: { }
})
</script>
