<template>
  <div class="d-flex flex-column">
    <div class="d-flex">
      <b-link id="selection-toggle" class="toggle-select ml-auto" @click.prevent="toggleAllColumns">
        <i>{{ toggleSelectText }}</i>
      </b-link>
    </div>
    <label v-for="column in allColumns" :key="column"
      ><input
        class="ml-2"
        type="checkbox"
        :value="column"
        @change="modifyHiddenColumns($event)"
        :checked="!hiddenColumns.includes(column)"
      />
      <span class="ml-2" v-text="column"></span>
    </label>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      selectAllState: false
    }
  },
  computed: {
    allColumns () {
      const { tableMeta } = this.$store.state
      return tableMeta ? tableMeta.attributes.map((item) => item.name) : []
    },
    hiddenColumns () {
      return this.$store.state.hiddenColumns
    },
    toggleSelectText () {
      return this.selectAllState ? 'select all' : 'deselect all'
    }
  },
  methods: {
    toggleAllColumns () {
      this.persistToRoute(this.selectAllState ? [] : this.allColumns)
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
      this.persistToRoute(newHiddenColumnList)
    },
    persistToRoute (newHiddenColumnList) {
      this.$router.push({
        name: this.$router.currentRoute.name,
        query: {
          ...this.$route.query,
          hide: newHiddenColumnList.filter((hc) => hc).join() // use filter, to remove empty remnants
        }
      })
    }
  }
}
</script>
