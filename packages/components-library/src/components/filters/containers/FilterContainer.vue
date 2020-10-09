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

<script lang="ts">
import ChangeFilters from '../ChangeFilters.vue'
import FilterCard from './FilterCard.vue'
import * as components from '../index'
import draggable from 'vuedraggable'

export default {
  name: 'FilterContainer',
  components: { ChangeFilters, draggable, FilterCard, ...components },
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
      default: ():Record<string, unknown> => ({})
    },
    /**
     * The filters to show; an array of filter name properties.
     */
    filtersShown: {
      type: Array,
      required: false,
      default: ():Array<string> => []
    },
    /**
     * Lock or unluck filter addition/removal.
     */
    canEdit: {
      type: Boolean,
      required: false,
      default: ():boolean => false
    }
  },
  data ():Record<string, unknown> {
    return {
      filtersToShow: this.filtersShown,
      filterToAdd: null,
      drag: false,
      width: 0,
      mobileToggle: false
    }
  },
  computed: {
    doCollapse ():boolean {
      // Bootstrap's mobile collapse width
      return this.width <= 576
    },
    doDragDrop ():boolean {
      return this.canEdit && !this.doCollapse
    },
    listOfVisibleFilters ():Array<Record<string, unknown>> {
      return this.filtersToShow.map(id => this.filters.find(filter => filter.name === id))
        .filter(item => item !== undefined)
        .filter(item => item.type !== 'compound-title')
    }
  },
  created ():void {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  destroyed ():void {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize ():void {
      this.width = window.innerWidth
    },
    removeFilter (name:string):void {
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
    selectionChange (name, value):void {
      /**
       * Update the model with the updated values from related filters.
       * @property {Object} - Filter name/value
       * @event input
       */
      this.$emit('input', { ...this.value, [name]: value })
    },
    selectionUpdate ():void {
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
        @update="(newState) => filtersShown = newState"
    />
  </div>
  <div>{{model}}</div>
</div>
```
