<template>
  <a href="value" target="_blank">{{value}}</a>
</template>

<script>
export default {
  name: 'LinkDisplay',
  props: {
    value: {
      type: [ String, Number ],
      required: true
    },
    type: {
      type: String,
      required: true
    }
  }
}
</script>
