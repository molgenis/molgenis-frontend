<template>
  <div class="card mg-explorer-card m-2 position-relative overflow-hidden">
    <div class="card-body">
      <slot>
        <custom-card-content v-if="customCode"
                             :id="dataId"
                             :customCode="customCode"
                             :record="dataContents"
        >
          <template v-slot:shopping-button>
            <shopping-button :id="dataId" v-if="isShop" :isSelected="isSelected"></shopping-button>
          </template>
        </custom-card-content>
        <default-card-content v-else
                              :dataId="dataId"
                              :dataTable="dataTable"
                              :dataLabel="dataLabel"
                              :dataContents="dataContents"
                              :collapseLimit="collapseLimit"
                              :numberOfAttributes="numberOfAttributes"
                              @expandDefaultCard="handleDefaultCardExpand"
        >
          <template v-slot:shopping-button>
            <shopping-button :id="dataId" v-if="isShop" :isSelected="isSelected"></shopping-button>
          </template>
        </default-card-content>
      </slot>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import ShoppingButton from '../utils/ShoppingButton'
import DefaultCardContent from '../../../../components/src/components/card/DefaultCardContent.vue'
import CustomCardContent from './CustomCardContent'

export default Vue.extend({
  name: 'ExplorerCard',
  props: {
    dataId: {
      type: String,
      required: true
    },
    dataTable: {
      type: String,
      required: true
    },
    dataLabel: {
      type: String,
      required: true
    },
    dataContents: {
      type: Object,
      required: true
    },
    numberOfAttributes: {
      type: Number,
      required: true
    },
    isSelected: {
      type: Boolean,
      required: false,
      default: () => false
    },
    isShop: {
      type: Boolean,
      required: false,
      default: () => false
    },
    customCode: {
      type: String,
      required: false
    },
    collapseLimit: {
      type: Number,
      default: () => 5
    }
  },
  components: { ShoppingButton, DefaultCardContent, CustomCardContent },
  methods: {
    handleDefaultCardExpand () {
      this.$emit('expandCard', { id: this.dataId })
    }
  }
})
</script>

<style scoped>
  .mg-explorer-card {
    min-width: 24rem;
  }
</style>
