
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

<script lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Vue, { PropType } from 'vue'

library.add(faTimes)

export default Vue.extend({
  props: {
    /**
     * Define the start of your calendar range.
     * @values ISOString, null
     */
    min: {
      default: ():number | null => null,
      type: [String, null] as PropType<any>
    },
    /**
     * Define the end of your calendar range.
     * @values ISOString, null
     */
    max: {
      default: ():number | null => null,
      type: [String, null] as PropType<any>
    },
    /**
     * Defines a maximal Date/Datetime thats selectable in the calendar widget.
     * @values right, left, top, bottom
     */
    opens: {
      default: ():string => 'right',
      type: String
    },
    /**
     * Toggles time selection in the calendar widget.
     * @values true, false
     */
    time: {
      type: Boolean,
      default: ():boolean => true
    },
    /**
     * Toggles single date selection; uses only min property in that case.
     * @values true, false
     */
    range: {
      type: Boolean,
      default: ():boolean => true
    },
    /**
     * The default selected date.
     * @model
     */
    value: {
      type: Array,
      default: ():Array<string | null> => [null, null]
    }
  },
  data: function ():any {
    return {
      dateRange: {
        startDate: null,
        endDate: null
      }
    }
  },
  computed: {
    formattedDate: function ():string {
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
    pickerFormat ():string {
      return this.time ? 'yyyy-mm-dd HH:MM:ss' : 'yyyy-mm-dd'
    }
  },
  watch: {
    value (newValue:string):void {
      this.setDateRange(newValue)
    }
  },
  beforeMount ():void {
    this.setDateRange(this.value)
  },
  methods: {
    clearValue: function ():void {
      this.dateRange = {
        startDate: null,
        endDate: null
      }

      this.$emit('input', undefined)
    },
    setDateRange (value:string):void {
      if (value) {
        this.dateRange.startDate = this.createDateFromValue(value[0])
        this.dateRange.endDate = this.createDateFromValue(value[1])
      }
    },
    updateValues: function ():void {
      this.$emit('input', [this.dateRange.startDate, this.dateRange.endDate])
    },
    createDateFromValue (value:any):any {
      if (value) {
        return isNaN(value) ? new Date(Date.parse(value)) : new Date(value)
      }
    },
    formatDate (dateTime:Date):string {
      return this.time ? dateTime.toLocaleString() : dateTime.toLocaleDateString()
    }
  }
})
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
