<template>
  <thead>
  <tr>
    <th class="top-left-corner" :class="isEditable ? 'edit-mode' : 'view-mode'" scope="col"></th>
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
  thead th.top-left-corner.edit-mode {
    width: 6rem;
    max-width: 6rem;
  }
  thead th.top-left-corner.view-mode {
    width: 3rem;
    max-width: 3rem;
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
    /**
    * making the line a bit thicker to hide text that sometimes is visible behind header on retina screens
    * bug: https://bugs.chromium.org/p/chromium/issues/detail?id=673538
    */
    top: -2px;
    border-top: 2px solid #dee2e6;
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
    isEditable: {
      type: Boolean,
      default: () => false
    },
    isShop: {
      type: Boolean,
      required: false,
      default: () => false
    }
  }
}
</script>
