<template>
  <div>
    <b-form-checkbox-group
      v-model="checkboxSelection"
      @input="selectionChanged"
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
     * A Promise-function that resolves with an array of options.
     * {text: 'foo', value: 'bar'}
     */
    options: {
      type: [Function],
      required: true
    },
    /**
     * This is the v-model value; an array of selected options.
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
      selection: [],
      resolvedOptions: [],
      sliceOptions: this.maxVisibleOptions && this.resolvedOptions && this.maxVisibleOptions < this.resolvedOptions.length
    }
  },
  computed: {
    checkboxSelection () {
      console.log('compu', this.selection)
      return this.selection
    },
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
      console.log('hello')
      this.selection = this.value
    },
    resolvedOptions () {
      this.sliceOptions = this.showToggleSlice
    }
  },
  created () {
    this.options().then(response => {
      this.resolvedOptions = response
    })
    console.log(' created', this.value)
    this.selection = this.value
  },
  methods: {
    toggleSelect () {
      console.log(this.selection, this.resolvedOptions)
      if (this.selection && this.selection.length > 0) {
        console.log('que')
        this.selection = []
      } else {
        console.log(' ce')
        this.selection = this.resolvedOptions.map(option => option.value)
      }
    },
    toggleSlice () {
      this.sliceOptions = !this.sliceOptions
    },
    selectionChanged (newValue) {
      this.selection = [...newValue]
      const newSelection = [...newValue]
      this.$emit('input', newSelection)
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
