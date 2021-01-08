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

<!--    <b-table v-if="values && values.items" striped hover :items="values.items" :fields="values.fields"></b-table>
    <b-spinner v-else label="Spinning"></b-spinner> -->
  </div>
</template>

<script>
import client from '@/lib/client'
import TableHeader from '@/components/dataView/TableHeader'
import TableRow from '@/components/dataView/TableRow'

export default {
  name: 'RefTable',
  components: { TableRow, TableHeader },
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
          .filter(a => a.visible)
          .map(a => ({ id: a.id, name: a.name, type: a.type, refEntityType: a.refEntityType }))
      }
      return []
    },
    entitiesToShow () {
      // return this.tableData.items.filter((entity) => this.selectedItemIds.includes(this.getEntityId(entity)))
      if (this.loaded) {
        console.log(this.data.data.items)
        return this.data.data.items.map(item => item.data)
      } else return []
    }
    /*
    values () {
      if (this.loaded) {
        let rows = []
        let columns = []
        const toFilter = this.value.split(', ')
        // const idAttribute = this.meta.data.data.attributes.items.filter(item => item.data.idAttribute === true)[0].data.name
        const labelAttribute = this.meta.data.data.attributes.items.filter(item => item.data.labelAttribute === true)[0].data.name
        const selection = this.data.data.items.filter(item => toFilter.includes(item.data[labelAttribute]))

        columns = this.meta.data.data.attributes.items.map(item => item.data.name)
        if (Array.isArray(selection) && selection.length > 0) {
          rows = selection.map(item => item.data)
        }
        return { fields: columns, items: rows }
      }
      return null
    }
       */
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
