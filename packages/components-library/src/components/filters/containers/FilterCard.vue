<template>
  <b-card
    no-body
    class="filter-card mb-2"
  >
    <b-card-header
      class="drag-handle"
      :class="collapsable ? 'collapsable' : ''"
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

<script lang="ts">
import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCaretRight, faTimes } from '@fortawesome/free-solid-svg-icons'

library.add(faCaretRight, faTimes)

export default Vue.extend({
  props: {
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
      default: ():string => ''
    },
    /**
     * Indicates if filter is shown in collapsed state or not
     */
    collapsed: {
      type: Boolean,
      required: false,
      default: ():boolean => true
    },
    /**
     * Indicates if the user can collapse the filter
     */
    collapsable: {
      type: Boolean,
      required: false,
      default: ():boolean => true
    },
    /**
     * Human readable text with aditional description of the filter
     */
    description: {
      type: String,
      required: false,
      default: ():string => ''
    },
    /**
     * Whether or not the user can remove the filter or not
     */
    canRemove: {
      type: Boolean,
      required: false,
      default: ():boolean => false
    }
  },
  data ():any {
    return {
      isOpen: this.collapsable ? !this.collapsed : true
    }
  },
  computed: {
    iconStyle ():Record<string, unknown> {
      return {
        transform: `rotate(${this.isOpen ? 90 : 0}deg)`,
        transition: 'transform 0.2s'
      }
    }
  },
  methods: {
    removeFilter ():void {
      // @ts-ignore
      this.$emit('removeFilter', this.name)
    },
    toggleState ():boolean {
      if (this.collapsable) {
        this.isOpen = !this.isOpen
        return this.isOpen
      }
      return false
    }
  }
})
</script>

<style scoped>
  .card-header.collapsable {
    cursor: pointer;
  }
  .form-group {
    margin-bottom:0;
  }
  .title{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .remove-button{
    transition: opacity 0.2s, color 0.2s;
    opacity: 0;
    height: inherit;
    width: 1.5em;
    text-align: center;
    display: inline-block;
    position: absolute;
    right: 10px;
    cursor: pointer;
  }
  .remove-button:hover{
    color: var(--danger);
  }
  .filter-card:hover .remove-button{
    opacity: 1;
  }
  .sortable-ghost{
    border-style: dashed;
  }
  .sortable-ghost > div{
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
