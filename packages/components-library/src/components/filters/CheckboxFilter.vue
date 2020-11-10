<template>
  <div>
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
      <b-link
        class="toggle-select card-link"
        @click.prevent="toggleSelect"
      >
        {{ toggleSelectText }}
      </b-link>
    </span>
  </div>
</template>

<script>
export default {
  name: 'CheckboxFilter',
  props: {
    /**
     * Boolean to give the selected checkboxes back
     * returns array { text, value } objects
     */
    returnObject: {
      type: Boolean,
      required: false
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
    }
  },
  data () {
    return {
      externalUpdate: false,
      selection: [],
      resolvedOptions: [],
      sliceOptions: this.maxVisibleOptions && this.resolvedOptions && this.maxVisibleOptions < this.resolvedOptions.length
    }
  },
  computed: {
    visibleOptions () {
      return this.sliceOptions ? this.resolvedOptions.slice(0, this.maxVisibleOptions) : (typeof this.resolvedOptions === 'function' ? [] : this.resolvedOptions)
    },
    showToggleSlice () {
      return this.maxVisibleOptions && this.maxVisibleOptions < this.resolvedOptions.length
    },
    toggleSelectText () {
      return this.value.length ? 'Deselect all' : 'Select all'
    },
    toggleSliceText () {
      return this.sliceOptions ? `Show ${this.resolvedOptions.length - this.maxVisibleOptions} more` : 'Show less'
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

        if (this.returnObject) {
          newSelection = Object.assign(newSelection, this.resolvedOptions.filter(of => newValue.includes(of.value)))
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
        this.selection = this.resolvedOptions.map(option => option.value)
      }
    },
    toggleSlice () {
      this.sliceOptions = !this.sliceOptions
    },
    setValue () {
      this.externalUpdate = true
      if (this.value && this.value.length > 0 && typeof this.value[0] === 'object') {
        this.selection = this.value.map(vo => vo.value)
      } else {
        this.selection = this.value
      }
    }
  }
}
</script>

<style>
.card-link { font-style: italic; font-size: small; }
</style>

<docs>
Filter that renders a list of options as a set of checkboxes

## Usage
```jsx
const model = []
<CheckboxFilter
  v-bind:maxVisibleOptions="5"
  v-bind:bulkOperation="true"
  v-bind:options="fruitOptionsFunction"
  v-model="model">
</CheckboxFilter>
<div>model: {{model}}</div>
```
</docs>
