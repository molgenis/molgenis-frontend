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

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
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
      default: ():Array<string> => []
    },
    /**
     * Whether to use (De)Select All or not.
     */
    bulkOperation: {
      type: Boolean,
      required: false,
      default: ():boolean => true
    },
    /**
     * Limit the maximum number of visible items.
     */
    maxVisibleOptions: {
      type: Number,
      default: ():number | undefined => undefined
    }
  },
  data ():any {
    return {
      selection: this.value,
      resolvedOptions: [],
      // @ts-ignore
      sliceOptions: this.maxVisibleOptions && this.resolvedOptions && this.maxVisibleOptions < this.resolvedOptions.length
    }
  },
  computed: {
    visibleOptions ():Array<string> {
      return this.sliceOptions ? this.resolvedOptions.slice(0, this.maxVisibleOptions) : (typeof this.resolvedOptions === 'function' ? [] : this.resolvedOptions)
    },
    showToggleSlice ():boolean {
      return this.maxVisibleOptions && this.maxVisibleOptions < this.resolvedOptions.length
    },
    toggleSelectText ():string {
      return this.value.length ? 'Deselect all' : 'Select all'
    },
    toggleSliceText ():string {
      return this.sliceOptions ? `Show ${this.resolvedOptions.length - this.maxVisibleOptions} more` : 'Show less'
    }
  },
  watch: {
    resolvedOptions ():void {
      this.sliceOptions = this.showToggleSlice
    },
    selection (newValue:Array<string>):void {
      const newSelection = [...newValue]
      this.$emit('input', newSelection)
    }
  },
  created ():void {
    this.options().then((response:any) => {
      this.resolvedOptions = response
    })
  },
  methods: {
    toggleSelect ():void {
      if (this.selection && this.selection.length) {
        this.selection = []
      } else {
        this.selection = this.resolvedOptions.map((option:any) => option.value)
      }
    },
    toggleSlice ():void {
      this.sliceOptions = !this.sliceOptions
    }
  }
})
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
