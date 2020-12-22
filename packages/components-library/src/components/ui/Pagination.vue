<template>
<nav class="c-pagination">

  <div class="button-container mb-2 mr-2">
    <button v-if="localValue.count > localValue.size" :class="styles" class="t-page-prev btn btn-outline-primary mr-4"
      :disabled="localValue.page <= 1"
      @click="navigate(localValue.page - 1)">
        &laquo;
    </button>

    <div class="btn-group">
      <template v-if="ellipsisFirst">
        <button :class="styles" class="btn btn-outline-primary" @click="navigate(ellipsisFirst)">
            {{ellipsisFirst}}
        </button>
        <button :class="styles" class="btn ellipsis" disabled>...</button>
      </template>

      <button
        class="btn btn-outline-primary"
        :class="{'active': pageNumber === localValue.page, ...styles}" v-for="pageNumber in pages" :key="pageNumber"
        @click="navigate(pageNumber)">
        {{pageNumber}}
      </button>

      <template v-if="ellipsisLast">
        <button :class="styles" class="btn ellipsis" disabled>...</button>
        <button :class="styles" class="btn btn-outline-primary" @click="navigate(ellipsisLast)">
          {{ellipsisLast}}
        </button>
      </template>

      <button v-if="localValue.count > localValue.size"
        :class="styles" class="t-page-next btn btn-outline-primary ml-4"
        :disabled="localValue.page >= pageCount"
        @click="navigate(localValue.page + 1)">
        &raquo;
      </button>
    </div>
  </div>

  <div class="pagination-controls mb-2">
    <form class="mr-2" v-if="localValue.count > localValue.size">
      <div class="btn-group">
        <select name="page-size" class="form-control-sm mr-2" v-model="localValue.size">
          <option value="10">10</option>
          <option value="20">20 </option>
          <option value="50">50</option>
        </select>
        <label for="page-size">{{this.text.perPage}}</label>
      </div>
    </form>

    <div class="item-count form-inline">{{localValue.count}} {{this.text.total}}</div>
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
      await this.$nextTick()
      // Pagination state is leading for the initial page,
      // in case no router is being use.
      this.fetchData(this.localValue.page)
    }
  },
  computed: {
    ellipsisFirst () {
      const firstPage = this.pages[0]
      if (firstPage > 2) { return 1 }
      return null
    },
    ellipsisLast () {
      const lastPage = this.pages[this.pages.length - 1]
      if (lastPage <= (this.pageCount - 2)) { return this.pageCount }
      return null
    },
    pageCount () {
      if (!this.localValue.count) { return 0 }
      return Math.floor(parseInt(this.localValue.count, 10) / this.localValue.size)
    },
    pages () {
      const pages = []

      const edgeRange = Math.floor(this.rangeSize / 2)
      const inStartRange = this.localValue.page <= edgeRange

      if (inStartRange) {
        const rightEdge = (this.pageCount > this.rangeSize) ? this.rangeSize : this.pageCount
        for (let i = 1; i <= rightEdge; i++) pages.push(i)
      } else {
        // Generate first part of the middle range.
        for (let i = this.localValue.page - edgeRange; i < this.localValue.page; i++) {
          if (i > 0) { pages.push(i) }
        }
        // Generate the second part of the middle range.
        for (let i = this.localValue.page; i <= this.localValue.page + edgeRange; i++) {
          if (i > 0 && i <= this.pageCount) { pages.push(i) }
        }
      }

      // Pagination is structured like: [start] [midrange] [end]
      // This add the start in the following situation: 1 2 3 [4] 5 6
      // Otherwise, it would become: 2 3 [4] 5 6
      const firstPage = pages[0]
      if (firstPage === 2) { pages.unshift(1) }

      // The same with the end part:
      const lastPage = pages[pages.length - 1]
      if (lastPage === (this.pageCount - 1)) { pages.push(this.pageCount) }

      return pages
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
      const { count } = await this.fetchItems()
      this.updateValue({ loading: false, count, page })

      this.localValue = { ...this.value, ...{ loading: false, count, page } }
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
     * Add css classes to pagination buttons.
     */
    styles: {
      type: Object,
      required: false,
      default: () => ({})
    },
    /**
     * The method to retrieve items with.
     * @returns {Object} {count: Number}
     */
    fetchItems: {
      type: Function,
      required: false
    },
    /**
     * Amount of navigational page buttons around the current page button.
     */
    rangeSize: {
      type: Number,
      default: () => 4
    },
    /**
     * The texts being used.
     */
    text: {
      type: Object,
      default: () => ({
        perPage: 'items per page',
        total: 'items'
      })
    },
    /**
     * Whether to integrate with Vue-router.
     */
    useRouter: {
      type: Boolean,
      default: () => true
    },

    /**
     * Reflects the pagination state
     * @model
     */
    value: {
      type: Object,
      required: true
    }
  },
  watch: {
    '$route.query': {
      handler: function (query) {
        if (!this.fetchItems || !this.useRouter) { return }

        if (query.page) {
          this.fetchData(parseInt(query.page, 10))
        } else {
          // Defaults by setting the pagination to page 1.
          this.navigate(1)
        }
      },
      deep: true,
      immediate: true
    },
    value: {
      handler: function (value) {
        if (value.size !== this.localValue.size) {
          if (this.fetchItems) {
            // Changing the amount of items per page results
            // in going back to page 1 and recalculation of
            // the paginator, but only when the paginator is
            // not passive; e.g. it provides a method to fetch
            // items.
            this.navigate(1)
          }
        }
        this.localValue = value
      },
      deep: true
    }
  }
}
</script>

<style lang="scss">
.c-pagination {
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  .button-container {
    display: flex;

    .btn {
      // Use fixed width for buttons, so their position
      // remains stable while navigation
      width: 2.5rem;

      &.ellipsis {
        margin: 0 0.5rem;
        width: auto;
      }
    }
  }

  .pagination-controls {
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    flex: 1;
    white-space: nowrap;

    form {
      select {
        width: 4rem;
      }
      label {
        align-items: center;
        display: flex;
        font-weight: 500;
        margin-bottom: 0;
      }
    }
  }

  .item-count {
    font-weight: 600;
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
    v-bind:useRouter="false"
    v-bind:styles="{'btn-sm': true}"/>
  Model: {{model}}
```
</docs>
