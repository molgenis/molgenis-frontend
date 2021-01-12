<template>
  <tr :class="{'row-selected': isSelected}">
    <th v-if="showSelected" scope="col"><shopping-button :isSelected="isSelected" :id="id"></shopping-button></th>
    <th v-else class="text-nowrap" :id="'table-row-'+id" scope="col">
      <input v-if="isEditable" class="form-check-input" type="checkbox" :checked="isSelected" :value="id" @click="$emit('toggleSelectedItemsHandler', id)">
      <a
        v-if="isEditable"
        v-b-tooltip.hover.bottom="'edit'"
        class="btn btn-sm text-secondary pl-2"
        role="button"
        :href="'/plugin/data-row-edit/' + tableName + '/' + id">
        <font-awesome-icon icon="edit"></font-awesome-icon>
      </a>
      <a
        v-b-tooltip.hover.bottom="'details'"
        class="btn btn-sm text-secondary"
        role="button"
        :href="`/menu/main/dataexplorer/details/${tableName}/${id}`">
        <font-awesome-icon icon="search"></font-awesome-icon>
      </a>
      <button
        v-if="isEditable"
        v-b-tooltip.hover.bottom="'delete'"
        class="btn btn-sm text-secondary"
        role="button"
        @click="$eventBus.$emit('delete-item', id)"
      >
        <font-awesome-icon icon="trash"></font-awesome-icon>
      </button>
    </th>
    <td v-for="(column, index) in visibleColumns" :key="index" class="mg-data-column">
      <DataDisplayCell v-if="typeof getColumnName(column.name) != 'undefined'" :value="getColumnName(column.name)" :type="column.type" :data="column" :rowIndex="rowIndex"></DataDisplayCell>
    </td>
  </tr>
</template>

<script>
import DataDisplayCell from '@/components/dataDisplayTypes/DataDisplayCell'
import ShoppingButton from '../utils/ShoppingButton'

export default {
  name: 'TableRow',
  components: { ShoppingButton, DataDisplayCell },
  props: {
    id: {
      type: String,
      required: true
    },
    tableName: {
      type: String,
      required: true
    },
    rowData: {
      type: Object,
      required: true
    },
    visibleColumns: {
      type: Array,
      required: true
    },
    isSelected: {
      type: Boolean,
      required: false,
      default: () => false
    },
    isEditable: {
      type: Boolean,
      default: () => false
    },
    showSelected: {
      type: Boolean,
      required: true
    },
    rowIndex: {
      type: Number,
      required: true
    }
  },
  methods: {
    getColumnName (name) {
      if (name in this.rowData) {
        return this.rowData[name].toString()
      }
    }
  }
}
</script>

<style scoped>
  .row-selected{
    background-color: var( --tertiary );
  }
  /**
   * Make actions column stick
   */
  th {
    text-align: center;
    position: -webkit-sticky; /* for Safari */
    position: sticky;
    left: 0;
    background-color: var( --gray-light );
    border-right: 1px var( --border ) solid;
  }
  /**
   * Fix borders in the first column
   */
  th:after,
  th:before {
    content: '';
    position: absolute;
    top: 0;
    height: 100%;
  }
  th:before {
    left: -1px;
    border-left: 1px solid var( --border );
  }
  th:after {
    right: -1px;
    border-right: 1px solid var( --border );
  }

  /**
  * Style row actions
  */
  .mg-data-column {
    max-width: 8rem;
    overflow: hidden;
  }
  [role="button"]{
    padding: 0 0.2rem;
  }
  input[type="checkbox"]{
    position: static;
    margin:0;
    top:0;
    vertical-align: middle;
  }
  td, th{
    vertical-align: middle;
  }

</style>
