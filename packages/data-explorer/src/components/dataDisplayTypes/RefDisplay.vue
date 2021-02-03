<template>
  <div v-if="data.expression">
    <div class="text-nowrap text-truncate">
      <span>{{value}}</span>
    </div>
  </div>
  <div v-else>
    <div @click="$refs['refPreview'].show()" class="text-nowrap text-truncate mouse-ref">
      <span class="mr-1">{{value}}</span>
      <font-awesome-icon icon="share" size="xs"></font-awesome-icon>
    </div>
    <b-modal ref="refPreview" hide-footer :title="type" body-class="ref-modal-body" dialog-class="ref-modal-dialog">
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
      const link = this.data.refEntityType
      if (typeof link === 'string') {
        return link.split('/').pop()
      } else {
        return link.self.split('/').pop()
      }
    }
  }
}
</script>

<style>
  .ref-modal-body{
    padding: 0;
  }
  .ref-modal-dialog{
    max-width: 90%;
  }
</style>
