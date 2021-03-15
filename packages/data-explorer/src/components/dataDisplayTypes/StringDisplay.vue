<template>
  <div>
    <div ref="stringPreview" :id="`string-preview-${rowIndex}-${metadata.id}`" class="text-nowrap text-truncate" :class="{'mouse-help':value.length > 60}">{{value}}</div>
    <b-popover v-if="value.length > 60" :target="getRef" triggers="hover" placement="top" boundary="viewport">
      <template #title>{{ $t('dataexplorer_string_display_title') }}</template>
      <div v-if="value.length > 255" class="overflow-auto" style="max-height:10rem">{{value}}</div>
      <div v-else>{{value}}</div>
    </b-popover>
  </div>
</template>

<script>
/* istanbul ignore file */
export default {
  name: 'StringDisplay',
  props: {
    value: {
      type: [String, Number, Boolean],
      required: true
    },
    rowIndex: {
      type: Number,
      required: true
    },
    metadata: {
      type: Object,
      required: true
    }
  },
  methods: {
    getRef () {
      return this.$refs.stringPreview
    }
  },
  computend: {
    valueAsString () {
      return this.value !== undefined || this.value !== null ? this.value.toString() : ''
    }
  }
}
</script>
