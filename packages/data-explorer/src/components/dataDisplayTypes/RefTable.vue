<template>
  <div class="overflow-auto">
    <table class="table table-bordered h-100" v-if="isDataLoaded">
      <table-header :visibleColumns="visibleColumns"></table-header>
      <tbody>
        <table-row v-for="(entity, index) in entitiesToShow"
                   :key="index"
                   :rowIndex="index"
                   :id="entity[metaData.idAttribute.name].toString()"
                   :tableName="metaData.idAttribute.name"
                   :rowData="entity"
                   :visibleColumns="visibleColumns"
                   :isSelected="false"
                   :isShop="false"
                   :isEditable="false"
                   :showSelected="false"
        ></table-row>
      </tbody>
    </table>
    <div v-else><b-spinner label="Spinning" class="m-3 align-middle"></b-spinner> {{ 'dataexplorer_ref_table_loading_msg' | i18n }} </div>
  </div>
</template>

<script>
import TableHeader from '@/components/dataView/TableHeader'
import TableRow from '@/components/dataView/TableRow'

export default {
  name: 'RefTable',
  components: { TableHeader, TableRow },
  props: {
    isDataLoaded: {
      type: Boolean,
      required: true
    },
    entitiesToShow: {
      type: Array
    },
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
