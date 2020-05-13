<template>
  <div class="alert alert-warning" role="alert">
    <strong>Note:</strong> Displaying the maximum of {{dataDisplayLimit}} results, please use filtering to find your data.
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'EndOfResults',
  props: {
    dataDisplayLimit: {
      type: Number,
      required: true
    }
  }
})
</script>
