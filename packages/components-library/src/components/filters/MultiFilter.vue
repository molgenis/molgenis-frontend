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
          @click.prevent="query = ''"
        >
          <font-awesome-icon
            v-if="isLoading"
            icon="spinner"
            class="fa-spin"
            size="xs"
          />
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
    <div class="d-flex">
      <b-link
        v-if="showCount < multifilterOptions.length"
        class="card-link"
        @click="showMore"
      >
        {{ showMoreText }}
      </b-link>
      <div
        v-if="foundOptionCount >= optionsWarningCount"
        v-b-popover.hover="
          `There are ${optionsWarningCount} or more results found, only the first ${optionsWarningCount} are available. Please refine your search.`
        "
        class="badge badge-warning warning text-white ml-auto d-flex align-items-center"
      >
        <span class="mr-1">
          {{ optionsWarningCount }}+
        </span>
        <font-awesome-icon
          icon="exclamation-circle"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MultiFilter',
  props: {
    /**
     * Toggle to switch between returning an array with values or an array with the full option
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
     * The amount of options available at one time
     * per search request
     */
    optionsWarningCount: {
      type: Number,
      required: false,
      default: 100
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
      return this.inputOptions
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
      let newSelection
      if (this.externalUpdate) {
        this.externalUpdate = false
        return
      }

      if (this.returnTypeAsObject) {
        newSelection = Object.assign(
          newValue,
          this.multifilterOptions.filter((mfo) => newValue.includes(mfo.value))
        )
      } else {
        newSelection = [...newValue]
      }

      this.$emit('input', newSelection)
    },
    value () {
      this.setValue()
    },
    query (queryValue) {
      if (this.triggerQuery) {
        clearTimeout(this.triggerQuery)
      }

      if (!queryValue.length) {
        const newInititalOptions = [].concat(this.multifilterOptions)
        this.inputOptions = this.inputOptionsSort(newInititalOptions)
        return
      }

      this.triggerQuery = setTimeout(() => {
        clearTimeout(this.triggerQuery)
        this.showCount = this.maxVisibleOptions
        this.isLoading = true

        this.options({ nameAttribute: 'label', query: this.query }).then(
          (searchResults) => {
            const allOptions = searchResults
              ? searchResults.concat(this.inputOptions)
              : this.inputOptions
            this.inputOptions = this.inputOptionsSort(allOptions)
          }
        )

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
    inputOptionsSort (optionsArray) {
      optionsArray.sort((a, b) => {
        if (
          !this.selection.includes(a.value) &&
          !this.selection.includes(b.value)
        ) {
          return 0
        } else if (
          this.selection.includes(a.value) &&
          !this.selection.includes(b.value)
        ) {
          return -1
        } else return 1
      })

      return Array.from(
        new Set(optionsArray.map((cio) => cio.value))
      ).map((value) => optionsArray.find((cio) => cio.value === value))
    },
    setValue () {
      this.externalUpdate = true
      this.selection =
        typeof this.value[0] === 'object'
          ? this.value.map((vo) => vo.value)
          : this.value
    },
    showMore () {
      this.showCount += this.maxVisibleOptions
    },
    async initializeFilter () {
      let selectedOptions = []

      if (this.value && this.value.length) {
        this.setValue()
        // Get the initial selected
        selectedOptions = await this.options({
          nameAttribute: 'label',
          queryType: 'in',
          query: this.selection.join(',')
        })
      }

      // fetch the other options and concat
      const completeInitialOptions = selectedOptions.concat(
        await this.options({
          nameAttribute: 'label',
          count: this.initialDisplayItems
        })
      )

      // deduplicate by first mapping the id's then getting the first matching object back.
      this.initialOptions = this.inputOptionsSort(completeInitialOptions)
      this.inputOptions = this.initialOptions
    }
  }
}
</script>

<style scoped>
.warning:hover {
  cursor: pointer;
}

.checkbox-list {
  margin: 0.75rem 0;
  max-height: 16rem;
  overflow-y: auto;
}

.card-link {
  font-size: small;
  font-style: italic;
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
  v-bind:optionsWarningCount="10"
  v-model="model"
  name="multi-filter">
</MultiFilter>
<div>{{model}}</div>
```
</docs>
