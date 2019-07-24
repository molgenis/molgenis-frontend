<template>
  <!-- Note: This is a placeholder object -->
  <div>
    <toolbar-view />

    <div class="card-columns mt-1">
      <div class="card" v-for="(item, index) in list" :key="index">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">{{item}}</p>
          <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
        </div>
      </div>
    </div>
    <!-- {{$route.params.entity}} -->
  </div>
</template>

<script>
import Vue from 'vue'
import ToolbarView from './ToolbarView'

export default Vue.extend({
  name: 'DataView',
  data () {
    return {
      list: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        'Lorem ipsum dolor sit amet.',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        'Sed do eiusmod tempor incididunt ut labore et dolore.',
        'Onsectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        'Lorem ipsum dolor sit amet.',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        'Sed do eiusmod tempor incididunt ut labore et dolore.',
        'Onsectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna'
      ]
    }
  },
  components: { ToolbarView }
})
</script>
