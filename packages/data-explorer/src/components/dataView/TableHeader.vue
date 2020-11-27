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
    width: 7rem;
    left: 0;
    z-index: 1;
    box-sizing: border-box;
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
    border: 1px solid #dee2e6;
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
    top: -1px;
    border-top: 1px solid #dee2e6;
  }
  thead th:after {
    bottom: -1px;
    border-bottom:
    1px solid #dee2e6;
  }

  thead th {
    position: -webkit-sticky; /* for Safari */
    position: sticky;
    top: 0;
    background-color: #f7f7f7;
    border: 1px #dee2e6 solid;
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
