<template>
  <div>
    <div @click="$refs['refPreview'].show()" class="text-nowrap text-truncate">{{value}}</div>
    <b-modal ref="refPreview" hide-footer :title="type">
      <RefTable :value="value" :type="type" :tableId="getRouterLink()"></RefTable>
    </b-modal>
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
    getRouterLink () {
      return this.data.refEntityType.split('/').pop()
    }
  }
}
</script>
