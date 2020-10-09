<template>
  <div>
    <b-input-group>
      <b-form-input
        v-model="query"
        :name="name"
        :placeholder="placeholder"
        trim
      />
      <b-input-group-append>
        <b-button
          variant="outline-secondary"
          :disabled="isLoading"
          @click.prevent="query= ''"
        >
          <font-awesome-icon
            v-if="isLoading"
            icon="spinner"
            class="fa-spin"
            size="xs"
          />
          <font-awesome-icon
            v-else
            icon="times"
          />
        </b-button>
      </b-input-group-append>
    </b-input-group>
    <b-form-checkbox-group
      v-if="slicedOptions.length"
      v-model="selection"
      class="checkbox-list"
      :name="name"
      :options="slicedOptions"
      stacked
    />

    <b-link
      v-if="showCount < multifilterOptions.length"
      class="card-link"
      @click="showMore"
    >
      {{ showMoreText }}
    </b-link>
    <font-awesome-icon
      v-if="foundOptionCount >= 100"
      v-b-popover.hover="'There are 100 or more results found, only the first 100 are available. Please refine your search.'"
      icon="exclamation-triangle"
      class="warning text-danger"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faSpinner,
  faTimes,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons'

// @ts-ignore
Vue.component('FontAwesomeIcon', FontAwesomeIcon)
library.add(faTimes, faExclamationTriangle, faSpinner)

export default Vue.extend({
  props: {
    /**
     * The HTML input element name.
     */
    name: {
      type: String,
      required: true
    },
    /**
     * The HTML input element placeholder.
     */
    placeholder: {
      type: String,
      required: false,
      default: ():string => 'Type to search more'
    },
    /**
     * The async method returning filter options.
     */
    options: {
      type: Function,
      required: true
    },
    /**
     * The amount of initial options to show.
     */
    initialDisplayItems: {
      type: Number,
      required: false,
      default: ():number => 1
    },
    /**
     * @model
     */
    value: {
      type: Array,
      default: ():Array<Record<string, unknown>> => []
    },
    /**
     * The amount of options to show after filtering the checkbox options.
     */
    maxVisibleOptions: {
      type: Number,
      default: ():number => 10
    }
  },
  data ():any {
    return {
      showCount: 0,
      isLoading: false,
      triggerQuery: Number,
      inputOptions: [],
      initialOptions: [],
      query: ''
    }
  },
  computed: {
    selection: {
      get ():Array<Record<string, unknown>> {
        return this.value
      },
      set (value:Array<Record<string, unknown>>):void {
        this.$emit('input', value.length === 0 ? undefined : value)
      }
    },
    multifilterOptions ():Array<Record<string, unknown>> {
      return this.inputOptions.length > 0 || this.query.length
        ? this.inputOptions
        : this.initialOptions
    },
    slicedOptions ():Array<Record<string, unknown>> {
      return this.multifilterOptions.slice(0, this.showCount)
    },
    foundOptionCount ():number {
      return this.multifilterOptions.length
    },
    showMoreText ():string {
      const remaining = this.foundOptionCount - this.showCount
      if (remaining <= this.maxVisibleOptions) {
        return `Show remaining ${remaining}`
      } else {
        return `Show ${this.maxVisibleOptions} more`
      }
    }
  },
  watch: {
    query: function ():void {
      const previousSelection = this.multifilterOptions.filter(
        (option:any) => this.selection.indexOf(option.value) >= 0
      )
      this.inputOptions = previousSelection

      if (this.triggerQuery) {
        clearTimeout(this.triggerQuery)
      }
      this.triggerQuery = setTimeout(async () => {
        clearTimeout(this.triggerQuery)
        this.showCount = this.maxVisibleOptions
        this.isLoading = true

        const fetched = this.query.length
          ? await this.options({ nameAttribute: 'label', query: this.query })
          : this.initialOptions

        const valuesPresent = previousSelection.map((prev:any) => prev.value)

        if (valuesPresent.length) {
          const difference = fetched.filter(
            (prev:any) => !valuesPresent.includes(prev.value)
          )
          this.inputOptions = previousSelection.concat(difference)
        } else {
          this.inputOptions = fetched
        }
        this.isLoading = false
      }, 500)
    }
  },
  created ():void {
    this.showCount = this.maxVisibleOptions
  },
  beforeMount ():void {
    this.initializeFilter()
  },
  methods: {
    showMore ():void {
      this.showCount += this.maxVisibleOptions
    },
    async initializeFilter ():Promise<void> {
      let fetched = []
      if (this.value && this.value.length > 0) {
        fetched = await this.options({ nameAttribute: 'label', queryType: 'in', query: this.value.join(',') })
      } else {
        fetched = await this.options({ nameAttribute: 'label', count: this.initialDisplayItems })
      }
      this.initialOptions = fetched
    }
  }
})
</script>

<style scoped>
.warning:hover {
  cursor: pointer;
}

.checkbox-list {
  max-height: 16rem;
  overflow-y: auto;
  margin: 0.75rem 0;
}
</style>

<style>
.card-link {
  font-style: italic;
  font-size: small;
}
</style>
<docs>
Item-based Filter. Search box is used to find items in the table.

### Usage
```jsx

const model = []
<MultiFilter
  v-bind:options="multiFilterOptions"
  v-bind:collapses="false"
  v-bind:initialDisplayItems="5"
  v-bind:maxVisibleOptions="5"
  v-model="model"
  name="multi-filter">
</MultiFilter>
<div>{{model}}</div>
```
