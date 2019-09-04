<template>
  <div class="custom-card">
    <slot name="shopping-button"></slot>
    <v-runtime-template :template="template"></v-runtime-template>
  </div>
</template>

<script>
import VRuntimeTemplate from 'v-runtime-template'

export default {
  name: 'CustomCardContent',
  components: { VRuntimeTemplate },
  props: {
    id: {
      type: String,
      required: true
    },
    record: {
      type: Object,
      required: true
    },
    customCode: {
      type: String,
      required: true
    }
  },
  computed: {
    template: function () {
      return '<div>' + this.customCode.trim() + '</div>'
    }
  }
}
</script>
