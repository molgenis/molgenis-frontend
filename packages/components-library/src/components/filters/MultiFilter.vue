<template>
  <div>
    <b-input-group>
      <b-form-input v-model="query" :name="name" :placeholder="placeholder" trim />
      <b-input-group-append>
        <b-button variant="outline-secondary" :disabled="isLoading" @click.prevent="query = ''">
          <font-awesome-icon v-if="isLoading" icon="spinner" class="fa-spin" size="xs" />
          <font-awesome-icon v-else icon="times" />
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

    <b-link v-if="showCount < multifilterOptions.length" class="card-link" @click="showMore">
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

<script>
export default {
  name: 'MultiFilter',
  props: {
    /**
     * Toggle to switch between returning an array of value or entire option object
     */
    returnTypeAsObject: {
      type: Boolean,
      required: false,
      default: () => false
    },
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
      default: () => 'Type to search more'
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
      default: () => 1
    },
    /**
     * @model
     */
    value: {
      type: Array,
      default: () => []
    },
    /**
     * The amount of options to show after filtering the checkbox options.
     */
    maxVisibleOptions: {
      type: Number,
      default: () => 10
    }
  },
  data () {
    return {
      externalUpdate: false,
      showCount: 0,
      isLoading: false,
      triggerQuery: Number,
      inputOptions: [],
      initialOptions: [],
      selection: [],
      query: ''
    }
  },
  computed: {
    multifilterOptions () {
      return this.inputOptions.length > 0 || this.query.length
        ? this.inputOptions
        : this.initialOptions
    },
    slicedOptions () {
      return this.multifilterOptions.slice(0, this.showCount)
    },
    foundOptionCount () {
      return this.multifilterOptions.length
    },
    showMoreText () {
      const remaining = this.foundOptionCount - this.showCount
      if (remaining <= this.maxVisibleOptions) {
        return `Show remaining ${remaining}`
      } else {
        return `Show ${this.maxVisibleOptions} more`
      }
    }
  },
  watch: {
    selection (newValue) {
      if (this.externalUpdate) {
        this.externalUpdate = false
        return
      }
      const newSelection = this.returnTypeAsObject ? this.multifilterOptions.filter(mfo => newValue.includes(mfo.value)) : newValue
      this.$emit('input', newSelection)
    },
    value () {
      this.setValue()
    },
    query: function () {
      const previousSelection = this.multifilterOptions.filter(
        option => this.inputOptions.indexOf(option.value) >= 0
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

        const valuesPresent = previousSelection.map(prev => prev.value)

        if (valuesPresent.length) {
          const difference = fetched.filter(
            prev => !valuesPresent.includes(prev.value)
          )
          this.inputOptions = previousSelection.concat(difference)
        } else {
          this.inputOptions = fetched
        }
        this.isLoading = false
      }, 500)
    }
  },
  created () {
    this.showCount = this.maxVisibleOptions
  },
  beforeMount () {
    this.initializeFilter()
  },
  methods: {
    setValue () {
      this.externalUpdate = true
      this.selection = typeof this.value[0] === 'object' ? this.value.map(vo => vo.value) : this.value
    },
    showMore () {
      this.showCount += this.maxVisibleOptions
    },
    async initializeFilter () {
      let selectedOptions = []

      if (this.value && this.value.length) {
        this.setValue()
        // Get the initial selected
        selectedOptions = await this.options({ nameAttribute: 'label', queryType: 'in', query: this.selection.join(',') })
      }

      // fetch the other options and concat
      const completeInitialOptions = selectedOptions.concat(await this.options({ nameAttribute: 'label', count: this.initialDisplayItems }))

      // deduplicate by first mapping the id's then getting the first matching object back.
      this.initialOptions = Array.from(new Set(completeInitialOptions.map(cio => cio.value))).map(value => completeInitialOptions.find(cio => cio.value === value))
    }
  }
}
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
  v-bind:returnTypeAsObject="false"
  v-bind:options="multiFilterOptions"
  v-bind:collapses="false"
  v-bind:initialDisplayItems="5"
  v-bind:maxVisibleOptions="5"
  v-model="model"
  name="multi-filter">
</MultiFilter>
<div>{{model}}</div>
```
</docs>
