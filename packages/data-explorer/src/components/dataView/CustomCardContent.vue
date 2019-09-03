<template>
  <div class="custom-card position-relative">
    <v-runtime-template :template="template"></v-runtime-template>
    <pre style="border:1px solid red">
    {{customCode}}
      ---
      {{record}}
    </pre>
  </div>
</template>

<script>
import VRuntimeTemplate from 'v-runtime-template'

export default {
  name: 'CustomCardContent',
  components: { VRuntimeTemplate },
  props: {
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
