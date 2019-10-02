<template>
  <div>

    <div>
      <div class="p-0 pl-3 d-flex justify-content-between align-items-center">
        <h2>
          Filters
        </h2>
        <button
          type="button"
          class="btn btn-light m-2 btn-outline-secondary hide-filters"
          title="Hide Filters"
          @click="setHideFilters(true)">
          <font-awesome-icon icon="chevron-left"></font-awesome-icon>
        </button>
      </div>
      <div class="p-2">
        <filter-container
          v-model="filters.selections"
          :filters="filters.definition"
          :filters-shown="filters.shown"
          :can-edit="true"
          @update="updateState"
        ></filter-container>
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
  computed: {
    ...mapState(['filters'])
  },
  methods: {
    ...mapMutations([ 'setHideFilters', 'setFiltersShown' ]),
    updateState (newState) {
      this.setFiltersShown(newState)
    }
  }
})
</script>
