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
    },
    isSelectable: {
      type: Boolean,
      required: true
    },
    isSelected: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    wrappedTemplate: function () {
      return '<div class="custom-entity-detail-container">' + this.template.trim() + '</div>'
    }
  },
  methods: {
    /**
     * These methods can be used from the template context
     */
    toggleSelection(payload) {
      this.$emit('toggleSelection', payload)
    }
  }
}
</script>
