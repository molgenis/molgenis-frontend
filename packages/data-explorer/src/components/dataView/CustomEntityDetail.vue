<template>
  <v-runtime-template :template="wrappedTemplate" />
</template>

<script>
import VRuntimeTemplate from 'v-runtime-template'
import ShoppingCartButton from '../customViewComponents/ShoppingCartButton'
import { mapState } from 'vuex'
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
    ...mapState('explorer', {
      isShop: state => state.tableSettings.isShop
    }),
    wrappedTemplate: function () {
      return '<div class="custom-entity-detail-container">' + this.template.trim() + '</div>'
    }
  },
  methods: {
    // Helper function for template
    isObject(value) {
      return typeof value === 'object'
    },
    isArray(value) {
      return Array.isArray(value)
    }
  }
}
</script>
