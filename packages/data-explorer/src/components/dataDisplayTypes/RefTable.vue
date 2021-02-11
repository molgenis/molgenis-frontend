<template>
  <div class="overflow-auto">
    <table class="table table-bordered h-100" v-if="refData">
      <table-header :visibleColumns="visibleColumns"></table-header>
      <tbody>
        <table-row v-for="(entity, index) in refData"
                   :key="index"
                   :rowIndex="index"
                   :id="getEntityId(entity)"
                   :tableName="tableId"
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
import client from '@/lib/client'
import { toMetaData } from '@/repository/metaDataResponseMapper'
import { getTableDataWithLabel } from '@/repository/dataRepository'
import { getAttributesfromMeta } from '@/repository/metaDataService'

export default {
  name: 'RefTable',
  components: {
    // Using a different way of importing to get around the Circular-References problem
    // https://vuejs.org/v2/guide/components-edge-cases.html#Circular-References-Between-Components
    TableHeader: () => import('@/components/dataView/TableHeader'),
    TableRow: () => import('@/components/dataView/TableRow')
  },
  props: {
    value: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    tableId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      loaded: false,
      refData: [],
      meta: []
    }
  },
  computed: {
    idAttribute () {
      return this.meta.attributes.filter(item => item.idAttribute === true)[0]
    },
    refLabels () {
      return this.value.replace(/\s/g, '').split(',')
    },
    visibleColumns () {
      if (this.loaded) {
        return this.meta.attributes
          .filter(a => a.visible)
          .map(a => ({ id: a.id, name: a.name, type: a.type, refEntityType: a.refEntityType }))
      }
      return []
    }
  },
  methods: {
    getEntityId (entity) {
      return entity[this.idAttribute.name].toString()
    },
    async load () {
      const metaResponse = await client.get(`/api/metadata/${this.tableId}`)
      this.meta = toMetaData(metaResponse.data)

      const attributes = getAttributesfromMeta(this.meta)

      const columnSet = new Set([...attributes])
      columnSet.add(this.meta.idAttribute.name)

      if (this.meta.labelAttribute !== undefined) {
        columnSet.add(this.meta.labelAttribute.name)
      }

      const dataResponse = await getTableDataWithLabel(this.tableId, this.meta, [...columnSet], null, { count: 0, loading: false, page: 1, size: 20 })
      this.refData = dataResponse.items.filter(item => {
        return this.refLabels.includes(item.label)
      })

      this.loaded = true
    }
  },
  created () {
    this.load()
  }
}
</script>
