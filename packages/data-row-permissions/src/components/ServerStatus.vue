<template>
  <div
    v-if="unauthorized">
    <span>{{ $t('data-row-permissions-no-results-cta') }}&nbsp;<a href="/login">{{ $t('data-row-permissions-cta-login') }}</a>.</span>
  </div>
</template>

<script>
export default {
  props: {
    code: {
      type: Number,
      required: false,
      default: () => 0
    }
  },
  computed: {
    unauthorized () {
      return this.code === 401
    }
  }
}
</script>
