<template>
  <div>
    <div ref="refPreview" class="text-nowrap text-truncate">
      <router-link :to="`/${getRouterLink()}`">
        {{value}}
      </router-link>
    </div>
    <b-popover :target="getRef" triggers="hover" placement="bottom">
      <template #title>{{type}}</template>
      <RefTable :value="value" :type="type" :tableId="getRouterLink()"></RefTable>
    </b-popover>
  </div>
</template>

<script>
import RefTable from './RefTable'

export default {
  name: 'RefDisplay',
  components: { RefTable },
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
      return this.$refs.refPreview
    },
    getRouterLink () {
      return this.data.refEntityType.split('/').pop()
    }
  }
}
</script>
