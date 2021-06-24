<template>
  <div class="text-right mb-2 satisfy-all-checkbox">
    <label>
      {{ satisfyAllLabel }}
      <b-form-checkbox
        v-model="satisfyAllModel"
        name="satisfy-all"
        class="d-inline-block ml-1"
      />
    </label>
  </div>
</template>

<script>
export default {
  props: {
    /**
     * This is the satisfyAll v-model value. 
     * @model
     */
    
    value: {
      type: Boolean,
      default: () => false
    },
    /**
     * The label to show on the left of the satisfy all Checkbox
     */
    satisfyAllLabel: {
      type: String,
      required: false,
      default: () => 'Satisfy all'
    }
  },
  computed: {
    satisfyAllModel: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>

<docs>
Filter that renders a list of options as a set of checkboxes

## Usage
```jsx
const satisfyAllLabel = 'Satisfy all'
let satisfyAll = false
    <satisfy-all
      v-bind:satisfy-all-label="satisfyAllLabel"
      v-on:satisfy-all="event => satisfyAll = event"
    />
<div>satisfyAll: {{satisfyAll}}</div>
```
</docs>
