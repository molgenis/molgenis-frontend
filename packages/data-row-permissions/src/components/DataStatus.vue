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
          {{ $t('data-row-permissions-spinner-text') }}
        </div>
      </div>
      <span
        v-else-if="isAuthenticated"
        class="mt-2">{{ $t('data-row-permissions-no-results') }}</span>
      <span
        v-else
        class="mt-2">{{ $t('data-row-permissions-no-results-cta') }}&nbsp;<a href="/login">{{ $t('data-row-permissions-cta-login') }}</a>.</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
    ...mapGetters(['isAuthenticated']),
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
