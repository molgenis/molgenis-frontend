
<template>
  <div>
    <b-input-group class="mb-1">
      <b-form-input
        v-model="rangeValue[0]"
        type="number"
        :min="min"
        :max="max"
        placeholder="from"
        :step="step"
        class="text-center range-from"
        @input="handleRangeValueChange"
      />
      <b-input-group-append>
        <b-button
          class="clear-from"
          variant="outline-secondary"
          @click.prevent="setRangeValue(0, null)"
        >
          <font-awesome-icon icon="times" />
        </b-button>
      </b-input-group-append>
    </b-input-group>
    <b-input-group>
      <b-form-input
        v-model="rangeValue[1]"
        type="number"
        :min="min"
        :max="max"
        placeholder="to"
        :step="step"
        class="text-center range-to"
        @input="handleRangeValueChange"
      />
      <b-input-group-append>
        <b-button
          class="clear-to"
          variant="outline-secondary"
          @click.prevent="setRangeValue(1, null)"
        >
          <font-awesome-icon icon="times" />
        </b-button>
      </b-input-group-append>
    </b-input-group>
    <vue-slider
      v-if="useSlider"
      v-model="rangeValue"
      :min="min"
      :max="max"
      :interval="step"
      class="mt-2"
      @change="handleRangeValueChange"
    />
    <small
      v-if="min != Number.MIN_SAFE_INTEGER && max != Number.MAX_SAFE_INTEGER"
      class="form-text text-muted"
    >In a range of {{ min }} and {{ max }}</small>
  </div>
</template>

<script>
export default {
  name: 'RangeFilter',
  props: {
    /**
     * The minimum allowed filter value.
     */
    min: {
      type: Number,
      default: () => Number.MIN_SAFE_INTEGER
    },
    /**
     * The maximum allowed filter value.
     */
    max: {
      type: Number,
      default: () => Number.MAX_SAFE_INTEGER
    },
    /**
     * Step size when using browser UI controls.
     */
    step: {
      type: Number,
      default: () => 1
    },
    /**
     * The number to be used in filtering items.
     * @model
     */
    value: {
      type: Array,
      default: () => [null, null]
    },
    /**
     * Whether to use an additional UI slider to set the input value.
     */
    useSlider: {
      type: Boolean,
      default: () => false
    }
  },
  data: function () {
    return {
      rangeValue: this.value
    }
  },
  watch: {
    value (newValue) {
      if (newValue[0] == null && newValue[1] == null) {
        this.rangeValue = [null, null]
      }
    }
  },
  methods: {
    setRangeValue (id, value) {
      this.rangeValue[id] = value
      this.handleRangeValueChange()
    },
    clampValue (value, max, min) {
      return Math.min(Math.max(value, min), max)
    },
    handleRangeValueChange () {
      if (this.rangeValue[0] === '') {
        this.rangeValue[0] = null
      }
      if (this.rangeValue[1] === '') {
        this.rangeValue[1] = null
      }

      if (this.rangeValue[0] != null) {
        this.rangeValue[0] = this.clampValue(this.rangeValue[0], this.max, this.min)
      }
      if (this.rangeValue[1] != null) {
        this.rangeValue[1] = this.clampValue(this.rangeValue[1], this.max, this.min)
      }
      this.rangeValue = [this.rangeValue[0], this.rangeValue[1]]

      /**
      * Clone to break reactive loop.
      * @property {Array} rangeValue Range filter value
      */
      this.$emit('input', [...this.rangeValue])
    }
  }
}
</script>

<docs>
Browser number input filter with additional options.
### Usage
```jsx
const model = [2, 8]
<RangeFilter
  v-model="model"
  v-bind:min="0"
  v-bind:max="10"
  v-bind:step="1"
  v-bind:useSlider="true"
  label="Number"
  name="number">
</RangeFilter>
<div>{{model}}</div>
```
</docs>
