<template>
  <div>
    <h1 v-if="entityMeta && entityMeta.label" class="mb-0">{{showShoppingCart?'Checkout: ':''}}{{entityMeta.label}}</h1>
    <small v-if="entityMeta && entityMeta.description" class="text-secondary"><em>{{entityMeta.description}}</em></small>

    <toolbar-view></toolbar-view>
    <cart-view v-if="showShoppingCart"></cart-view>
    <entity-view v-else></entity-view>

  </div>
</template>

<script>
import Vue from 'vue'
import ToolbarView from './ToolbarView'
import EntityView from './EntityView'
import CartView from './CartView'
import { mapState, mapActions } from 'vuex'

export default Vue.extend({
  name: 'DataView',
  computed: {
    ...mapState(['activeEntity', 'entityMeta', 'showShoppingCart'])
  },
  methods: {
    ...mapActions(['loadEntity', 'loadMetaData', 'loadShopConfig'])
  },
  created () {
    this.loadEntity()
    this.loadMetaData()
  },
  components: { ToolbarView, EntityView, CartView }
})
</script>
