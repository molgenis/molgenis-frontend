<template>
  <div class="card-columns mt-1">
<!--    <div class="card" v-for="(item, index) in list" :key="index"> -->
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">}</p>
        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'EntityCards'
})
</script>

<style scoped>
</style>
