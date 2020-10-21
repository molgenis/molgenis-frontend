<template>
  <div class="alert alert-warning" role="alert">
    <strong>Note:</strong> Displaying the maximum of {{dataDisplayLimit}} results, please use filtering to find your data.
  </div>
</template>

<script>
export default {
  name: 'EndOfResults',
  props: {
    dataDisplayLimit: {
      type: Number,
      required: true
    }
  }
}
</script>
