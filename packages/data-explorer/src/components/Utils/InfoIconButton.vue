<template>
  <div>
    <button type="button" class="btn btn-light m-1">
      <slot />
      <span class="name">{{name}}</span>
    </button>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'InfoIconButton',
  props: {
    name: {
      type: String,
      required: true
    }
  }
})
</script>

<style scoped>
  button {
    vertical-align: middle;
    overflow: hidden;
  }
  button .name {
    margin: 0;
    opacity: 0;
    max-width: 0;
    display: inline-block;
    white-space: nowrap;
    transition: opacity 0.3s, max-width 0.3s, margin 0.3s;
  }
  button:hover .name {
    margin-left: 0.5rem;
    margin-right: 0.25rem;
    max-width: 8rem;
    opacity: 1;
  }
</style>
