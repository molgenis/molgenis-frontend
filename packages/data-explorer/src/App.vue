<template>
  <div id="app">
    <main-view />
  </div>
</template>

<script>
import Vue from 'vue'
import MainView from './views/MainView'
export default Vue.extend({
  name: 'app',
  components: { MainView }
})
</script>

<style>
  .modal-backdrop {
    opacity: 0.3;
  }
</style>
