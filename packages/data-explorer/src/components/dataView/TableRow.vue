<template>
  <tr>
    <th v-if="isShop"><shopping-button :isSelected="isSelected" :id="id"></shopping-button></th>
    <th v-else class="text-nowrap">
      <input class="form-check-input" type="checkbox" v-model="isSelected" :value="id" >
      <span v-if="isEditable" class="pl-3 btn-group align-middle" role="group" aria-label="row actions">
        <button
          class="btn btn-sm btn-link"
          role="button"
          @click="$eventBus.$emit('delete-item', id)"
          >
          <font-awesome-icon icon="trash"></font-awesome-icon>
        </button>
        <a
          class="btn btn-sm btn-link"
          role="button"
          :href="'/plugin/data-row-edit/' + tableName + '/' + id">
          <font-awesome-icon icon="edit"></font-awesome-icon>
        </a>
        <a
          class="btn btn-sm btn-link"
          role="button"
          :href="`/menu/main/dataexplorer/details/${tableName}/${id}`">
          <font-awesome-icon icon="search"></font-awesome-icon>
        </a>
      </span>
    </th>
    <td v-for="(column, index) in visibleColumns" :key="index" class="text-nowrap text-truncate mg-data-column">
      {{rowData[column.name]}}
    </td>
  </tr>
</template>

<style scoped>
  /**
   * Make actions column stick
   */
  th {
    position: -webkit-sticky; /* for Safari */
    position: sticky;
    left: 0;
    background: #f7f7f7;
    border-right: 1px #dee2e6 solid;
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
    border-left: 1px solid #dee2e6;
  }
  th:after {
    right: -1px;
    border-right: 1px solid #dee2e6;
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

<script>
import ShoppingButton from '../utils/ShoppingButton'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faEdit)
export default {
  name: 'TableRow',
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
    isShop: {
      type: Boolean,
      required: false,
      default: () => false
    },
    isEditable: {
      type: Boolean,
      default: () => false
    }
  },
  components: { ShoppingButton, FontAwesomeIcon }
}
</script>
