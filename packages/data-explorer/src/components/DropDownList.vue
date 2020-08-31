<template>
  <ul class="dropdown-menu" style="display: block;">
    <li v-for="item in listItems" :key="listId +'-'+ item.id" class="dropdown-item">
      <a :href="item.id">{{item.label}}</a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'DropDownList',
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
    items: {
      type: Array,
      required: false,
      default: () => []
    },
    isShown: {
      type: Boolean,
      required: false
    }
  },
  watch: {
    isShown: function (val) {
      if (val) {
        // fire event and passCallBack
        if (!this.listItems.length) {
          this.$emit('fetchItems', { id: this.listId, callback: this.onItemsFetched })
        }
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
* Needed to remove space between mouse over target and list.
* Else drops is hidden then mouse passes over the space.
 */
ul.dropdown-menu {
  margin-top: 0;
}
</style>
