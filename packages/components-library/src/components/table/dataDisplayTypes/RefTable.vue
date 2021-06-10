<template>
  <div class="overflow-auto">
    <table v-if="isDataLoaded" class="table table-bordered h-100">
      <table-header :visible-columns="visibleColumns" />
      <tbody>
        <table-row
          v-for="(entity, index) in entitiesToShow"
          :id="entity[metaData.idAttribute.name].toString()"
          :key="index"
          :row-index="index"
          :table-name="metaData.id"
          :row-data="entity"
          :visible-columns="visibleColumns"
          :is-selected="false"
          :is-editable="false"
          :show-selected="false"
        />
      </tbody>
    </table>
    <div v-else>
      <b-spinner label="Spinning" class="m-3 align-middle" /> {{ $t('dataexplorer_ref_table_loading_msg') }}
    </div>
  </div>
</template>

<script>
import TableHeader from '../TableHeader'
import TableRow from '../TableRow'

export default {
  name: 'RefTable',
  components: { TableHeader, TableRow },
  props: {
    /**
     * This will show a loading indicater until set to true
     */
    isDataLoaded: {
      type: Boolean,
      required: true
    },
    /**
     * The rows of the ref table to show
     */
    entitiesToShow: {
      type: Array
    },
    /**
     * The metadata of the ref table to show
     */
    metaData: {
      type: Object
    }
  },
  computed: {
    visibleColumns () {
      return this.metaData.attributes
        .filter(a => a.visible)
        .map(a => ({ id: a.id, name: a.name, type: a.type, refEntityType: a.refEntityType }))
    }
  }
}
</script>


<docs>
  A table built for following xref and mref links
  ### Usage
  ```jsx
  const entities = [
    { id: '0', name: 'Name of the wind', author: 'Patrick Rothfuss'},
    { id: '1', name: 'The color of magic', author: 'Terry Pratchett'},
    { id: '2', name: 'Lord of the rings', author: 'J. R. R. Tolkien'},
  ]

  const metadata = {
    id: 'tablename',
    idAttribute: { name: 'id' },
    attributes: [
    { id: '0', name: 'id', type: 'string', refEntityType: '', expression: '', visible: true },
    { id: '1', name: 'name', type: 'string', refEntityType: '', expression: '', visible: true },
    { id: '2', name: 'author', type: 'string', refEntityType: '', expression: '', visible: true },
  ]}
  <RefTable
    v-bind:isDataLoaded="true"
    v-bind:entitiesToShow="entities"
    v-bind:metaData="metadata"
  >
  </RefTable>
  ```
</docs>