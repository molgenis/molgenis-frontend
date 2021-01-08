<template>
  <div>
    <b-table v-if="values && values.items" striped hover :items="values.items" :fields="values.fields"></b-table>
    <b-spinner v-else label="Spinning"></b-spinner>
  </div>
</template>

<script>
import client from '@/lib/client'

export default {
  name: 'RefTable',
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
  },
  methods: {
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
