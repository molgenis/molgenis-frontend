<template>
  <div>

    <div class="">
      <div class="p-0 pl-3 d-flex justify-content-between align-items-center">
        <h2>
          Filters
        </h2>
        <button
          type="button"
          class="btn btn-light m-2 btn-outline-secondary hide-filters"
          title="Hide Filters"
          @click="setShowFilters(false)">
          <font-awesome-icon icon="chevron-left" />
        </button>
      </div>
      <div class="p-2">
        <filter-container
          v-model="selections"
          :filters="filters"
          :filters-shown="filtersShown"
          :can-edit="true"
          @update="updateState"
        />
      </div>
    </div>

  </div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import FilterContainer from '../../node_modules/@molgenis/molgenis-ui-filter/src/components/FilterContainer.vue'

library.add(faChevronLeft)

export default Vue.extend({
  name: 'FiltersView',
  components: { FilterContainer, FontAwesomeIcon },
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
  computed: {
    ...mapState(['showFilters', 'shoppingFilter'])
  },
  methods: {
    ...mapMutations([ 'setShowFilters' ]),
    updateState (newState) {
      this.filtersShown = newState
    }
  }
})
</script>
