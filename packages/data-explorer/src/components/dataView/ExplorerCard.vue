<template>
  <div class="card mg-explorer-card m-2 position-relative overflow-hidden">
    <div class="card-body">
      <slot>
        <custom-card-content
          v-if="customCode"
          :id="dataId"
          :custom-code="customCode"
          :record="dataContents"
        >
          <template #shopping-button>
            <shopping-button v-if="isShop" :id="dataId" :is-selected="isSelected" />
          </template>
        </custom-card-content>
        <default-card-content
          v-else
          :data-id="dataId"
          :data-table="dataTable"
          :data-label="dataLabel"
          :data-contents="dataContents"
          :collapse-limit="collapseLimit"
          :number-of-attributes="numberOfAttributes"
          :is-editable="isEditable"
          :hidden-columns="hiddenColumns"
          @expandDefaultCard="handleDefaultCardExpand"
        >
          <template #shopping-button>
            <shopping-button v-if="isShop" :id="dataId" :is-selected="isSelected" />
          </template>
        </default-card-content>
      </slot>
    </div>
  </div>
</template>

<script>
import ShoppingButton from '../utils/ShoppingButton'
import DefaultCardContent from './DefaultCardContent'
import CustomCardContent from './CustomCardContent'

export default {
  name: 'ExplorerCard',
  components: { ShoppingButton, DefaultCardContent, CustomCardContent },
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
    },
    isEditable: {
      type: Boolean,
      required: false,
      default: () => false
    },
    // List of cardItem keys {string} that user wants to hide
    hiddenColumns: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleDefaultCardExpand () {
      this.$emit('expandCard', { id: this.dataId })
    }
  }
}
</script>

<style scoped>
  .mg-explorer-card {
    min-width: 24rem;
  }
</style>
