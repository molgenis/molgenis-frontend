<template>
  <div v-if="results.length === 0">
    <div class="align-center-container">
      <div
        v-if="!resultsLoaded"
        class="align-center text-center ">
        <b-spinner
          label="Spinning"
          variant="primary" />
        <div class="mt-5">
          Asking the server nicely for data.
        </div>
      </div>
      <span
        v-else
        class="mt-2">These are not the results you are looking for.</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    loaded: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    results () {
      return this.items
    },
    resultsLoaded () {
      return this.loaded
    }
  }
}
</script>

<style scoped>
.align-center-container {
    height:50vh;
}
.align-center {

  position: relative;
  top:25%;
}
</style>
