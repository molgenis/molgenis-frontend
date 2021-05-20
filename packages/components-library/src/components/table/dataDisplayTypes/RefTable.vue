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
          :is-shop="false"
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
import TableHeader from '@/components/table/TableHeader'
import TableRow from '@/components/table/TableRow'

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
