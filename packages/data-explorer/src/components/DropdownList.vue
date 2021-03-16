<template>
  <ul v-if="!(isInitialized && listItems.length === 0)" class="dropdown-menu">
    <li v-if="!isInitialized" class="is-lazy-loading">
      <font-awesome-icon icon="spinner" spin />
    </li>
    <li v-for="item in listItems" :key="listId +'-'+ item.id" class="dropdown-item">
      <router-link :to="{ name: 'de-view', params: { entity: item.id }, query: $route.query}">
        {{ item.label }}
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'DropdownList',
  props: {
    listId: {
      type: String,
      required: true
    },
    isShown: {
      type: Boolean,
      required: false,
      default: () => false
    },
    items: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  data: function () {
    return {
      listItems: this.items,
      isInitialized: this.items.length > 0
    }
  },
  watch: {
    isShown: function (val) {
      // Pass callBack to handle fetch result
      if (!this.isInitialized) {
        this.$emit('fetchItems', { id: this.listId, callback: this.onItemsFetched })
      }
    }
  },
  methods: {
    onItemsFetched: function (items) {
      this.listItems = items
      this.isInitialized = true
    }
  }
}
</script>

<style scoped>

ul.dropdown-menu {
  /*
  * Handle show / hide via vue instead of bootstrap jquery
  */
  display: block;
  /*
  * Needed to remove gap between mouse-over target and list.
  * Else dropdown list is hidden when the mouse pointer passes over the gap.
  */
  margin-top: 0;
}

li.is-lazy-loading {
  text-align: center;
}
</style>
