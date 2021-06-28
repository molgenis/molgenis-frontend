<template>
  <nav class="c-pagination">
    <div v-if="count > size" class="btn-group mb-2 mr-3">
      <button
        :class="css" class="t-page-first btn btn-outline-primary"
        :disabled="page <= 1"
        @click="page = 1"
      >
        «
      </button>

      <button
        :class="css" class="t-page-prev btn btn-outline-primary"
        :disabled="page <= 1"
        @click="page = page - 1"
      >
        ‹
      </button>

      <button
        v-for="pageNumber in pageNumbers" :key="pageNumber"
        class="btn btn-outline-primary"
        :class="{'active': pageNumber === page, ...css}"
        @click="page = pageNumber"
      >
        {{ pageNumber }}
      </button>

      <button
        :class="css" class="t-page-next btn btn-outline-primary"
        :disabled="page >= pageCount"
        @click="page = page + 1"
      >
        ›
      </button>

      <button
        :class="css" class="t-page-last btn btn-outline-primary"
        :disabled="page >= pageCount"
        @click="page = pageCount"
      >
        »
      </button>
    </div>

    <div class="controls mb-2">
      <div class="item-count form-inline mr-2">
        <span>{{ navigationText }}</span>
      </div>

      <div class="form-check form-check-inline">
        <label class="form-check-label mr-2" for="page-size">{{ i18n['per page'] }}</label>
        <select
          id="page-size"
          v-model="size" 
          class="form-control"
        >
          <option v-for="pageSize of pageSizes" :key="pageSize" :value="pageSize">
            {{ pageSize }}
          </option>
        </select>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
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
  computed: {
    page: {
      get () { return this.value.page },
      set (page) { this.$emit('input', {...this.value, page })}
    },
    count () { return this.value.count },
    size: {
      get () { return this.value.size },
      set (size) { this.$emit('input', {...this.value, page: 1, size})}
    },
    navigationText () {
      if (this.pageCount <= 1) {
        return `${this.i18n.items}: ${this.value.count}`
      } else {
        return `${this.i18n.page} ${this.value.page}/${this.pageCount} (${this.value.count} ${this.i18n.items})`
      }
    },
    pageCount () {
      if (!this.value.count) { return 0 }
      return Math.ceil(this.value.count / this.value.size)
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
      const start = this.value.page <= edge
      const end = this.value.page >= (Math.floor(this.value.count / this.value.size) - edge)

      let left, right

      if (start) {
        left = 1
        right = (this.pageCount > this.visiblePages) ? this.visiblePages : this.pageCount
      } else if (end) {
        left = (this.pageCount - this.visiblePages) > 0 ? (this.pageCount - this.visiblePages + 1) : 1
        right = this.pageCount
      } else {
        // Must be within the mid-range.
        left = this.value.page - edge
        right = this.value.page + edge
      }

      return { left, right }
    }
  }
}
</script>

<style lang="scss">
.c-pagination {
  display: flex;
  flex-wrap: wrap;
  width: 100%;

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
    flex: 1;
    flex-wrap: nowrap;
    justify-content: space-between;
    white-space: nowrap;

    select {
      width: 4.5rem;
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
  let model = { size: 20, page: 1, count: 124 }

  <Pagination
    v-model="model"
    v-bind:visiblePages="9"
    v-bind:pageSizes="[10, 20, 50, 100]"
    v-bind:css="{'btn-sm': true}"/>
  Model: {{model}}
```
</docs>
