
<template>
  <b-input-group class="flex-nowrap">
    <date-range-picker
      ref="picker"
      v-model="dateRange"
      class="flex-grow-1"
      :opens="opens"
      :locale-data="{ firstDay: 1, format: pickerFormat }"
      :single-date-picker="!range"
      :time-picker="time"
      :time-picker24hour="true"
      :show-week-numbers="false"
      :show-dropdowns="true"
      :auto-apply="false"
      :ranges="false"
      :linked-calendars="false"
      :always-show-calendars="true"
      :min-date="min"
      :max-date="max"
      :append-to-body="appendToBody"
      @update="updateValues"
    >
      <template slot="input">
        {{ formattedDate }}
      </template>
    </date-range-picker>
    <b-input-group-append>
      <b-button
        variant="outline-secondary"
        class="t-btn-clear"
        @click="clearValue"
      >
        <font-awesome-icon icon="times" />
      </b-button>
    </b-input-group-append>
  </b-input-group>
</template>

<script>
export default {
  name: 'DateTimeFilter',
  props: {
    /**
     * Define the start of your calendar range.
     * @values ISOString, null
     */
    min: {
      default: () => null,
      type: [String, null]
    },
    /**
     * Define the end of your calendar range.
     * @values ISOString, null
     */
    max: {
      default: () => null,
      type: [String, null]
    },
    /**
     * Defines a maximal Date/Datetime thats selectable in the calendar widget.
     * @values right, left, top, bottom
     */
    opens: {
      default: () => 'right',
      type: String
    },
    /**
     * Toggles time selection in the calendar widget.
     * @values true, false
     */
    time: {
      type: Boolean,
      default: () => true
    },
    /**
     * Toggles single date selection; uses only min property in that case.
     * @values true, false
     */
    range: {
      type: Boolean,
      default: () => true
    },
    /**
     * The default selected date.
     * @model
     */
    value: {
      type: Array,
      default: () => [null, null]
    },
    /**
     * Append the dialog to the body tag, useful if filter is used within a container that uses overflow:scroll
     * @model
     */
    appendToBody: {
      type: Boolean,
      default: () => false
    }
  },
  data: function () {
    return {
      dateRange: {
        startDate: null,
        endDate: null
      }
    }
  },
  computed: {
    formattedDate: function () {
      const date = this.dateRange
      if (!date.startDate || !date.endDate) {
        return 'Select...'
      }
      if (date.startDate.toISOString() === date.endDate.toISOString()) {
        return this.formatDate(date.startDate)
      } else {
        return `${this.formatDate(date.startDate)} - ${this.formatDate(date.endDate)}`
      }
    },
    pickerFormat () {
      return this.time ? 'yyyy-mm-dd HH:MM:ss' : 'yyyy-mm-dd'
    }
  },
  watch: {
    value (newValue) {
      this.setDateRange(newValue)
    }
  },
  beforeMount () {
    this.setDateRange(this.value)
  },
  methods: {
    clearValue: function () {
      this.dateRange = {
        startDate: null,
        endDate: null
      }

      this.$emit('input', undefined)
    },
    setDateRange (value) {
      if (value) {
        this.dateRange.startDate = this.createDateFromValue(value[0])
        this.dateRange.endDate = this.createDateFromValue(value[1])
      }
    },
    updateValues: function () {
      this.$emit('input', [this.dateRange.startDate, this.dateRange.endDate])
    },
    createDateFromValue (value) {
      if (value) {
        return isNaN(value) ? new Date(Date.parse(value)) : new Date(value)
      }
    },
    formatDate (dateTime) {
      return this.time ? dateTime.toLocaleString() : dateTime.toLocaleDateString()
    }
  }
}
</script>

<style lang="css">
.form-control.reportrange-text {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>

<docs>
Filter between a begin Date(time) and optionally an end Date(time)

### Usage
```jsx
const defaultMin = new Date()
const defaultMax = new Date()
defaultMax.setDate(defaultMax.getDate() + 7)

const selectMax = new Date()
const selectMin = new Date()
selectMax.setDate(selectMax.getDate() + 30)
selectMin.setDate(selectMin.getDate() - 7)

const model = [defaultMin.toISOString(), defaultMax.toISOString()]
<DateTimeFilter
    opens='right'
    v-bind:max='selectMax.toISOString()'
    v-bind:min='selectMin.toISOString()'
    v-bind:range='true'
    v-bind:time='true'
    v-model='model'>
</DateTimeFilter>
<div>{{model}}</div>
```
</docs>
