<template>
  <b-card
    no-body
    class="filter-card mb-2"
  >
    <b-card-header
      class="drag-handle"
      :class="cssClasses"
      @click="toggleState"
    >
      <div
        class="title mr-3 px-1"
        :title="label"
      >
        <font-awesome-icon
          v-if="collapsable"
          icon="caret-right"
          :style="iconStyle"
          class="mr-2"
        />
        {{ label }}
        <span
          v-if="canRemove"
          class="remove-button"
          @click.stop="removeFilter"
        >
          <font-awesome-icon icon="times" />
        </span>
      </div>
    </b-card-header>
    <b-collapse
      :id="name"
      v-model="isOpen"
    >
      <b-card-body>
        <b-form-group :description="description">
          <slot />
        </b-form-group>
      </b-card-body>
    </b-collapse>
  </b-card>
</template>

<script>
export default {
  name: 'FilterCard',
  props: {
    /**
     * Extra class to style b-card-header
     */
    headerClass: {
      type: String,
      default: () => ''
    },
    /**
     * Unique filter identifier
     */
    name: {
      type: String,
      required: true
    },
    /**
     * Human readable label descibing the filter
     */
    label: {
      type: String,
      required: false,
      default: () => ''
    },
    /**
     * Indicates if filter is shown in collapsed state or not
     */
    collapsed: {
      type: Boolean,
      required: false,
      default: () => true
    },
    /**
     * Indicates if the user can collapse the filter
     */
    collapsable: {
      type: Boolean,
      required: false,
      default: () => true
    },
    /**
     * Human readable text with aditional description of the filter
     */
    description: {
      type: String,
      required: false,
      default: () => ''
    },
    /**
     * Whether or not the user can remove the filter or not
     */
    canRemove: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },
  data () {
    return {
      isOpen: this.collapsable ? !this.collapsed : true
    }
  },
  computed: {
    cssClasses: function () {
      const classes = this.headerClass.split(' ').filter(i => i)
      if (this.collapsable) {
        classes.push('collapsable')
      }
      return classes.join(' ')
    },
    iconStyle () {
      return {
        transform: `rotate(${this.isOpen ? 90 : 0}deg)`,
        transition: 'transform 0.2s'
      }
    }
  },
  methods: {
    removeFilter () {
      this.$emit('removeFilter', this.name)
    },
    toggleState () {
      if (this.collapsable) {
        this.isOpen = !this.isOpen
        return this.isOpen
      }
      return false
    }
  }
}
</script>

<style scoped>
  .card-header.collapsable {
    cursor: pointer;
  }

  .form-group {
    margin-bottom: 0;
  }

  .title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .remove-button {
    cursor: pointer;
    display: inline-block;
    height: inherit;
    opacity: 0;
    position: absolute;
    right: 10px;
    text-align: center;
    transition: opacity 0.2s, color 0.2s;
    width: 1.5em;
  }

  .remove-button:hover {
    color: var(--danger);
  }

  .filter-card:hover .remove-button {
    opacity: 1;
  }

  .sortable-ghost {
    border-style: dashed;
  }

  .sortable-ghost > div {
    opacity: 0.2;
  }
</style>

<docs>
Card containing filter
### Usage
```jsx
const onRemoveFilter = () => alert('remove me please')

const options = () => Promise.resolve(
 [
  { text: 'Orange', value: 'orange' },
  { text: 'Apple', value: 'apple' },
  { text: 'Pineapple', value: 'pineapple' },
  { text: 'Grape', value: 'grape' }
 ]
)
const model = []

<FilterCard
  name="fruit-card"
  label="Fruit"
  headerClass="bg-info text-white"
  description="Example with checkbox filter"
  v-bind:collapsed="false"
  v-bind:collapsable="true"
  v-bind:canRemove="true"
  v-on:removeFilter="onRemoveFilter">
  <CheckboxFilter
    v-bind:maxVisibleOptions="null"
    v-bind:bulkOperation="true"
    v-bind:options="options"
    v-model="model">
  </CheckboxFilter>
</FilterCard>
```
</docs>
