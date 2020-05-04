<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-3">
        <h1 v-if="tableMeta && tableMeta.label" class="mb-0">{{tableMeta.label}}</h1>
      </div>
      <div class="col-6"></div>
      <div class="col-3">
        <table-settings-button class="float-right" :tableSettings="tableSettings"></table-settings-button>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <small v-if="tableMeta && tableMeta.description" class="text-secondary">
          <em>{{tableMeta.description}}</em>
        </small>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <toolbar-view></toolbar-view>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import ToolbarView from './ToolbarView'
import TableSettingsButton from '../components/utils/TableSettingsButton'
import { mapState, mapActions } from 'vuex'

export default Vue.extend({
  name: 'DataView',
  components: { ToolbarView, TableSettingsButton },
  computed: {
    ...mapState([
      'tableName',
      'tableMeta',
      'tableSettings'
    ])
  },
  methods: {
    ...mapActions(['getTableSettings'])
  },
  created () {
    this.getTableSettings({ tableName: this.tableName })
  }
})
</script>
