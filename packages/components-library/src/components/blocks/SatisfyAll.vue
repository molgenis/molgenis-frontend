<template>
  <div class="text-right mb-2">
    <label>
      {{ satisfyAllLabel }}
      <b-form-checkbox
        v-model="satisfyAll"
        name="satisfy-all"
        class="d-inline-block ml-1"
        :value="true"
        :unchecked-value="false"
        @change="(value) => $emit('satisfy-all', value)"
      />
    </label>
  </div>
</template>

<script>
export default {
  props: {
    /**
     * This is the satisfyAll property value. It is true if the satisfyAll property has been set (satisfyAll button checked),
     * false if not.
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
  data () {
    return {
      satisfyAll: false
    }
  },
  watch: {
    satisfyAllValue (newValue) {
      this.satisfyAll = newValue
    }
  },
  created () {
      this.satisfyAllValue = this.value;
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
