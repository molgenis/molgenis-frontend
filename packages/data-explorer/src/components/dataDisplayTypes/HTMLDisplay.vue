<template>
  <div>
    <div ref="htmlPreview" class="text-nowrap text-truncate" :class="{'mouse-help':value.length > 10}">
      {{ value }}
    </div>
    <b-popover :target="getRef" triggers="hover" placement="top">
      <template #title>
        {{ $t('dataexplorer_html_display_title') }}
      </template>
      <div v-html="value" />
    </b-popover>
  </div>
</template>

<script>
/* istanbul ignore file */
export default {
  name: 'HTMLDisplay',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    getRef () {
      return this.$refs.htmlPreview
    }
  }
}
</script>
