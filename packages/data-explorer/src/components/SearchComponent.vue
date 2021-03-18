<template>
  <div class="input-group">
    <form class="w-100" @submit.prevent="handleSearchAction">
      <div class="input-group">
        <input
          v-model="searchText"
          type="search"
          class="form-control"
          :placeholder="$t('dataexplorer_search_btn_tooltip')"
          aria-label="Search data"
          aria-describedby="mg-data-explorer-search"
        >
        <div class="input-group-append">
          <button
            id="mg-data-explorer-search"
            v-b-tooltip.hover.bottom
            class="btn btn-outline-secondary"
            type="submit"
            :title="$t('dataexplorer_search_input_tooltip')"
          >
            <font-awesome-icon icon="search" />
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'SearchComponent',
  props: {
    value: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      searchText: this.value
    }
  },
  watch: {
    value: {
      handler: function (val, oldVal) {
        if (val === '') {
          this.searchText = ''
        }
      }
    },
    searchText: {
      // Add handler to support html5 clear search action
      handler: function (val, oldVal) {
        if (val === '') {
          this.handleSearchAction()
        }
      }
    }
  },
  methods: {
    handleSearchAction () {
      this.$emit('input', this.searchText)
    }
  }
}
</script>
