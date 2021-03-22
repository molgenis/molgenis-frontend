<template>
  <v-runtime-template :template="wrappedTemplate" />
</template>

<script>
import VRuntimeTemplate from 'v-runtime-template'
export default {
  name: 'CustomEntityDetail',
  components: { VRuntimeTemplate },
  props: {
    record: {
      type: Object,
      required: true
    },
    metaData: {
      type: Object,
      required: true
    },
    template: {
      type: String,
      required: true
    }
  },
  computed: {
    wrappedTemplate: function () {
      return '<div class="custom-entity-detail-container">' + this.template.trim() + '</div>'
    }
  }
}
</script>
