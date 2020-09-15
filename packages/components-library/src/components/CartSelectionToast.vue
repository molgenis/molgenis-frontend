<template>
  <b-toast
    visible
    no-close-button
    no-auto-hide
    :toaster="location"
    :variant="backgroundVariant"
  >
    <div class="container">
      <div v-if="previewToggle && value.length > 0" class="mb-4">
        <div class="row" v-for="(item, index) in value" :key="index">
          <div class="col">
            {{item}}
          </div>
          <div class="col-auto mb-2">
            <span role="button" @click="removeItem(item)">
              <!-- @slot pass an icon for the remove button -->
              <slot name="removeButton"><i class="fa fa-times"></i></slot>
            </span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col d-flex flex-column justify-content-start align-self-center">
          <div>
            <b>
              <!-- @slot pass text to notify the selection amount -->
              <slot name="cartSelection"></slot>
            </b>
          </div>
          <div v-if="value.length > 0">
            <span role="button" @click="previewToggle = !previewToggle">{{selectionText}} selection</span>
          </div>
        </div>
        <div class="col-auto">
          <b-button @click="clickHandler" :variant="buttonVariant">
            <!-- @slot display tekst of button -->
            <slot name="buttonText"></slot>
          </b-button>
        </div>
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
    previewToggle: false
  }),
  computed: {
    selectionText () {
      return this.previewToggle ? 'Hide' : 'Show'
    }
  },
  methods: {
    removeItem (itemName) {
      this.$emit('input', this.value.filter(item => item !== itemName))
    }
  }
}
</script>

<docs>
  This toast will float bottom right and hold a selection of shop-like values and has a call to action

  ## Basic example

  ```jsx
  function click(){
    alert('clicked')
  }
  <b-toaster name="demo"></b-toaster>
  <cart-selection-toast location="demo" :clickHandler="click">
    <template v-slot:buttonText>To cart</template>
    <template v-slot:cartSelection>10 items selected</template>

  </cart-selection-toast>
  ```
  ## Example with filled slots and selection preview

  ```jsx
  let items = ['Apple', 'Pear', 'Banana'];
  function click(){
    alert('clicked')
  }
  <b-toaster name="demo2"></b-toaster>
  <cart-selection-toast location="demo2" v-model="items" :clickHandler="click">
    <template v-slot:buttonText>Checkout <i class="fa fa-shopping-basket"></i></template>
    <template v-slot:cartSelection>{{items.length}} item(s) selected</template>
    <template v-slot:removeButton><i class="far fa-times-circle"></i></template>
  </cart-selection-toast>
  ```
</docs>
