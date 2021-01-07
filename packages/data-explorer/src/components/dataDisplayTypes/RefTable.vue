<template>
  <div>
    {{values}}
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
        /*
        const idAttribute = this.meta.data.data.attributes.items.filter(item => item.data.idAttribute === true)[0].data.name
        console.log(idAttribute)
        console.log(this.data.data)
        console.log(this.data.data.items.filter(item => item[idAttribute] === value))
           */
        return null
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
