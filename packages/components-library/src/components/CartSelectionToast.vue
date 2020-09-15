<template>
  <b-toast
    visible
    no-close-button
    no-auto-hide
    :toaster="location"
    :variant="backgroundVariant"
  >
    <div class="row">
      <div class="col d-flex align-items-center">
        <span>
          <slot name="cartSelection"></slot>
        </span>
      </div>
      <div class="col-auto">
        <b-button @click="clickHandler" :variant="buttonVariant"><slot name="buttonText"></slot></b-button>
      </div>
    </div>
  </b-toast>
</template>

<script>
export default {
  name: 'CartSelectionToast',
  props: {
    /**
     * See: https://bootstrap-vue.org/docs/components/toast#b-toaster-target-component
     */
    location: {
      type: String,
      required: false,
      default: () => 'b-toaster-bottom-right'
    },
    /**
     * See: https://bootstrap-vue.org/docs/reference/color-variants#color-variants-and-css-class-mapping
     */
    backgroundVariant: {
      type: String,
      required: false,
      default: () => 'info'
    },
    /**
     * See: https://bootstrap-vue.org/docs/components/button#contextual-variants
     */
    buttonVariant: {
      type: String,
      required: false,
      default: () => 'secondary'
    },
    /**
     * If this array is set (via v-model), then in will allow you to preview your selection
     * Expects a array of strings
     */
    value: {
      type: Array,
      required: false,
      default: () => []
    },
    /**
     * Button click handler
     */
    clickHandler: {
      type: Function,
      required: true
    }
  },
  data: () => ({
  }),
  methods: {
  }
}
</script>

<docs>
  This toast will float bottom right and hold a selection of shop-like values and has a call to action

  ## Basic example

  ```jsx
  <b-toaster name="demo"></b-toaster>
  <cart-selection-toast location="demo" :clickHandler="()=>{}">
    <template v-slot:buttonText>To cart</template>
    <template v-slot:cartSelection>Selected: <b-badge>10</b-badge></template>
  </cart-selection-toast>
  ```
  ## Example with preview

  ```jsx
  <b-toaster name="demo2"></b-toaster>
  <cart-selection-toast location="demo2" :value="['Apple', 'Pear', 'Banana']"  :clickHandler="()=>{}">
    <template v-slot:buttonText>To cart</template>
    <template v-slot:cartSelection>Selected: <b-badge>10</b-badge></template>
  </cart-selection-toast>
  ```
</docs>
