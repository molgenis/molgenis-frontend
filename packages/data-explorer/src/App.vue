<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'app'
})
</script>

<style>
  .modal-backdrop {
    opacity: 0.3;
  }
</style>
