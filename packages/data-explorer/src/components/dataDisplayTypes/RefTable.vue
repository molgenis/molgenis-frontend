<template>
  <div>
    <table class="table table-bordered h-100" v-if="entitiesToShow.length">
      <table-header :visibleColumns="visibleColumns"></table-header>
      <tbody>
        <table-row v-for="(entity, index) in entitiesToShow"
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
    <div v-else><b-spinner label="Spinning" class="m-3 align-middle"></b-spinner> Requesting data </div>
  </div>
</template>

<script>
import client from '@/lib/client'

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
      data: {},
      meta: {}
    }
  },
  computed: {
    idAttribute () {
      return this.meta.data.data.attributes.items.filter(item => item.data.idAttribute === true)[0].data
    },
    visibleColumns () {
      if (this.loaded) {
        console.log('visibleColumns', this.meta)
        return this.meta.data.data.attributes.items
          .filter(a => a.data.visible)
          .map(a => ({ id: a.data.id, name: a.data.name, type: a.data.type, refEntityType: a.data.refEntityType }))
      }
      return []
    },
    entitiesToShow () {
      if (this.loaded) {
        return this.data.data.items.map(item => item.data)
      } else return []
    }
  },
  methods: {
    getEntityId (entity) {
      return entity[this.idAttribute.name].toString()
    },
    async load () {
      this.meta = await client.get(`/api/metadata/${this.tableId}`)
      this.data = await client.get(`/api/data/${this.tableId}`)
      this.loaded = true
    }
  },
  created () {
    this.load()
  }
}
</script>
