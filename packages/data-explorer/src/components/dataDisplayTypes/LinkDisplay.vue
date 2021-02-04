<template>
  <a :href="value" target="_blank" class="text-nowrap text-truncate d-block">{{value}}</a>
</template>

<script>
/* istanbul ignore file */
export default {
  name: 'LinkDisplay',
  props: {
    value: {
      type: String,
      required: true
    }
  }
}
</script>
