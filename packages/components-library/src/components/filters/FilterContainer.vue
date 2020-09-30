<template>
  <div
    class="filter-container"
    @mouseup="drag=false"
  >
    <b-collapse
      id="mobile-button-toggle"
      :visible="doCollapse"
    >
      <button
        class="btn w-100 my-2 btn-outline-secondary"
        @click="mobileToggle=!mobileToggle"
      >
        {{ mobileToggle?'Hide filters':'Show filters' }}
      </button>
    </b-collapse>

    <b-collapse
      id="mobile-toggle"
      :visible="!doCollapse || mobileToggle"
    >
      <draggable
        v-model="filtersToShow"
        handle=".drag-handle"
        :class="{'dragdrop': doDragDrop, 'dragging': drag}"
        :disabled="!doDragDrop"
        @choose="drag=true"
        @end="drag=false"
        @input="selectionUpdate"
      >
        <transition-group>
          <filter-card
            v-for="filter in listOfVisibleFilters"
            :key="filter.name"
            v-bind="filter"
            :can-remove="canEdit"
            @removeFilter="removeFilter(filter.name)"
          >
            <component
              :is="filter.type"
              :name="filter.name"
              :value="value[filter.name]"
              v-bind="filter"
              @input="value => selectionChange(filter.name, value)"
            />
          </filter-card>
        </transition-group>
      </draggable>
      <change-filters
        v-if="canEdit && filters.length > 0"
        v-model="filtersToShow"
        :filters="filters"
        @input="selectionUpdate"
      />
    </b-collapse>
  </div>
</template>

<script>
import ChangeFilters from '@/components/filters/ChangeFilters.vue'
import FilterCard from '@/components/filters/FilterCard.vue'
import * as components from '../components/filters'
import draggable from 'vuedraggable'

export default {
  name: 'FilterContainer',
  components: { ChangeFilters, draggable, FilterCard, ...components },
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
     */
    value: {
      type: Object,
      default: () => ({})
    },
    /**
     * Arrays of filter names to show
    */
    filtersShown: {
      type: Array,
      required: false,
      default: () => []
    },
    /**
     * boolean indicating if the user can change the filters shown
    */
    canEdit: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },
  data () {
    return {
      filtersToShow: this.filtersShown,
      filterToAdd: null,
      drag: false,
      width: 0,
      mobileToggle: false
    }
  },
  computed: {
    doCollapse () {
      // Bootstrap's mobile collapse width
      return this.width <= 576
    },
    doDragDrop () {
      return this.canEdit && !this.doCollapse
    },
    listOfVisibleFilters () {
      return this.filtersToShow.map(id => this.filters.find(filter => filter.name === id))
        .filter(item => item !== undefined)
        .filter(item => item.type !== 'compound-title')
    }
  },
  created () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  destroyed () {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize () {
      this.width = window.innerWidth
    },
    removeFilter (name) {
      this.filtersToShow = this.filtersToShow.filter(filter => name !== filter)
      this.$emit('update', this.filtersToShow)

      const selections = { ...this.value }
      delete selections[name]
      this.$emit('input', selections)
    },
    selectionChange (name, value) {
      this.$emit('input', { ...this.value, [name]: value })
    },
    selectionUpdate () {
      this.$emit('update', this.filtersToShow)
    }
  }
}
</script>

<style>
  .dragdrop .drag-handle {
    cursor: grab;
  }

  .dragdrop.dragging .drag-handle {
    cursor: grabbing;
  }
</style>

<docs>
Container that holds list of filters

## Usage
```jsx
const selections = { search: 'test'}
const filtersShown = ['datetime', 'disease', 'age']
const updateState = function (newState) { this.filtersShown = newState }
filters: [
        {
          name: 'name',
          label: 'Label',
          description: 'description',
          collapsed: false
        },
        {
          name: 'datetime',
          label: 'Datetime',
          collapsed: false,
          max: null,
          min: null,
          opens: 'right',
          range: true,
          time: false,
          type: 'date-time-filter',
          value: ['01/03/2037', '01/03/2038']
        },
        {
          name: 'age',
          label: 'Age',
          collapsed: false,
          min: -10,
          max: 10,
          step: 0.01,
          type: 'range-filter'
        },
        {
          name: 'disease', // attribute name
          label: 'Filter with multiple options',
          collapsed: false,
          options: mockData.multifilterOptions,
          initialDisplayItems: 5,
          type: 'multi-filter'
        },
        {
          name: 'compound-id',
          label: 'compound',
          description: 'Compound description of a compound',
          type: 'compound-title',
          collapsable: false
        },
        {
          name: 'search',
          label: 'Search',
          description: 'search by string',
          placeholder: 'placeholder',
          type: 'string-filter',
          collapsable: false,
          compound: 'compound-id'
        },
        {
          name: 'color',
          label: 'Color',
          collapsed: false,
          bulkOperation: true,
          options: () => {
            return new Promise(
              function (resolve) {
                resolve(mockData.checkboxOptions)
              })
          },
          type: 'checkbox-filter',
          compound: 'compound-id'
        },
        {
          name: 'number',
          label: 'Number',
          collapsed: false,
          type: 'number-filter',
          compound: 'compound-id'
        },
        {
          name: 'name1',
          label: 'Name',
          description: 'Name of object',
          type: 'string-filter',
          collapsed: false
        },
        {
          name: 'string',
          label: 'String',
          description: 'search by string',
          placeholder: 'placeholder',
          type: 'string-filter',
          collapsable: true,
          collapsed: false
        },
        {
          name: 'checkbox',
          label: 'Checkbox',
          collapsed: false,
          bulkOperation: true,
          maxVisibleOptions: 1,
          options: () => {
            return new Promise(
              function (resolve) {
                resolve(mockData.checkboxOptions)
              })
          },
          type: 'checkbox-filter'
        },
        {
          name: 'checkbox-options',
          label: 'Checkbox lots of options',
          collapsed: false,
          bulkOperation: true,
          maxVisibleOptions: 1,
          options: () => {
            return new Promise(
              function (resolve) {
                resolve(mockData.checkboxLotsOptions)
              })
          },
          type: 'checkbox-filter'
        },
        {
          name: 'long-name',
          label: 'Way too long name to really fit in the user interface',
          collapsed: true,
          bulkOperation: true,
          options: () => {
            return new Promise(
              function (resolve) {
                resolve(mockData.boolCheckboxes)
              })
          },
          type: 'checkbox-filter'
        }
      ]
<FilterContainer
          v-model="selections"
          v-bind:filters="filters"
          v-bind:filters-shown="filtersShown"
          v-bind:can-edit="true"
          v-bind:update="updateState">
</FilterContainer>
<div>model: {{selections}}</div>
```
</docs>
