<template>
  <div>
    <h1 v-if="tableMeta && tableMeta.label" class="mb-0">{{showShoppingCart?'Checkout: ':''}}{{tableMeta.label}}</h1>
    <small v-if="tableMeta && tableMeta.description" class="text-secondary"><em>{{tableMeta.description}}</em></small>

    <toolbar-view></toolbar-view>
    <cart-view v-if="showShoppingCart"></cart-view>
    <select-layout-view v-else></select-layout-view>

  </div>
</template>

<script>
import Vue from 'vue'
import ToolbarView from './ToolbarView'
import SelectLayoutView from './SelectLayoutView'
import CartView from './CartView'
import { mapState, mapActions } from 'vuex'

export default Vue.extend({
  name: 'DataView',
  computed: {
    ...mapState(['tableMeta', 'showShoppingCart'])
  },
  methods: {
    ...mapActions(['loadTableData', 'loadTableMetaData'])
  },
  created () {
    this.loadTableData()
    this.loadTableMetaData()
  },
  components: { ToolbarView, SelectLayoutView, CartView }
})
</script>
