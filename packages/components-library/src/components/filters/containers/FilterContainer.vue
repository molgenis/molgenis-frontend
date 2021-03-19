<template>
  <div
    class="filter-container"
    @mouseup="drag=false"
  >
    <div v-if="canEdit && filters.length > 0" class="change-filters">
      <b-dropdown
        v-if="dialogStyle == 'dropdown'"
        ref="addFilter"
        class="mb-2"
        variant="outline-primary"
        boundary="window"
        menu-class="shadow ml-2"
        dropright
        no-caret
        block
      >
        <template #button-content>
          <font-awesome-icon icon="filter" class="mr-1" /> {{ filterActionLabel }}
        </template>
        <b-dropdown-text>
          {{ filterListLabel }}
          <span class="float-right btn-close-filter-dialog" @click.stop="$refs.addFilter.hide(true)">
            <font-awesome-icon icon="times" />
          </span>
        </b-dropdown-text>
        <b-dropdown-form>
          <change-filters
            v-model="filtersToShow"
            :filters="filters"
            @input="selectionUpdate"
          />
        </b-dropdown-form>
      </b-dropdown>
      <button v-else v-b-modal.change-filters-modal class="btn btn-block btn-primary text-nowrap">
        {{ filterListLabel }}<font-awesome-icon icon="caret-right" class="ml-1" />
      </button>
      <b-modal
        id="change-filters-modal" title="Change filters"
        hide-footer
        hide-header scrollable
      >
        <change-filters
          v-model="filtersToShow"
          :filters="filters"
          @input="selectionUpdate"
        />
      </b-modal>
    </div>

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
    </b-collapse>
  </div>
</template>

<script>
import FilterCard from './FilterCard.vue'

import ActiveFilters from '../ActiveFilters.vue'
import ChangeFilters from '../ChangeFilters.vue'
import CheckboxFilter from '../CheckboxFilter.vue'
import DateTimeFilter from '../DateTimeFilter.vue'
import MultiFilter from '../MultiFilter.vue'
import NumberFilter from '../NumberFilter.vue'
import RangeFilter from '../RangeFilter.vue'
import StringFilter from '../StringFilter.vue'

export default {
  name: 'FilterContainer',
  components: {
    ActiveFilters,
    ChangeFilters,
    CheckboxFilter,
    DateTimeFilter,
    MultiFilter,
    NumberFilter,
    RangeFilter,
    StringFilter,
    FilterCard
  },
  props: {
    /**
     * An array of filters to render.
     */
    filters: {
      type: Array,
      required: true
    },
    /**
     * Object Key/values of filter names/values from all concerned filters.
     * @model
     */
    value: {
      type: Object,
      default: () => ({})
    },
    /**
     * The filters to show; an array of filter name properties.
     */
    filtersShown: {
      type: Array,
      required: false,
      default: () => []
    },
    /**
     * Lock or unluck filter addition/removal.
     */
    canEdit: {
      type: Boolean,
      required: false,
      default: () => false
    },
    /**
    * Set active filters selection dialogue style, choose between 'dropdown' or 'modal'.
    * Defaults to using 'dropdown'
    */
    dialogStyle: {
      type: String,
      required: false,
      default: () => 'dropdown'
    },
    /**
    * Change action label
    */
    filterActionLabel: {
      type: String,
      required: false,
      default: () => 'Add filter'
    },
    /**
    * Filter list label
    */
    filterListLabel: {
      type: String,
      required: false,
      default: () => 'Filters'
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
  watch: {
    filtersShown (newValue) {
      this.filtersToShow = newValue
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
      /**
       * Emit the filters that are supposed to be visible.
       * @property {Array} filtersToShow - An array of filter name properties
       * @event update
       */
      this.$emit('update', this.filtersToShow)

      const selections = { ...this.value }
      delete selections[name]
      this.$emit('input', selections)
    },
    selectionChange (name, value) {
      /**
       * Update the model with the updated values from related filters.
       * @property {Object} - Filter name/value
       * @event input
       */

      // clear an empty checkbox and range filter
      if (Array.isArray(value)) {
        if (value.length === 0) {
          value = undefined
        } else if (value.every(item => item === null)) {
          value = undefined
        }
      }

      const newSelection = { ...this.value, [name]: value }
      // remove all undefined properties
      Object.keys(newSelection).forEach(key => newSelection[key] === undefined && delete newSelection[key])
      this.$emit('input', newSelection)
    },
    selectionUpdate () {
      this.$emit('update', this.filtersToShow)
    }
  }
}
</script>

<style scoped>
  .dragdrop .drag-handle {
    cursor: grab;
  }

  .dragdrop.dragging .drag-handle {
    cursor: grabbing;
  }

  .btn-close-filter-dialog {
    cursor: pointer;
    display: inline-block;
    height: inherit;
    position: absolute;
    right: 10px;
    text-align: center;
    transition: color 0.2s;
    width: 1.5em;
  }

  .btn-close-filter-dialog:hover {
    color: var(--danger);
  }

  .change-filters form {
    max-height: 400px;
    overflow: auto;
  }
</style>

<docs>
Card containing filter
### Usage
```jsx
const onRemoveFilter = () => alert('remove me please')

const model = {
    search: 'test',
}

const filtersShown = ['datetime']

<div class="row">
  <div class="col-4">
    <FilterContainer
        v-model="model"
        :filters="filtersMocks"
        :filters-shown="filtersShown"
        :can-edit="true"
        filterActionLabel="Add filter"
        filterListLabel="Filters"
        @update="(newState) => filtersShown = newState"
    />
  </div>
  <div>{{model}}</div>
</div>
```
</docs>
