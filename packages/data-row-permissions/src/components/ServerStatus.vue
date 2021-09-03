<template>
  <div
    v-if="unauthorized">
    <span>You might see more results if you <a href="/login">log in</a>.</span>
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
