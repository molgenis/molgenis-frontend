<template>
  <router-link
    :to="{name: route, params }"
    class="mb-4 px-4 btn btn-secondary align-self-center">
    {{ $t('data-row-permissions-back') }}
  </router-link>
</template>

<script>
export default {
  props: {
    route: {
      type: String,
      required: true
    },
    params: {
      type: Object,
      required: false,
      default: () => {}
    }
  }
}
</script>
