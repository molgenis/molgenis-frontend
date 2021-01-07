<template>
  <div>
    <div ref="datePreview" class="text-nowrap text-truncate">{{value}}</div>
    <b-popover :target="getRef" triggers="hover" placement="top">
      <template #title>Local Date{{ isDateTime ? '/Time' : '' }}</template>
      <span>{{new Date(value).toLocaleDateString()}} {{ isDateTime ? new Date(value).toLocaleTimeString() : '' }}</span>
    </b-popover>
  </div>
</template>

<script>
export default {
  name: 'StringDisplay',
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
