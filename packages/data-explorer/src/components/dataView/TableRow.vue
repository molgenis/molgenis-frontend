<template>
  <tr>
    <td v-if="isShop"><shopping-button :isSelected="isSelected" :id="id"></shopping-button></td>
    <td v-else>
      <div v-if="isEditable" class="btn-group" role="group" aria-label="row actions">
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
      </div>
    </td>
    <td v-for="(column, index) in visibleColumns" :key="index">
      {{rowData[column.name]}}
    </td>
  </tr>
</template>

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
