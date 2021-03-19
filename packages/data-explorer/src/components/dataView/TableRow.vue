<template>
  <tr :class="{'row-selected': isSelected}">
    <th v-if="showSelected" scope="col">
      <shopping-button :id="id" :is-selected="isSelected" />
    </th>
    <th
      v-else :id="'table-row-'+id"
      class="text-nowrap"
      scope="col"
    >
      <input
        v-if="isEditable" class="form-check-input"
        type="checkbox"
        :checked="isSelected" :value="id"
        @click="$emit('toggleSelectedItemsHandler', id)"
      >
      <router-link
        v-if="isEditable"
        v-b-tooltip.hover.bottom
        :title="$t('dataexplorer_row_action_edit_btn_tooltip')"
        class="btn btn-sm text-secondary pl-2"
        role="button"
        :to="{ name: 'de-edit', params: { entity: tableName, dataRowId: id}, query: {}}"
      >
        <font-awesome-icon icon="edit" />
      </router-link>
      <router-link
        v-b-tooltip.hover.bottom class="btn btn-sm text-secondary"
        role="button"
        :to="{ name: 'entity-detail', params: { entityType: tableName, entity: id}}"
      >
        <font-awesome-icon icon="search" />
      </router-link>
      <button
        v-if="isEditable"
        v-b-tooltip.hover.bottom
        :title="$t('dataexplorer_row_action_delete_btn_tooltip')"
        class="btn btn-sm text-secondary"
        role="button"
        @click="$eventBus.$emit('delete-item', id)"
      >
        <font-awesome-icon icon="trash" />
      </button>
    </th>
    <td v-for="(column, index) in visibleColumns" :key="index" class="mg-data-column">
      <DataDisplayCell
        v-if="typeof getColumnValue(column.name) != 'undefined'" :value="getColumnValue(column.name)"
        :metadata="column"
        :row-index="rowIndex"
      />
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
    getColumnValue (name) {
      if (name in this.rowData && this.rowData[name] !== undefined) {
        return this.rowData[name]
      }
    }
  }
}
</script>

<style scoped>
  .row-selected {
    background-color: var(--tertiary);
  }
  /**
   * Make actions column stick
   */
  th {
    background-color: var(--light);
    border-right: 1px var(--border) solid;
    left: 0;
    position: sticky; /* for Safari */
    position: sticky;
    text-align: center;
  }
  /**
   * Fix borders in the first column
   */
  th::after,
  th::before {
    content: '';
    height: 100%;
    position: absolute;
    top: 0;
  }

  th::before {
    border-left: 1px solid var(--border);
    left: -1px;
  }

  th::after {
    border-right: 1px solid var(--border);
    right: -1px;
  }

  /**
  * Style row actions
  */
  .mg-data-column {
    max-width: 32rem;
    overflow: hidden;
  }

  [role='button'] {
    padding: 0 0.2rem;
  }

  input[type='checkbox'] {
    margin: 0;
    position: static;
    top: 0;
    vertical-align: middle;
  }

  td,
  th {
    vertical-align: middle;
  }

</style>
