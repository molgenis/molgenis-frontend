<template>
  <div class="input-group">
    <form class="w-100" @submit.prevent="handleSearchAction">
      <div class="input-group">
      <input
        type="search"
        v-model="searchText"
        class="form-control"
        :placeholder="$t('dataexplorer_search_btn_tooltip')"
        aria-label="Search data"
        aria-describedby="mg-data-explorer-search"
      />
      <div class="input-group-append">
        <button
          class="btn btn-outline-secondary"
          type="submit"
          id="mg-data-explorer-search"
          v-b-tooltip.hover.bottom
          :title="$t('dataexplorer_search_input_tooltip')"
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
  }
}
</script>
