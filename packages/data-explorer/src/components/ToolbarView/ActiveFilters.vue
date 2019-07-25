<template>
  <div>
    <button type="button" class="btn btn-light m-1"> Search: Hello wor <font-awesome-icon icon="times" class="ml-1" /></button>
    <button type="button" class="btn btn-light m-1"> Color: Red <font-awesome-icon icon="times" class="ml-1" /></button>
  </div>
</template>

<script>
import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faTimes)

export default Vue.extend({
  name: 'ActiveFilters',
  components: { FontAwesomeIcon }
})
</script>

<style scoped>
  button svg path{
    transition: fill 0.3s;
  }
  button:hover svg path{
    fill: var(--danger);
  }
</style>
