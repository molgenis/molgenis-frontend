<template>
<nav class="c-pagination">

  <div v-if="localValue.count > localValue.size" class="btn-group mb-2 mr-3">
    <button :class="css" class="btn btn-outline-primary"
      :disabled="localValue.page <= 1"
      @click="navigate(1)">
      «
    </button>

    <button :class="css" class="t-page-prev btn btn-outline-primary"
      :disabled="localValue.page <= 1"
      @click="navigate(localValue.page - 1)">
      ‹
    </button>

    <button
      v-for="pageNumber in pageNumbers" :key="pageNumber"
      class="btn btn-outline-primary"
      :class="{'active': pageNumber === localValue.page, ...css}"
      @click="navigate(pageNumber)">
      {{pageNumber}}
    </button>

    <button
      :class="css" class="t-page-next btn btn-outline-primary"
      :disabled="localValue.page >= pageCount"
      @click="navigate(localValue.page + 1)">
      ›
    </button>

    <button
      :class="css" class="btn btn-outline-primary"
      :disabled="localValue.page >= pageCount"
      @click="navigate(pageCount)">
      »
    </button>
  </div>

  <div class="controls mb-2">
    <div class="item-count form-inline mr-2">
      <span>{{navigationText}}</span>
    </div>

    <div class="form-check form-check-inline">
      <label class="form-check-label mr-2" for="page-size">{{i18n['per page']}}</label>
      <select class="form-control" id="page-size" v-model="localValue.size">
        <option v-for="pageSize of pageSizes" :value="pageSize" :key="pageSize">{{pageSize}}</option>
      </select>
    </div>
  </div>

</nav>
</template>

<script>
export default {
  async created () {
    this.localValue = { ...this.localValue, ...this.value }

    // Life-cycle hook for router-less pagination.
    if (!this.useRouter) {
      // Allow Vue instance listeners to initialize in tests.

      // Pagination state is leading for the initial page,
      // in case no router is being use.
      this.fetchData(this.localValue.page)
    }
  },
  computed: {
    navigationText () {
      if (this.pageCount <= 1) {
        return `${this.i18n.items}: ${this.localValue.count}`
      } else {
        return `${this.i18n.page} ${this.localValue.page}/${this.pageCount} (${this.localValue.count} ${this.i18n.items})`
      }
    },
    pageCount () {
      if (!this.localValue.count) { return 0 }
      return Math.ceil(this.localValue.count / this.localValue.size)
    },
    pageNumbers () {
      const pages = []
      for (let i = this.pageRange.left; i <= this.pageRange.right; i++) { pages.push(i) }
      return pages
    },
    /**
     * Calculations that determine which pages must be rendered.
     * See the computed `pageNumbers` method for its usage.
     */
    pageRange () {
      const edge = Math.floor(this.visiblePages / 2)
      const start = this.localValue.page <= edge
      const end = this.localValue.page >= (Math.floor(this.localValue.count / this.localValue.size) - edge)

      let left, right

      if (start) {
        left = 1
        right = (this.pageCount > this.visiblePages) ? this.visiblePages : this.pageCount
      } else if (end) {
        left = (this.pageCount - this.visiblePages) > 0 ? (this.pageCount - this.visiblePages + 1) : 1
        right = this.pageCount
      } else {
        // Must be within the mid-range.
        left = this.localValue.page - edge
        right = this.localValue.page + edge
      }

      return { left, right }
    }
  },
  data: function () {
    return {
      localValue: { size: 20, page: 1, loading: false, count: 0 }
    }
  },
  methods: {
    async fetchData (page) {
      // Omit the Pagination method when you're using multiple
      // Pagination components with the same data source.
      if (!this.fetchItems) { return }

      this.updateValue({ loading: true, page })
      await this.fetchItems()
      this.updateValue({ loading: false })
    },
    navigate (page) {
      if (!this.useRouter) { return this.fetchData(page) }

      if (this.$route.query.page) {
        if (
          parseInt(this.$route.query.page, 10) !== page ||
          parseInt(this.$route.query.size, 10) !== this.value.size
        ) {
          // (!) Merge with existing query; e.g. bookmarks
          this.$router.push({
            path: this.$route.path,
            query: { ...this.$route.query, page, size: this.value.size }
          })
        }
      } else {
        this.$router.replace({
          path: this.$route.path,
          query: { ...this.$route.query, page, size: this.value.size }
        })
      }
    },
    updateValue (value) {
      this.localValue = { ...this.localValue, ...this.value, ...value }
      this.$emit('input', { ...this.value, ...this.localValue, ...value })
    }
  },
  name: 'Pagination',
  props: {
    /**
     * Extra css classes for the pagination buttons.
     */
    css: {
      type: Object,
      required: false,
      default: () => ({})
    },
    /**
     * Async method to retrieve items with.
     * @returns {Object} {count: Number}
     */
    fetchItems: {
      type: Function,
      required: false
    },
    /**
     * Translatable texts.
     */
    i18n: {
      type: Object,
      default: () => ({
        page: 'page',
        'per page': 'per page',
        items: 'items'
      })
    },
    /**
     * Select choices for the page size.
     */
    pageSizes: {
      type: Array,
      required: false,
      default: () => [10, 20, 50]
    },
    /**
     * Optional vue-router integration.
     */
    useRouter: {
      type: Boolean,
      default: () => true
    },
    /**
     * Reflects the pagination state.
     * @model
     */
    value: {
      type: Object,
      required: true
    },
    /**
     * Number of navigational page buttons; this must be uneven.
     */
    visiblePages: {
      type: Number,
      default: () => 7,
      validator (value) {
        return (value % 2 !== 0)
      }
    }
  },
  watch: {
    '$route.query': {
      handler: function (query) {
        if (!this.fetchItems || !this.useRouter) { return }

        if (query.page) {
          this.fetchData(parseInt(query.page, 10))
        } else {
          // Defaults by setting the pagination to the first page.
          this.navigate(1)
        }
      },
      deep: true,
      immediate: true
    },
    /**
     * Sync the local state when the external state changes.
     */
    value: {
      handler (value) { this.localValue = value },
      deep: true
    },
    /**
     * A separate listener is needed here, because its
     * not feasible to detect size property changes from
     * the deep value watcher (See https://vuejs.org/v2/api/#vm-watch)
     */
    'value.size' (newSize, oldSize) {
      // Only navigate when the paginator is not in passive mode.
      if (this.fetchItems) {
        let currentPosition = this.localValue.page * oldSize
        // Keep in mind that with 201 items, the current page may be 3 when
        // showing 100 items per page. When switching back to 50 items per
        // page, there are only 5 pages left. Make sure the currentPosition
        // never exceeds the actual count.
        if (currentPosition > this.localValue.count) {
          currentPosition = this.localValue.count
        }

        const currentNewPage = Math.ceil(currentPosition / newSize)
        this.navigate(currentNewPage)
      }
    }
  }
}
</script>

<style lang="scss">
.c-pagination {
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  .btn-group {
    display: flex;

    .btn {
      // Use fixed width buttons, so their position remains stable during navigation.
      width: 2.25rem;
    }
  }

  // The controls container fills up the rest of the space and flows
  // beneath the navigation buttons when there is no more room.
  .controls {
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    flex: 1;
    white-space: nowrap;

    select {
      width: 4.5rem;
    }

    label,
    .item-count {
      color: var(--gray-dark);
      font-weight: 500;
    }

    .form-check {
      margin: 0;
    }
  }
}
</style>

<docs>
## Basic example

```jsx
  // Always provide at least 'size' and 'page'; the other properties
  // are added from the pagination component itself.
  let model = { size: 20, page: 1 }
  const mockStore = (e) => { model = e }

  const fetchItems = async function() {
    // Retrieve items and feed the pagination component
    // with the api results for paginated content.
    return {count: 250 }
  }

  <Pagination
    v-model="model"
    v-bind:fetchItems="fetchItems"
    v-on:input="mockStore"
    v-bind:visiblePages="9"
    v-bind:pageSizes="[10, 20, 50, 100]"
    v-bind:useRouter="false"
    v-bind:css="{'btn-sm': true}"/>
  Model: {{model}}
```
</docs>
