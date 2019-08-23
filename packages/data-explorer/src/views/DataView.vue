<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-10">
        <h1 v-if="entityMeta && entityMeta.label" class="mb-0">{{entityMeta.label}}</h1>
        <small v-if="entityMeta && entityMeta.description" class="text-secondary"><em>{{entityMeta.description}}</em></small>
      </div>
      <div class="col-2" v-if="activeEntity">
        <table-settings-button class="float-right" :selectedTable="activeEntity" :selectedRowId="settingsRowId"></table-settings-button>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <toolbar-view :hasCart="isShop"></toolbar-view>
        <entity-view :isShop="isShop"></entity-view>
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

export default Vue.extend({
  name: 'DataView',
  computed: {
    ...mapState(['activeEntity', 'entityMeta', 'openTableSettings', 'settingsRowId', 'isShop'])
  },
  methods: {
    ...mapActions(['getTableData', 'getTableSettings'])
  },
  created () {
    this.getTableData()
    this.getTableSettings({ tableName: this.activeEntity })
  },
  components: { ToolbarView, EntityView, TableSettingsButton }
})
</script>
