<template>
  <div>
    <div ref="datePreview" class="text-nowrap text-truncate mouse-help">{{value}}</div>
    <b-popover :target="getRef" triggers="hover" placement="top">
      <template #title>{{ 'dataexplorer_date_display_title' | i18n }}<span v-if="isDateTime">/{{ dataexplorer_date_display_title_time_part }}</span></template>
      <span>{{new Date(value).toLocaleDateString()}} {{ isDateTime ? new Date(value).toLocaleTimeString() : '' }}</span>
    </b-popover>
  </div>
</template>

<script>
/* istanbul ignore file */
export default {
  name: 'DataDisplay',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    getRef () {
      return this.$refs.datePreview
    }
  },
  computed: {
    isDateTime () {
      return typeof this.value === 'string' && this.value.includes(':')
    }
  }
}
</script>
