<template>
  <!-- eslint-disable vue/no-mutating-props -->
  <div class="input-group">
    <select
      id="toolbar-sort-order-select"
      v-model="sort.sortColumnName"
      class="custom-select form-control"
      @change="handleSortSelectChange(sort.sortColumnName, sort.isSortOrderReversed)"
    >
      <option :value="null" disabled>
        Order by:
      </option>
      <option v-for="column in sortOptions" :key="column.name">
        {{ column.name }}
      </option>
    </select>
    <div class="input-group-append">
      <button
        v-b-tooltip.hover.bottom="'reverse sort order'" class="btn btn-outline-secondary"
        type="button"
        :disabled="sort.sortColumnName === null"
        @click="handleSortSelectChange(sort.sortColumnName, !sort.isSortOrderReversed)"
      >
        <font-awesome-icon v-if="sort.isSortOrderReversed" icon="sort-alpha-up" />
        <font-awesome-icon v-else icon="sort-alpha-down" />
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
