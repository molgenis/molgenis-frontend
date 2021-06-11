<template>
  <Table
      v-bind:columns="getColumns"
      v-bind:value="value"
      v-bind:sortColumnName="sortColumnName"
      v-bind:isSortOrderReversed="isSortOrderReversed"
      v-bind:entities="getEntities"
      v-bind:idAttribute="getIdAttribute"
      v-bind:table-name="getTableName"
      v-bind:is-selectable="isSelectable"
      v-on:sort="sortEvent"
      v-on:input="inputEvent"
      v-on:toggleSelectedItemsHandler="toggleSelectedItemsHandler"
    >
    <template v-slot:edit-buttons>
      <slot name="edit-buttons" />
    </template>
  </Table>
</template>

<script>
import Table from './Table'

export default {
  name: 'ApiTable',
  components: { Table },
  props: {
    /**
     * v-model interface, expects a array with ids for selected items of the table ["1", "5"]
     */
    value: {
      type: Array,
      required: false,
      default: () => []
    },
    /**
     * molgenis v3 data api request
     */
    data:{
      type: Object,
      required: true, 
    },
    /**
     * molgenis v3 metadata api request
     */
    metadata:{
      type: Object,
      required: true, 
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
    /**
     * De we wish to be able to select rows?
     */
    isSelectable: {
      type: Boolean,
      default: () => false
    }
  },
  computed:{
    getColumns(){
      if(this.metadata && this.metadata.data && this.metadata.data.attributes){
        return this.metadata.data.attributes.items.map(item => item.data)
      } else {
        return []
      }
    },
    getTableName(){
      if(this.metadata && this.metadata.data){
        return this.metadata.data.id
      } else {
        return ""
      }
    },
    getIdAttribute(){
      if(this.metadata && this.metadata.data && this.metadata.data.attributes){
        return this.metadata.data.attributes.items.find(item => item.data.idAttribute === true).data.name
      } else {
        return "id"
      }
    },
    getEntities(){
      if(this.data && this.data.items){
        return this.data.items.map(item => item.data)
      } else {
        return []
      }
    }
  },
  methods:{
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
    },
    inputEvent (selection) {
      /**
        * Emits changed selection
        * @property {String} id - id of column selected
        * @event input
        */
      this.$emit('input', selection)
    }
  }
}
</script>

<style scoped>
</style>

<docs>
  Create a table that can display untransformed Molgenis API v3 requests
  ### Table
  ```jsx
  // api/data/it_emx_datatypes_Person?page=0&size=20&expand=&filter=id,age,driverslicence
  var data = {"links":{"self":"https://master.dev.molgenis.org/api/data/it_emx_datatypes_Person?page=0&size=20&expand=&filter=id,age,driverslicence"},"items":[{"links":{"self":"https://master.dev.molgenis.org/api/data/it_emx_datatypes_Person/aaaac6pqpqccyxxbuikcp2qaae"},"data":{"id":"aaaac6pqpqccyxxbuikcp2qaae","age":13}},{"links":{"self":"https://master.dev.molgenis.org/api/data/it_emx_datatypes_Person/aaaac6pwhn624xxbuikcp2qaai"},"data":{"id":"aaaac6pwhn624xxbuikcp2qaai","age":123,"driverslicence":true}},{"links":{"self":"https://master.dev.molgenis.org/api/data/it_emx_datatypes_Person/aaaac6pwhoye2xxbuikcp2qaae"},"data":{"id":"aaaac6pwhoye2xxbuikcp2qaae","age":67,"driverslicence":false}}],"page":{"size":20,"totalElements":3,"totalPages":1,"number":0}}
  // api/metadata/it_emx_datatypes_Person?flattenAttributes=true
  var metadata = {"links":{"self":"https://master.dev.molgenis.org/api/metadata/it_emx_datatypes_Person"},"data":{"id":"it_emx_datatypes_Person","label":"Person","description":"MOLGENIS Data types test person","package":{"links":{"self":"https://master.dev.molgenis.org/api/data/sys_md_Package/it_emx_datatypes"}},"attributes":{"links":{"self":"https://master.dev.molgenis.org/api/metadata/it_emx_datatypes_Person/attributes"},"items":[{"link":{"self":"https://master.dev.molgenis.org/api/metadata/it_emx_datatypes_Person/attributes/aaaac6nx4q5s7yxrkjj365yadm"},"data":{"id":"aaaac6nx4q5s7yxrkjj365yadm","label":"id label","description":"Persion id attribute","name":"id","sequenceNr":0,"type":"string","maxLength":255,"idAttribute":true,"labelAttribute":true,"lookupAttributeIndex":0,"nullable":false,"auto":true,"visible":true,"unique":true,"readOnly":true,"aggregatable":false}},{"link":{"self":"https://master.dev.molgenis.org/api/metadata/it_emx_datatypes_Person/attributes/aaaac6nx4q5s7yxrkjj365yadq"},"data":{"id":"aaaac6nx4q5s7yxrkjj365yadq","label":"age label","description":"Person age attribute","name":"age","sequenceNr":1,"type":"int","idAttribute":false,"labelAttribute":false,"nullable":true,"auto":false,"visible":true,"unique":false,"readOnly":false,"aggregatable":false}},{"link":{"self":"https://master.dev.molgenis.org/api/metadata/it_emx_datatypes_Person/attributes/aaaac6nx4q5s7yxrkjj365yadu"},"data":{"id":"aaaac6nx4q5s7yxrkjj365yadu","label":"driverslicence label","description":"Person drivers licence attribute","name":"driverslicence","sequenceNr":2,"type":"bool","idAttribute":false,"labelAttribute":false,"nullable":true,"auto":false,"visible":true,"unique":false,"readOnly":false,"aggregatable":false,"visibleExpression":"$('age').ge(18).value()","validationExpression":"$('driverslicence').isNull().not().or($('age').isNull()).or($('age').lt(18)).value()"}}]},"abstract":false,"indexingDepth":1}}
  var sorting = "name"
  var isReversed = false
  var isselectable = true
  var lastSelectedRow = 'none'
  var selection = ["1"]

  <ApiTable
    v-model="selection"
    v-bind:sortColumnName="sorting"
    v-bind:isSortOrderReversed="isReversed"
    v-bind:is-selectable="isselectable"
    v-bind:data="data"
    v-bind:metadata="metadata"
    v-on:toggleSelectedItemsHandler="(id) => { lastSelectedRow = id }"
    v-on:sort="(newValue) => {
    isReversed =  ( sorting === newValue && isReversed == false )
    sorting = newValue
    }"
  >
    <template v-slot:edit-buttons>
      <button class="btn btn-sm btn-primary"> edit </button>
    </template>
  </ApiTable>
  <hr/>
  <strong>Helpers:</strong>
  <div>lastSelectedRow: {{lastSelectedRow}}</div>
  <div>selection: {{selection}}</div>
  <div><button v-on:click="isselectable=!isselectable">toggle isselectable state</button> {{isselectable}}</div>
  ```
</docs>