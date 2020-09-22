
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
import Vue from 'vue'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faTimes)

export default Vue.extend({
  name: 'RangeFilter',
  components: { VueSlider, FontAwesomeIcon },
  props: {
    name: {
      type: String,
      required: true
    },
    min: {
      type: Number,
      default: () => Number.MIN_SAFE_INTEGER
    },
    max: {
      type: Number,
      default: () => Number.MAX_SAFE_INTEGER
    },
    step: {
      type: Number,
      default: () => 1
    },
    value: {
      type: Array,
      default: () => [null, null]
    },
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

      // clone to break reactive loop
      this.$emit('input', [...this.rangeValue])
    }
  }
})
</script>
