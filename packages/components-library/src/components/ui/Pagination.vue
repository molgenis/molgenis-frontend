<template>
<nav class="c-pagination">

  <div v-if="localValue.count > localValue.size" class="btn-group mb-2 mr-3">
    <button :class="css" class="btn btn-outline-primary"
      :disabled="localValue.page <= 1"
      @click="updateValue({page: 1})">
      «
    </button>

    <button :class="css" class="t-page-prev btn btn-outline-primary"
      :disabled="localValue.page <= 1"
      @click="updateValue({page: localValue.page - 1})">
      ‹
    </button>

    <button
      v-for="pageNumber in pageNumbers" :key="pageNumber"
      class="btn btn-outline-primary"
      :class="{'active': pageNumber === localValue.page, ...css}"
      @click="updateValue({page: pageNumber})">
      {{pageNumber}}
    </button>

    <button
      :class="css" class="t-page-next btn btn-outline-primary"
      :disabled="localValue.page >= pageCount"
      @click="updateValue({page: localValue.page + 1})">
      ›
    </button>

    <button
      :class="css" class="btn btn-outline-primary"
      :disabled="localValue.page >= pageCount"
      @click="updateValue({page: pageCount})">
      »
    </button>
  </div>

  <div class="controls mb-2">
    <div class="item-count form-inline mr-2">
      <span>{{navigationText}}</span>
    </div>

    <div class="form-check form-check-inline">
      <label class="form-check-label mr-2" for="page-size">{{i18n['per page']}}</label>
      <select class="form-control" id="page-size" v-model="localValue.size" @change="handleSizeChange">
        <option v-for="pageSize of pageSizes" :value="pageSize" :key="pageSize">{{pageSize}}</option>
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
  data: function () {
    return {
      localValue: {
        size: 20,
        page: 1,
        loading: false,
        count: 0
      }
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
  methods: {
    updateValue (value) {
      this.localValue = { ...this.localValue, ...this.value, ...value }
      this.$emit('input', { ...this.localValue })
    },
    handleSizeChange () {
      this.updateValue({ page: 1, size: this.localValue.size })
    }
  },
  watch: {
    /**
     * Sync the local state when the external state changes.
     */
    value: {
      handler (value) {
        this.localValue = value
      },
      deep: true
    }
  },
  async created () {
    this.localValue = { ...this.localValue, ...this.value }
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
  const mockStore = (e) => { model = e }

  <Pagination
    v-model="model"
    v-on:input="mockStore"
    v-bind:visiblePages="9"
    v-bind:pageSizes="[10, 20, 50, 100]"
    v-bind:css="{'btn-sm': true}"/>
  Model: {{model}}
```
</docs>
