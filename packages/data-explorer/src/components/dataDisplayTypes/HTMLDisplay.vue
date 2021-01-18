<template>
  <div>
    <div ref="htmlPreview" class="text-nowrap text-truncate" :class="{'mouse-help':value.length > 10}">{{value}}</div>
    <b-popover :target="getRef" triggers="hover" placement="top">
      <template #title>HTML Preview</template>
      <div v-html="value"></div>
    </b-popover>
  </div>
</template>

<script>
export default {
  name: 'HTMLDisplay',
  props: {
    value: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    rowIndex: {
      type: Number,
      required: true
    },
    data: {
      type: Object,
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
