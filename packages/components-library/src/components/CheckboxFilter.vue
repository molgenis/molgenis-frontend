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

<style>
  .card-link { font-style: italic; font-size: small; }
</style>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: false,
      default: () => ''
    },
    options: {
      type: [Function],
      required: true
    },
    value: {
      type: Array,
      default: () => []
    },
    bulkOperation: {
      type: Boolean,
      required: false,
      default: () => true
    },
    maxVisibleOptions: {
      type: Number,
      default: () => undefined
    }
  },
  data () {
    return {
      resolvedOptions: [],
      sliceOptions: this.maxVisibleOptions && this.resolvedOptions && this.maxVisibleOptions < this.resolvedOptions.length
    }
  },
  computed: {
    selection: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value.length === 0 ? undefined : value)
      }
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
    resolvedOptions () {
      this.sliceOptions = this.showToggleSlice
    },
    maxVisibleOptions () {
      this.sliceOptions = this.showToggleSlice
    }
  },
  created () {
    this.options().then(response => {
      this.resolvedOptions = response
    })
  },
  methods: {
    toggleSelect () {
      this.selection = this.selection && this.selection.length ? [] : this.resolvedOptions.map(option => option.value)
    },
    toggleSlice () {
      this.sliceOptions = !this.sliceOptions
    }
  }
}
</script>

<docs>
Filter that renders a list of options as a set of checkboxes

## Examples

```jsx
Basic checkbox:

const options = () => Promise.resolve(
 [
  { text: 'Orange', value: 'orange' },
  { text: 'Apple', value: 'apple' },
  { text: 'Pineapple', value: 'pineapple' },
  { text: 'Grape', value: 'grape' }
 ]
)
const selection = []
<checkbox-filter
  name="example-checkbox"
  v-bind:options="options"
  v-model="selection">
</checkbox-filter>

<div>Selected</div>
<ul><li v-for="item in selection">{{item}}</li></ul>

```
</docs>
