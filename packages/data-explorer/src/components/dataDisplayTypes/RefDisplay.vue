<template>
  <div v-if="metadata.expression">
    <div class="text-nowrap text-truncate">
      <span>{{ displayValue }}</span>
    </div>
  </div>
  <div v-else>
    <div v-if="hasLinkValue" class="text-nowrap text-truncate mouse-ref" @click="handleRefClicked">
      <span class="mr-1">{{ displayValue }}</span>
      <font-awesome-icon icon="share" size="xs" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'RefDisplay',
  props: {
    value: {
      // {id {string}, label: {string}}
      type: [Object, Array],
      required: true
    },
    metadata: {
      type: Object,
      required: true
    }
  },
  computed: {
    displayValue () {
      return Array.isArray(this.value) ? this.value.map(v => v.label).join(', ') : this.value.label
    },
    hasLinkValue () {
      return Array.isArray(this.value) ? !!this.value.length : !!this.value
    }
  },
  methods: {
    handleRefClicked () {
      this.$eventBus.$emit('show-reference-table', {
        refEntityType: this.metadata.refEntityType,
        value: this.value
      })
    }
  }
}
</script>
