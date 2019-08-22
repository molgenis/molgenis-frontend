<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-10">
        <h1 v-if="tableMeta && tableMeta.label" class="mb-0">{{tableMeta.label}}</h1>
        <small v-if="tableMeta && tableMeta.description" class="text-secondary"><em>{{tableMeta.description}}</em></small>
      </div>
      <div class="col-2" v-if="tableName">
        <table-settings-button class="float-right" :selectedTable="activeEntity" :selectedRowId="settingsRowId"></table-settings-button>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <toolbar-view></toolbar-view>
        <cart-view v-if="showShoppingCart"></cart-view>
        <select-layout-view v-else></select-layout-view>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import ToolbarView from './ToolbarView'
import EntityView from './EntityView'
import TableSettingsButton from '../components/Utils/TableSettingsButton'
import { mapState, mapActions } from 'vuex'
import CartView from './CartView'

export default Vue.extend({
  name: 'DataView',
  computed: {
    ...mapState(['tableName', 'tableMeta', 'openTableSettings', 'settingsRowId', 'isShop'])
  },
  methods: {
    ...mapActions(['loadTableData', 'loadTableMetaData'])
  },
  created () {
    this.loadTableData()
    this.loadTableMetaData()
    this.$store.dispatch('getTableSettings', { tableName: this.activeEntity })
  },
  components: { ToolbarView, EntityView, TableSettingsButton }
})
</script>
