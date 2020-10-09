<template>
  <div>
    <button
      v-for="(item, key) in activeValues"
      :key="key"
      type="button"
      class="active-filter btn btn-light m-1 btn-outline-secondary"
      @click="removeFilter(item)"
    >
      {{ item.label }}: {{ item.value }}
      <font-awesome-icon
        icon="times"
        class="ml-1"
      />
    </button>
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faTimes)

export default {
  name: 'ActiveFilters',
  components: { FontAwesomeIcon },
  props: {
    /**
     * List of filter objects
     */
    filters: {
      type: Array,
      required: true
    },
    /**
     * Active filter values
     * @model
     */
    value: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      activeValues: []
    }
  },
  watch: {
    value: {
      handler (newValue) {
        this.buildActiveValues(newValue)
      },
      immediate: true
    }
  },
  methods: {
    async buildActiveValues (newValue) {
      const activeValues = []
      Object.entries(newValue).forEach(async ([key, current]) => {
        const filter = this.selectFilter(key)

        // Clean op the values by removing undefined entry's
        if (current === undefined || (Array.isArray(current) && !current.length)) {
          return
        }

        if (filter.type === 'date-time-filter') {
          let value

          if (current[0].toISOString() === current[1].toISOString()) {
            value = current[0].toLocaleDateString()
          } else {
            value = `${current[0].toLocaleDateString()} - ${current[1].toLocaleDateString()}`
          }

          activeValues.push({ key, value, label: filter.label })
          return
        }

        // Unpack array
        if (Array.isArray(current)) {
          // Checkbox
          if (filter.type === 'checkbox-filter') {
            // resolve options function/promise and show results later
            const option = await filter.options()
            current.forEach(subKey => {
              const findTextFromValue = option.filter(
                filterOption => filterOption.value === subKey
              )[0]
              activeValues.push({
                key,
                subKey,
                value: findTextFromValue.text,
                label: filter.label
              })
            })
          }
          // Range Filter
          if (filter.type === 'range-filter') {
            if ((current[0] === null || current[0] === '') && current[1] != null) {
              activeValues.push({
                key,
                value: `${current[1]} and less`,
                label: filter.label
              })
            } else if (current[0] !== null && (current[1] === null || current[1] === '')) {
              activeValues.push({
                key,
                value: `${current[0]} and more`,
                label: filter.label
              })
            } else if (current[0] !== null && current[1] !== null) {
              activeValues.push({
                key,
                value: `${current[0]} to ${current[1]}`,
                label: filter.label
              })
            }
          }

          if (filter.type === 'multi-filter') {
            const options = await filter.options({ nameAttribute: false, queryType: 'in', query: current.join(',') })
            current.forEach(subKey => {
              const findTextFromValue = options.filter(
                filterOption => filterOption.value === subKey
              )[0]
              activeValues.push({
                key,
                subKey,
                value: findTextFromValue.text,
                label: filter.label
              })
            })
          }
        } else {
          // Single item
          activeValues.push({ key, value: current, label: filter.label })
        }
      })
      if (this.value === newValue) {
        this.activeValues = activeValues
      }
    },
    selectFilter (key) {
      return this.filters.filter(filter => filter.name === key)[0]
    },
    removeFilter ({ key, subKey }) {
      const selections = { ...this.value }
      if (subKey === undefined) {
        delete selections[key]
      } else {
        selections[key] = selections[key].filter(selectionKey => selectionKey !== subKey)
      }
      this.$emit('input', selections)
    }
  }
}
</script>

<style scoped>
button svg path {
  transition: fill 0.3s;
}
button:hover svg path {
  fill: var(--danger);
}
</style>

<docs>
Visualisation of active filters

### Usage
```jsx

const selections = {
  search: 'test',
  name: 'John',
  age: [32, 45],
  fruit: ['orange', 'apple'],
  color: ['red', 'green'],
  datetime: [new Date('10/01/1980'), new Date('03/12/2020')],
}

<ActiveFilters
  v-model="selections"
  v-bind:filters="filtersMocks">
</ActiveFilters>
<div>{{selections}}</div>
```
</docs>
