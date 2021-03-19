<template>
  <thead>
    <tr>
      <th class="top-left-corner" scope="col" />
      <th
        v-for="(column, index) in visibleColumns" :key="index"
        class="header-column"
        scope="col"
      >
        <a class="header-label" @click="$emit('sort', column.name)">{{ column.name }}
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
    visibleColumns: {
      type: Array,
      required: true
    },
    isShop: {
      type: Boolean,
      required: false,
      default: () => false
    },
    sortColumnName: {
      type: String,
      required: false,
      default: () => null
    },
    isSortOrderReversed: {
      type: Boolean,
      required: false,
      default: () => false
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
    position: sticky;
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
