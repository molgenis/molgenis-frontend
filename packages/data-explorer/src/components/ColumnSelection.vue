<template>
  <div class="d-flex flex-column">
    <div class="d-flex">
      <b-link
        id="selection-toggle"
        class="toggle-select ml-auto"
        @click.prevent="toggleAllColumns"
      >
        <i>{{ toggleSelectText }}</i>
      </b-link>
    </div>
    <label
      v-for="column in allColumns" :key="column"
    ><input
       class="ml-2"
       type="checkbox"
       :value="column"
       :checked="!hiddenColumns.includes(column)"
       @change="modifyHiddenColumns($event)"
     >
      <span class="ml-2" v-text="column" />
    </label>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data: function () {
    return {
      selectAllState: false
    }
  },
  computed: {
    allColumns () {
      const { tableMeta } = this.$store.state.explorer
      return tableMeta ? tableMeta.attributes.map((item) => item.name) : []
    },
    hiddenColumns () {
      return this.$store.state.explorer.hiddenColumns
    },
    toggleSelectText () {
      return this.selectAllState ? 'select all' : 'deselect all'
    }
  },
  methods: {
    ...mapMutations('explorer', [ 'persistToRoute' ]),
    toggleAllColumns () {
      const columnsToHide = this.selectAllState ? [] : this.allColumns
      this.persistToRoute({
        router: this.$router,
        query: { hide: columnsToHide.join() }
      })
      this.selectAllState = !this.selectAllState
    },
    modifyHiddenColumns (event) {
      const { checked, value } = event.target

      // check if any columns are hidden, else start with an empty array
      let newHiddenColumnList = this.hiddenColumns.length
        ? this.hiddenColumns
        : []

      // if checkbox is re-checked, remove from array
      if (checked) {
        newHiddenColumnList.splice(this.hiddenColumns.indexOf(value), 1)
      } else {
        newHiddenColumnList.push(value)
      }

      this.persistToRoute({
        router: this.$router,
        query: { hide: newHiddenColumnList.join() }
      })
    }
  }
}
</script>
