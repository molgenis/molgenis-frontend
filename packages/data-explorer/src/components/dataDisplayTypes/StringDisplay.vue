<template>
  <span>{{value}}</span>
</template>

<script>
export default {
  name: 'LinkDisplay',
  props: {
    value: {
      required: false
    },
    type: {
      type: String,
      required: true
    }
  }
}
</script>
