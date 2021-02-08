<template>
    <div class="d-flex flex-column">
      <label
        v-for="column in allColumns"
        :key="column"
        ><input
          class="ml-2"
          type="checkbox"
          :value="column"
          checked
        />
        <span class="ml-2" v-text="column"></span>
      </label>
    </div>
</template>

<script>
export default {
  computed: {
    allColumns () {
      return this.$store.state.tableData ? [
        ...new Set(
          this.$store.state.tableData.items
            .map((item) => Object.keys(item))
            .reduce((prev, current) => prev.concat(current))
        )
      ] : []
    }
  }
}
</script>
