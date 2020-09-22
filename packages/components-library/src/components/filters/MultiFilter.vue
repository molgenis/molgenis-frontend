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

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faSpinner,
  faTimes,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faTimes, faExclamationTriangle, faSpinner)

export default {
  components: { FontAwesomeIcon },
  props: {
    name: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      required: false,
      default: () => 'Type to search more'
    },
    label: {
      type: String,
      required: false,
      default: () => ''
    },
    options: {
      type: Function,
      required: true
    },
    initialDisplayItems: {
      type: Number,
      required: false,
      default: () => 5
    },
    value: {
      type: Array,
      default: () => []
    },
    maxVisibleOptions: {
      type: Number,
      default: () => 10
    }
  },
  data () {
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
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value.length === 0 ? undefined : value)
      }
    },
    multifilterOptions () {
      if (this.inputOptions.length > 0) return this.inputOptions
      else return this.initialOptions
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
    query: function (newVal) {
      const previousSelection = this.multifilterOptions.filter(
        option => this.selection.indexOf(option.value) >= 0
      )
      this.inputOptions = previousSelection

      if (this.triggerQuery) {
        clearTimeout(this.triggerQuery)
      }
      this.triggerQuery = setTimeout(async () => {
        clearTimeout(this.triggerQuery)
        if (newVal.length) {
          this.showCount = this.maxVisibleOptions
          this.isLoading = true
          try {
            const fetched = await this.options({ nameAttribute: true, queryType: 'like', query: this.query })
            const valuesPresent = previousSelection.map(prev => prev.value)

            if (valuesPresent.length) {
              const difference = fetched.filter(
                prev => !valuesPresent.includes(prev.value)
              )
              this.inputOptions = previousSelection.concat(difference)
            } else {
              this.inputOptions = fetched
            }
          } catch (err) {
          } finally {
            this.isLoading = false
          }
        }
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
    showMore () {
      this.showCount += this.maxVisibleOptions
    },
    async initializeFilter () {
      let fetched = []
      if (this.value && this.value.length > 0) {
        fetched = await this.options({ nameAttribute: false, queryType: 'in', query: this.value.join(',') })
      } else {
        fetched = await this.options({ count: this.initialDisplayItems })
      }
      this.initialOptions = fetched
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
</style>

<style>
.card-link {
  font-style: italic;
  font-size: small;
}
</style>
<docs>
Filter between a begin Date(time) and optionally an end Date(time)

### Usage
```jsx
{{$foo}}
const options = (options) => Promise.resolve(
 [
  { text: 'Orange', value: 'orange' },
  { text: 'Apple', value: 'apple' },
  { text: 'Pineapple', value: 'pineapple' },
  { text: 'Grape', value: 'grape' }
 ]
)
<MultiFilter
  name="multi"
    v-bind:collapses='false'>
</MultiFilter>
<div>{{model}}</div>
```
