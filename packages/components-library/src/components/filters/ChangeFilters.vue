<template>
  <div>
    <b-form-checkbox
      v-for="option in filters"
      :key="option.name"
      :checked="selected.includes(option.name)"
      :class="{'ml-4':option.compound}"
      @change="checkboxHandler(option, $event)"
    >
      <span v-if="option.label">
        <span class="text-nowrap">{{ option.label }}</span>
        <span class="text-secondary">
          <small>
            <span class="text-nowrap">( {{ option.name }} )</span>
          </small>
        </span>
      </span>
      <span v-else>
        <span class="text-nowrap">{{ option.name }}</span>
      </span>
      <span class="text-secondary">
        <small v-if="option.description">- {{ option.description }}</small>
      </span>
    </b-form-checkbox>
  </div>
</template>

<script>
export default {
  name: 'ChangeFilters',
  props: {
    /**
     * The filters to select from
     * @model
     */
    filters: {
      type: Array,
      required: true
    },
    /**
     * The selected filters
     * @model
     */
    value: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      selected: this.value
    }
  },
  watch: {
    value: {
      handler (newValue) {
        this.selected = [...newValue]
      },
      immediate: true
    }
  },
  methods: {
    unique: (value, index, items) => items.indexOf(value) === index,
    checkboxHandler (option, state) {
      if (state) {
        this.selected.push(option.name)
      } else {
        this.selected = this.selected.filter((item) => item !== option.name)
      }

      // parent compound toggle
      if (option.type === 'compound-title') {
        const subCompounds = this.filters
          .filter((item) => item.compound === option.name)
          .map((item) => item.name)
        if (this.selected.includes(option.name)) {
          // Select all and make unique
          this.selected = [...this.selected, ...subCompounds].filter(
            this.unique
          )
        } else {
          // Deselect all
          this.selected = this.selected.filter(
            (item) => !subCompounds.includes(item)
          )
        }
      }

      // child compound toggle
      if (option.compound) {
        const subCompounds = this.filters
          .filter((item) => item.compound === option.compound)
          .map((item) => item.name)
        const allSelected = subCompounds.every((item) =>
          this.selected.includes(item)
        )
        const noneSelected = subCompounds.every(
          (item) => !this.selected.includes(item)
        )
        const partialSelected = !allSelected && !noneSelected
        if (allSelected) {
          this.selected = [option.compound, ...this.selected].filter(
            this.unique
          )
        }
        if (noneSelected) {
          this.selected = this.selected.filter(
            (item) => item !== option.compound
          )
        }
        if (partialSelected) {
          this.selected = this.selected.filter(
            (item) => item !== option.compound
          )
        }
      }
      this.$emit('input', this.selected)
    }
  }
}
</script>

<style scoped>

</style>

<docs>
Filter selector
### Usage
```jsx
const filters = [
  {
    name: 'color',
    label: 'Color',
    description: 'pick a color',
  },
  {
    name: 'region',
    label: 'Region',
  },
  {
    name: 'health',
    label: 'Health',
    type: 'compound-title'
  },
  {
    name: 'drugs',
    label: 'Drug use',
    compound: 'health'
  },
  {
    name: 'mental-health',
    label: 'Mental health',
    compound: 'health'
  }
]
const model = []
<div class="row">
  <div class="col-2">
    <ChangeFilters
      v-bind:filters="filters"
      v-model="model">
    </ChangeFilters>
  </div>
</div>

<div>{{model}}</div>
```
</docs>
