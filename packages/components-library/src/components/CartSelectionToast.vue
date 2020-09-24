<template>
  <b-toast
    visible
    no-close-button
    no-auto-hide
    :toaster="location"
    :variant="backgroundVariant"
    :toastClass="toastClass"
    :bodyClass="bodyClass"
    :headerClass="headerClass"
  >
    <div class="container">
      <div v-if="previewToggle && value.length > 0" class="mb-4">
        <div class="row" v-for="(item, index) in value" :key="index">
          <div class="col">
            {{ previewLabel(item) }}
          </div>
          <div class="col-auto mb-2">
            <span role="button" @click="removeItem(item)">
              <!-- @slot pass an icon for the remove button -->
              <slot name="removeButton"><span class="fa fa-times"></span></slot>
            </span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col d-flex flex-column justify-content-start align-self-center">
          <div class="font-weight-bold">
            {{ cartSelectionText }}
          </div>
          <div v-if="value.length > 0">
            <span role="button" @click="previewToggle = !previewToggle">{{selectionText}} selection</span>
          </div>
        </div>
        <div class="col-auto">
          <b-button @click="clickHandler" :variant="buttonVariant">
            <!-- @slot display tekst of button -->
            <slot name="buttonText">Request items</slot>
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
     * Passthrough setting from BootstrapVue
     */
    toastClass: {
      type: [String, Object, Array]
    },
    /**
     * Passthrough setting from BootstrapVue
     */
    headerClass: {
      type: [String, Object, Array]
    },
    /**
     * Passthrough setting from BootstrapVue
     */
    bodyClass: {
      type: [String, Object, Array]
    },
    /**
    /**
     * Default descriptive text.
     * Use this to specify the amount of selected items in the cart
     * For example:
     * "3 items selected"
     */
    cartSelectionText: {
      type: String,
      required: true
    },
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
     * Expects a array of strings or a Array of objects
     * When using a array of objects provide the 'labelAttribute' to select the field to display
     */
    value: {
      type: Array,
      required: false,
      default: () => []
    },
    /**
     * Label attribute to display for use with object based store data.
     */
    labelAttribute: {
      type: String,
      required: false,
      default: () => 'name'
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
    previewLabel (item) {
      if (typeof item === 'string') {
        return item
      } else if (typeof item === 'object') {
        if (typeof item[this.labelAttribute] === 'string') {
          return item[this.labelAttribute]
        }
      }
      return ''
    },
    removeItem (itemName) {
      /**
       * v-model return value
       *
       * @event input
       * @property {Array} Returns new array without the deleted item
       */
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
  <cart-selection-toast
    location="demo"
    v-bind:clickHandler="click"
    cartSelectionText="3 items selected">
    <template v-slot:buttonText>To cart</template>
    <template v-slot:cartSelection>10 items selected</template>
  </cart-selection-toast>
  ```
  ## Example with filled slots and selection preview

  ```jsx
  let items = ['Apple', 'Pear', 'Banana']
  function click(){
    alert('clicked')
  }
  <b-toaster name="demo2"></b-toaster>
  <cart-selection-toast
    location="demo2"
    v-model="items"
    v-bind:clickHandler="click"
    v-bind:cartSelectionText="items.length + ' item(s) selected'">
    <template v-slot:buttonText>Checkout <span class="fa fa-shopping-basket"></span></template>
    <template v-slot:cartSelection>{{items.length}} item(s) selected</template>
    <template v-slot:removeButton><i class="far fa-times-circle"></i></template>
  </cart-selection-toast>
  ```

  ## Example with id and label

  ```jsx
  let items = [
    { label: 'Apple', id: 1 },
    { label: 'Pear', id: 2 },
    { label: 'Banana', id: 3 }
  ]
  function click(){
    alert('clicked')
  }
  <b-toaster name="demo3"></b-toaster>
  <cart-selection-toast
    location="demo3"
    v-model="items"
    v-bind:clickHandler="click"
    v-bind:cartSelectionText="items.length + ' item(s) selected'"
    labelAttribute="label">
  </cart-selection-toast>
  ```
</docs>
