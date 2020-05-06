<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-3">
        <template v-if="tableMeta && tableMeta.label">
          <b-nav class="bread-crumb-dropdown">
            <b-nav-item-dropdown
              :id="tableName"
              :text="tableMeta.label"
              toggle-class="bread-crumb-item-dropdown"
              variant="link"
              left
              block
              no-caret
            >
            <template v-slot:button-content>
              <h1 class="mb-0" style="color: #212529;">{{tableMeta.label}}</h1>
            </template>
            <template v-for="table in packageTables">
              <b-dropdown-item :key="table.id">{{table.label}}</b-dropdown-item>
            </template>
            </b-nav-item-dropdown>
          </b-nav>
        </template>
      </div>
      <div class="col-6"></div>
      <div class="col-3">
        <table-settings-button class="float-right" :tableSettings="tableSettings"></table-settings-button>
      </div>
    </div>
    <div class="row mb-3">
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
    ]),
    ...mapState('header', [
      'packageTables'
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

<style scoped>
.bread-crumb-dropdown >>> .bread-crumb-item-dropdown {
  padding-left: 0;
  padding-bottom: 0;
}
</style>
