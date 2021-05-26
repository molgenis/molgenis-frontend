<template>
  <thead>
    <tr>
      <th class="top-left-corner" scope="col" />
      <th
        v-for="(column, index) in visibleColumns" :key="index"
        class="header-column"
        scope="col"
      >
        <a class="header-label" @click="sortEvent(column.name)">
          {{ column.label || column.name }}
          <font-awesome-icon
            v-if="column.name !== sortColumnName"
            class="mr-1 sort-icon" icon="sort"
          />
          <font-awesome-icon
            v-if="column.name === sortColumnName && !isSortOrderReversed"
            class="mr-1" icon="sort-alpha-down"
          />
          <font-awesome-icon
            v-if="column.name === sortColumnName && isSortOrderReversed"
            class="mr-1" icon="sort-alpha-up"
          />
        </a>
      </th>
    </tr>
  </thead>
</template>

<script>
export default {
  name: 'TableHeader',
  props: {
    /**
     * The list of columns to display. 
     * type: [ { name: 'name of column' }, ... ]
     */
    visibleColumns: {
      type: Array,
      required: true
    },
    /**
     * The current column that is being used for sorting
     */
    sortColumnName: {
      type: String,
      required: false,
      default: () => null
    },
    /**
     * Sorting the current column but in reversed order
     */
    isSortOrderReversed: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },
  methods:{
    sortEvent(name) {
      /**
       * Emits the name of to column the user wishes to sort
       * @property {String} sort - name of column to sort
       * @event sort
       */
      this.$emit('sort', name)
    }
  }
}
</script>

<style scoped>
  thead th.top-left-corner {
    box-sizing: border-box;
    left: 0;
    width: 2rem;
    z-index: 1;
  }

  .top-left-corner::before {
    border: 1px solid var(--border);
    bottom: -1px;
    content: '';
    height: auto;
    left: -1px;
    pointer-events: none;
    position: absolute;
    right: -1px;
    top: -1px;
    width: auto;
  }
  /**
   * Fix borders in the head
   */
  thead th::after,
  thead th::before {
    content: '';
    left: 0;
    position: absolute;
    width: 100%;
  }

  thead th::before {
    border-top: 2px solid var(--border);
    /**
    * making the line a bit thicker to hide text that sometimes is visible behind header on retina screens
    * bug: https://bugs.chromium.org/p/chromium/issues/detail?id=673538
    */
    top: -2px;
  }

  thead th::after {
    border-bottom: 1px solid var(--border);
    bottom: -1px;
  }

  table.table thead th {
    background-color: var(--light);
    border: 1px var(--border) solid;
    position: sticky; /* for Safari */
    top: 0;
  }

  .sort-icon {
    visibility: hidden;
  }

  .header-label:hover .sort-icon {
    visibility: visible;
  }

  .header-label {
    white-space: nowrap;
  }

  .header-label:hover {
    cursor: pointer;
  }
</style>

<docs>
  Builds a header for a table. The column will have sorting options

  ### Usage
  ```jsx
  const columns = [
    { name: 'id' }, { name: 'name' }, { name: 'age' }, { name: 'job' }, { name: 'email' }
  ]
  var sorting = "name"
  var isReversed = false

  <table>
    <TableHeader
      v-bind:visibleColumns="columns"
      v-bind:sortColumnName="sorting"
      v-bind:isSortOrderReversed="isReversed"
      v-on:sort="(newValue) => {
        isReversed =  ( sorting === newValue && isReversed == false )
        sorting = newValue
      }">
    </TableHeader>
  </table>
  <hr/>
  <div>sorting: {{sorting}}</div>
  <div>isReversed: {{isReversed}}</div>
  ```
</docs>