<template>
    <table class="table table-bordered">
        <table-header
            v-bind:visibleColumns="columns"
            v-bind:sortColumnName="sortColumnName"
            v-bind:isSortOrderReversed="isSortOrderReversed"
            v-on:sort="sortEvent">
        </table-header>

        <table-row
            v-for="(entity, index) in entities"
            v-bind:id="getEntityId(entity)"
            v-bind:key="index"
            v-bind:row-index="index"
            v-bind:table-name="tableName"
            v-bind:row-data="entity"
            v-bind:visible-columns="columns"
            v-bind:is-selected="true"
            v-bind:is-editable="isEditable"
            v-bind:show-selected="showSelected"
            v-on:toggleSelectedItemsHandler="toggleSelectedItemsHandler"
        >
        <template v-slot:shopping-button>
            <slot name="shopping-button" />
        </template>
        </table-row>
    </table>
</template>

<script>
import TableHeader from './TableHeader'
import TableRow from './TableRow'

export default {
  name: 'Table',
  components: { TableHeader, TableRow },
  props: {
    // TABLE HEADER

    /**
     * The list of columns to display. 
     * type: [ { name: 'name of column' }, ... ]
     */
    columns: {
      type: Array,
      required: true
    },
    /**
     * The current column that is being used for sorting
     */
    sortColumnName: {
      type: String,
      required: false,
      default: () => null
    },
    /**
     * Sorting the current column but in reversed order
     */
    isSortOrderReversed: {
      type: Boolean,
      required: false,
      default: () => false
    },

    // TABLE ROW
    entities: {
      type: Array,
      required: true
    },

    idAttribute: {
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
  },
  methods:{
    getEntityId (entity) {
      return entity[this.idAttribute].toString()
    },
    sortEvent(name) {
      /**
       * Emits the name of to column the user wishes to sort
       * @property {String} sort - name of column to sort
       * @event sort
       */
      this.$emit('sort', name)
    },
    toggleSelectedItemsHandler (id) {
      /**
        * Emits the id of to column of the user selects a new colunm
        * @property {String} id - id of column selected
        * @event toggleSelectedItemsHandler
        */
      this.$emit('toggleSelectedItemsHandler', id)
    }
  }
}
</script>

<style scoped>
</style>

<docs>
  Create a table using `TableHeader` and `TableRow` in one go, you will have less freedom but it easier to use.

  ### Full table
  ```jsx
  const ref = [
    { id: '0', label: 'Hello' },
    { id: '1', label: 'World' }
  ]

  const entities = [
    { id: '0', name: 'Jan', born: '1/1/1990', job: 'Welder', email: 'test@weld.test', mref:ref },
    { id: '1', name: 'Klaas', born: '12-5-1980', job: '<h1>Evil overlord</h1>', email: 'test@evil.test', mref:ref },
    { id: '2', name: 'Piet', born: '1985 6 8', job: 'Shopkeeper', email: 'test@shop.test', mref:ref }
  ]

  const visibleColumns = [
    { id: '0', name: 'id', type: 'string', refEntityType: '', expression: '' },
    { id: '1', name: 'name', type: 'string', refEntityType: '', expression: '' },
    { id: '2', name: 'born', type: 'date', refEntityType: '', expression: '' },
    { id: '3', name: 'job', type: 'html', refEntityType: '', expression: '' },
    { id: '4', name: 'email', type: 'email', refEntityType: '', expression: '' },
    { id: '5', name: 'mref', type: 'mref', refEntityType: '', expression: '' },
  ]

  var sorting = "name"
  var isReversed = false

  var iseditable = true
  var showSelected = false
  var lastSelectedRow = 'none'

  <Table
    v-bind:columns="visibleColumns"
    v-bind:sortColumnName="sorting"
    v-bind:isSortOrderReversed="isReversed"
    v-on:sort="(newValue) => {
    isReversed =  ( sorting === newValue && isReversed == false )
    sorting = newValue
    }"
    v-bind:entities="entities"
    idAttribute="id"
    table-name="MyEntity"
    v-bind:is-editable="iseditable"
    v-bind:show-selected="showSelected"
    v-on:toggleSelectedItemsHandler="(id) => { lastSelectedRow = id }"
  >
    <template v-slot:shopping-button>
      <button class="btn btn-primary"> Shopping-button slot </button>
    </template>
  </Table>
  <hr/>
  <strong>Helpers:</strong>
  <div>lastSelectedRow: {{lastSelectedRow}}</div>
  <div><button v-on:click="iseditable=!iseditable">toggle iseditable state</button> {{iseditable}}</div>
  <div><button v-on:click="showSelected=!showSelected">toggle showSelected state</button> {{showSelected}}</div>
  ```
</docs>