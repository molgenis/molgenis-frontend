<template>
  <v-runtime-template :template="wrappedTemplate" />
</template>

<script>
import VRuntimeTemplate from 'v-runtime-template'
import ShoppingCartButton from '../customViewComponents/ShoppingCartButton'
export default {
  name: 'CustomEntityDetail',
  // We add components which might be used in the custom template therefor:
  // eslint-disable-next-line vue/no-unused-components
  components: { VRuntimeTemplate, ShoppingCartButton },
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
