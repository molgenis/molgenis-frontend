<template>
  <div>
    <satisfy-all
      v-if="showSatisfyAllCheckbox"
      :value="satisfyAllValue"
      :satisfy-all-label="satisfyAllLabel"
      @input="(value) => $emit('satisfy-all', value)"
    />
    <b-form-checkbox-group
      v-model="selection"
      stacked
      :options="visibleOptions"
    />
    <span v-if="bulkOperation">
      <b-link
        v-if="showToggleSlice"
        class="toggle-slice card-link"
        @click.prevent="toggleSlice"
      >
        {{ toggleSliceText }}
      </b-link>
      <b-link class="toggle-select card-link" @click.prevent="toggleSelect">
        {{ toggleSelectText }}
      </b-link>
    </span>
  </div>
</template>

<script>
import SatisfyAll from '../blocks/SatisfyAll.vue'

export default {
  name: 'CheckboxFilter',
  components: {
    SatisfyAll
  },
  props: {
    /**
     * Toggle to switch between returning an array with values or an array with the full option
     */
    returnTypeAsObject: {
      type: Boolean,
      required: false,
      default: () => false
    },
    /**
     * A Promise-function that resolves with an array of options.
     * {text: 'foo', value: 'bar'}
     */
    options: {
      type: [Function],
      required: true
    },
    /**
     * An array that contains values of options
     * which is used to only show the checkboxes that match
     * these values
     */
    optionsFilter: {
      type: Array,
      required: false
    },
    /**
     * This is the v-model value; an array of selected options.
     * Can also be a { text, value } object array
     */
    value: {
      type: Array,
      default: () => []
    },
    /**
     * Whether to use (De)Select All or not.
     */
    bulkOperation: {
      type: Boolean,
      required: false,
      default: () => true
    },
    /**
     * Limit the maximum number of visible items.
     */
    maxVisibleOptions: {
      type: Number,
      default: () => undefined
    },
    /**
     * This is the satisfyAll property value. It is true if the satisfyAll property has been set (satisfyAll button checked),
     * false if not.
     */
    satisfyAllValue: {
      type: Boolean,
      default: () => false
    },
    /**
     * Whether to show the SatisfyAll checkbox or not.
     * If checked it emits 'satisfyAll' with a boolean
     */
    showSatisfyAllCheckbox: {
      type: Boolean,
      required: false,
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
      externalUpdate: false,
      selection: [],
      resolvedOptions: [],
      sliceOptions:
        this.maxVisibleOptions &&
        this.optionsToRender &&
        this.maxVisibleOptions < this.optionsToRender.length
    }
  },
  computed: {
    visibleOptions () {
      return this.sliceOptions
        ? this.optionsToRender.slice(0, this.maxVisibleOptions)
        : typeof this.optionsToRender === 'function'
        ? []
        : this.optionsToRender
    },
    showToggleSlice () {
      return (
        this.maxVisibleOptions &&
        this.maxVisibleOptions < this.optionsToRender.length
      )
    },
    toggleSelectText () {
      return this.value.length ? 'Deselect all' : 'Select all'
    },
    toggleSliceText () {
      return this.sliceOptions
        ? `Show ${this.optionsToRender.length - this.maxVisibleOptions} more`
        : 'Show less'
    },
    optionsToRender () {
      if (this.optionsFilter && this.optionsFilter.length) {
        return this.resolvedOptions.filter(option =>
          this.optionsFilter.includes(option.value)
        )
      } else {
        return this.resolvedOptions
      }
    }
  },
  watch: {
    value () {
      this.setValue()
    },
    resolvedOptions () {
      this.sliceOptions = this.showToggleSlice
    },
    selection (newValue) {
      if (!this.externalUpdate) {
        let newSelection = []

        if (this.returnTypeAsObject) {
          newSelection = Object.assign(
            newSelection,
            this.optionsToRender.filter(of => newValue.includes(of.value))
          )
        } else {
          newSelection = [...newValue]
        }
        this.$emit('input', newSelection)
      }
      this.externalUpdate = false
    }
  },
  created () {
    this.options().then(response => {
      this.resolvedOptions = response
    })
    this.setValue()
  },
  methods: {
    toggleSelect () {
      if (this.selection && this.selection.length > 0) {
        this.selection = []
      } else {
        this.selection = this.optionsToRender.map(option => option.value)
      }
    },
    toggleSlice () {
      this.sliceOptions = !this.sliceOptions
    },
    setValue () {
      this.externalUpdate = true
      if (
        this.value &&
        this.value.length > 0 &&
        typeof this.value[0] === 'object'
      ) {
        this.selection = this.value.map(vo => vo.value)
      } else {
        this.selection = this.value
      }
    }
  }
}
</script>

<style>
.card-link {
  font-size: small;
  font-style: italic;
}
</style>

<docs>
Filter that renders a list of options as a set of checkboxes

## Usage
```jsx
const model = []
let satisfyAll = false
<CheckboxFilter
  show-satisfy-all-checkbox
  v-bind:maxVisibleOptions="5"
  v-bind:bulkOperation="true"
  v-bind:options="fruitOptionsFunction"
  v-bind:optionsFilter="[]"
  v-model="model"
  v-on:satisfy-all="(value) => { satisfyAll = value }"
  >
</CheckboxFilter>
<div>model: {{model}}</div>
<div>satisfyAll: {{satisfyAll}}</div>
```
</docs>
