<template>
  <!-- eslint-disable vue/no-mutating-props -->
  <div class="input-group">
    <select
        id="toolbar-sort-order-select"
        v-model="sort.sortColumnName"
        @change="handleSortSelectChange(sort.sortColumnName, sort.isSortOrderReversed)"
        class="custom-select form-control">
        <option :value="null" disabled>Order by: </option>
        <option v-for="column in sortOptions" :key="column.name">{{ column.name }}</option>
    </select>
    <div class="input-group-append">
        <button class="btn btn-outline-secondary" type="button" v-b-tooltip.hover.bottom="'reverse sort order'"
        :disabled="sort.sortColumnName === null"
        @click="handleSortSelectChange(sort.sortColumnName, !sort.isSortOrderReversed)">
        <font-awesome-icon v-if="sort.isSortOrderReversed"  icon="sort-alpha-up">
        </font-awesome-icon>
        <font-awesome-icon v-else icon="sort-alpha-down">
        </font-awesome-icon>
        </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SortSelect',
  props: {
    /**
     * Array of sort option { id {string}, name {string} } objects
     */
    sortOptions: {
      type: Array,
      required: true
    },
    /**
     * Sort object with sortColumnName {string} and isSortOrderReversed {boolean}
     */
    sort: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleSortSelectChange (sortColumnName, isSortOrderReversed) {
      this.$emit('sort', { sortColumnName, isSortOrderReversed })
    }
  }
}
</script>
