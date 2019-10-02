<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-10">
        <h1 v-if="tableMeta && tableMeta.label" class="mb-0">{{tableMeta.label}}</h1>
        <small v-if="tableMeta && tableMeta.description" class="text-secondary"><em>{{tableMeta.description}}</em></small>
      </div>
      <div class="col-2" v-if="tableName">
        <table-settings-button class="float-right" :selectedTable="tableName" :selectedRowId="settingsRowId"></table-settings-button>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <toolbar-view></toolbar-view>
        <clipboard-view v-if="showShoppingCart"></clipboard-view>
        <select-layout-view v-else></select-layout-view>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import ToolbarView from './ToolbarView'
import SelectLayoutView from './SelectLayoutView'
import TableSettingsButton from '../components/utils/TableSettingsButton'
import { mapState, mapActions } from 'vuex'
import ClipboardView from './ClipboardView'

export default Vue.extend({
  name: 'DataView',
  computed: {
    ...mapState(['showShoppingCart', 'tableName', 'tableMeta', 'openTableSettings', 'settingsRowId', 'isShop'])
  },
  methods: {
    ...mapActions(['getTableSettings'])
  },
  created () {
    this.getTableSettings({ tableName: this.tableName })
  },
  components: { ToolbarView, SelectLayoutView, TableSettingsButton, ClipboardView }
})
</script>
