<template>
  <tr :class="{'row-selected': isSelected}">
    <th v-if="showSelected" scope="col">
      <slot name="shopping-button" />
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
        @click="toggleSelectedItemsHandler(id)"
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
        :to="{ name: 'entity-detail', params: { entityType: tableName, entity: id}, query: route.query}"
      >
        <font-awesome-icon icon="search" />
      </router-link>
      <button
        v-if="isEditable"
        v-b-tooltip.hover.bottom
        :title="$t('dataexplorer_row_action_delete_btn_tooltip')"
        class="btn btn-sm text-secondary"
        role="button"
        @click="deleteItem(id)"
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
import DataDisplayCell from '@/components/table/dataDisplayTypes/DataDisplayCell'

export default {
  name: 'TableRow',
  components: { DataDisplayCell },
  props: {
    /**
     * Add the molgenis id, used for row selections and mutations
     * Note: check the metadata to make sure you have the correct id attribute 
     */
    id: {
      type: String,
      required: true
    },
    /**
     * Name of the current table
     */
    tableName: {
      type: String,
      required: true
    },
    /**
     * Row of table data of type: DataApiResponseItem
     * See: https://github.com/molgenis/molgenis-frontend/blob/master/packages/data-explorer/src/types/ApiResponse.ts for type definition
     */
    rowData: {
      type: Object,
      required: true
    },
    /**
     * Information about all visable columns of type:
     * [ { id, name, type, refEntityType, expression } ]
     */
    visibleColumns: {
      type: Array,
      required: true
    },
    /**
     * is this current row selected?
     */
    isSelected: {
      type: Boolean,
      required: false,
      default: () => false
    },
    /**
     * De we have edit rights on this table?
     */
    isEditable: {
      type: Boolean,
      default: () => false
    },
    /**
     * will show shopping cart button template if true. Will also hide edit/delete row opperations 
     */
    showSelected: {
      type: Boolean,
      required: true
    },
    rowIndex: {
      type: Number,
      required: true
    },
    /**
     * Please provide acces to the $route object
     */
    route: {
      type: Object,
      required: true
    }
  },
  methods: {
    getColumnValue (name) {
      if (name in this.rowData && this.rowData[name] !== undefined) {
        return this.rowData[name]
      }
    },
    toggleSelectedItemsHandler (id) {
      /**
        * Emits the id of to column of the user selects a new colunm
        * @property {String} id - id of column selected
        * @event toggleSelectedItemsHandler
        */
      this.$emit('toggleSelectedItemsHandler', id)
    },
    deleteItem (id) {
      this.$eventBus.$emit('delete-item', id)
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

<docs>
  Builds a header for a table. The column will have sorting options

  Please note that the delete item event is routed via event bus. You can catch the event in any component via a call like this:
  `Vue.$eventBus.$on('delete-item', (data) => {})`

  ### Usage
  ```jsx
  const entities = [
    { id: '0', name: 'Jan', age: '23', job: 'Welder', email: 'test@weld.test' },
    { id: '1', name: 'Klaas', age: '50', job: '<h1>Evil overlord</h1>', email: 'test@evil.test' },
    { id: '2', name: 'Piet', age: '32', job: 'Shopkeeper', email: 'test@shop.test' }
  ]

  const visibleColumns = [
    { id: '0', name: 'id', type: 'string', refEntityType: '', expression: '' },
    { id: '1', name: 'name', type: 'string', refEntityType: '', expression: '' },
    { id: '2', name: 'age', type: 'date', refEntityType: '', expression: '' },
    { id: '3', name: 'job', type: 'html', refEntityType: '', expression: '' },
    { id: '4', name: 'email', type: 'email', refEntityType: '', expression: '' },
  ]

  function getEntityId (entity) {
      return entity['id'].toString()
  }
  function i18n(string) {
    return string
  }
  
  var iseditable = true
  var showSelected = false
  var lastSelectedRow = 'none'
  <table class="table table-bordered">
    <TableRow
        v-for="(entity, index) in entities"
        v-bind:id="entity.id"
        v-bind:key="index"
        v-bind:row-index="index"
        table-name="MyEntity"
        v-bind:row-data="entity"
        v-bind:visible-columns="visibleColumns"
        v-bind:is-selected="false"
        v-bind:is-editable="iseditable"
        v-bind:show-selected="showSelected"
        v-bind:route="{ query: '' }" 
        v-on:toggleSelectedItemsHandler="(id) => { lastSelectedRow = id }"
    >
      <template v-slot:shopping-button>
        <button class="btn btn-primary"> Shopping-button slot </button>
      </template>
    </TableRow>
  </table>
  <hr/>
  <strong>Helpers:</strong>
  <div>lastSelectedRow: {{lastSelectedRow}}</div>
  <div><button v-on:click="iseditable=!iseditable">toggle iseditable state</button> {{iseditable}}</div>
  <div><button v-on:click="showSelected=!showSelected">toggle showSelected state</button> {{showSelected}}</div>
  ```
</docs>