<template>
  <ul class="dropdown-menu" style="display: block;">
    <li v-for="item in listItems" :key="listId +'-'+ item.id" class="dropdown-item">
      <a :href="item.id">{{item.label}}</a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'DropdownList',
  data: function () {
    return {
      listItems: this.items
    }
  },
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
  watch: {
    isShown: function (val) {
      // Pass callBack to handle fetch result
      if (!this.listItems.length) {
        this.$emit('fetchItems', { id: this.listId, callback: this.onItemsFetched })
      }
    }
  },
  methods: {
    onItemsFetched: function (items) {
      this.listItems = items
    }
  }
}
</script>

<style scoped>
/*
* Needed to remove gap between mouse-over target and list.
* Else dropdown list is hidden when the mouse pointer passes over the gap.
 */
ul.dropdown-menu {
  margin-top: 0;
}
</style>
