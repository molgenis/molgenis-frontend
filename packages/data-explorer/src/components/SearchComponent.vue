<template>
  <div class="input-group">
    <form class="form-group w-100" @submit.prevent="handleSearchAction">
      <div class="input-group">
      <input
        type="search"
        v-model="searchText"
        class="form-control"
        placeholder="Search"
        aria-label="Search data"
        aria-describedby="mg-data-explorer-search"
      />
      <div class="input-group-append">
        <button
          class="btn btn-outline-secondary"
          type="submit"
          id="mg-data-explorer-search"
        >
          <font-awesome-icon icon="search"></font-awesome-icon>
        </button>
      </div>
      </div>
    </form>
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSearch)

export default {
  name: 'SearchComponent',
  components: { FontAwesomeIcon },
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
  methods: {
    handleSearchAction () {
      this.$emit('input', this.searchText)
    }
  },
  watch: {
    value: {
      handler: function (val, oldVal) {
        if (val === '') {
          this.searchText = ''
        }
      },
      immediate: true
    },
    searchText: {
      // Add handler to support html5 clear search action
      handler: function (val, oldVal) {
        if (val === '') {
          this.handleSearchAction()
        }
      },
      immediate: true
    }
  }
}
</script>
