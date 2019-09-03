<template>
  <div class="custom-card position-relative">
    <div v-html="customCode"></div>
    <pre>
    |{{customCode}}|
    </pre>
  </div>
</template>

<script>
export default {
  name: 'CustomCardContent',
  props: {
    customCode: {
      type: String,
      required: true
    }
  }
}
</script>
