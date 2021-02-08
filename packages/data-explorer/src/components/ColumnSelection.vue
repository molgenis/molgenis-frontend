<template>
  <div class="d-flex flex-column">
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
  computed: {
    allColumns () {
      return this.$store.state.tableData
        ? [
          ...new Set(
            this.$store.state.tableData.items
              .map((item) => Object.keys(item))
              .reduce((prev, current) => prev.concat(current))
          )
        ]
        : []
    },
    hiddenColumns () {
      return this.$store.state.hiddenColumns
    }
  },
  methods: {
    modifyHiddenColumns (event) {
      const { checked, value } = event.target
      // check if any columns are hidden, else start with an empty array
      let newHiddenColumnList = this.hiddenColumns.length
        ? this.hiddenColumns
        : []

      // if checkbox is re-checked, remove from array
      if (checked) {
        newHiddenColumnList.splice(this.hiddenColumns.indexOf(value))
      } else {
        newHiddenColumnList.push(value)
      }

      this.$router.push({
        name: this.$router.currentRoute.name,
        query: { ...this.$route.query, hide: newHiddenColumnList.filter(hc => hc).join() } // use filter, to remove empty remnants
      })
    }
  }
}
</script>
