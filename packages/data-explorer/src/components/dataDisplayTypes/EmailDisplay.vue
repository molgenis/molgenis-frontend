<template>
  <a :href="`mailto:${value}`" target="_blank" class="text-nowrap text-truncate d-block">{{value}}</a>
</template>

<script>
export default {
  name: 'EmailDisplay',
  props: {
    value: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  }
}
</script>
