<template>
  <div>
    <filter-container
      v-model="selections"
      :filters="filters"
      :filters-shown="filtersShown"
      :can-edit="true"
      @update="updateState"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import FilterContainer from 'molgenis-ui-filter/src/components/FilterContainer'
export default Vue.extend({
  name: 'FiltersView',
  components: { FilterContainer },
  data () {
    return {
      selections: {
        search: 'test'
      },
      filtersShown: ['search', 'color', 'name', 'price'],
      filters: [ {
        name: 'search',
        label: 'Search',
        description: 'search by string',
        placeholder: 'placeholder',
        type: 'string-filter',
        collapsable: false
      }, {
        name: 'color',
        label: 'Color',
        collapsed: false,
        bulkOperation: true,
        options: [{ value: 'red', text: 'Red' }, { value: 'green', text: 'Green' }, { value: 'blue', text: 'Blue' }],
        type: 'checkbox-filter'
      }, {
        name: 'name',
        label: 'Name',
        description: 'Name of object',
        type: 'string-filter',
        collapsed: false
      }, {
        name: 'price',
        label: 'Price',
        type: 'string-filter'
      }, {
        name: 'string',
        label: 'String',
        description: 'search by string',
        placeholder: 'placeholder',
        type: 'string-filter',
        collapsable: true,
        collapsed: false
      }, {
        name: 'checkbox',
        label: 'Checkbox',
        collapsed: true,
        bulkOperation: true,
        options: [{ value: 'red', text: 'Red' }, { value: 'green', text: 'Green' }, { value: 'blue', text: 'Blue' }],
        type: 'checkbox-filter'
      }, {
        name: 'long-name',
        label: 'Way too long name to really fit in the user interface',
        collapsed: true,
        bulkOperation: true,
        options: [{ value: 'yes', text: 'Yes' }, { value: 'no', text: 'No' }],
        type: 'checkbox-filter'
      }]
    }
  },
  methods: {
    updateState (newState) {
      this.filtersShown = newState
    }
  }
})
</script>
