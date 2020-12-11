<template>
  <thead>
  <tr>
    <th class="top-left-corner" scope="col"></th>
    <th scope="col"
        v-for="(column, index) in visibleColumns" :key="index">
      {{ column.name }}
    </th>
  </tr>
  </thead>
</template>

<style scoped>
  thead th.top-left-corner {
    left: 0;
    z-index: 1;
    box-sizing: border-box;
  }

  thead th.top-left-corner {
    width: auto;
  }

  .top-left-corner:before {
    pointer-events: none;
    content: '';
    position: absolute;
    height: auto;
    width: auto;
    top: -1px;
    right: -1px;
    bottom: -1px;
    left: -1px;
    border: 1px solid var(--border);
  }
  /**
   * Fix borders in the head
   */
  thead th:after,
  thead th:before {
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
  }
  thead th:before {
    /**
    * making the line a bit thicker to hide text that sometimes is visible behind header on retina screens
    * bug: https://bugs.chromium.org/p/chromium/issues/detail?id=673538
    */
    top: -2px;
    border-top: 2px solid var(--border);
  }
  thead th:after {
    bottom: -1px;
    border-bottom: 1px solid var(--border);
  }

  table.table thead th {
    position: -webkit-sticky; /* for Safari */
    position: sticky;
    top: 0;
    background-color: var(--gray-light);
    border: 1px var(--border) solid;
    width: 12rem;
  }
</style>

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
    }
  }
}
</script>
