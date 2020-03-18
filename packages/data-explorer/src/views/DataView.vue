<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-3">
        <h1 v-if="tableMeta && tableMeta.label" class="mb-0">{{tableMeta.label}}</h1>
      </div>
      <div class="col-6">
        <search-component v-model="searchText"></search-component>
      </div>
      <div class="col-3">
         <table-settings-button class="float-right" :tableSettings="tableSettings"></table-settings-button>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
               <small v-if="tableMeta && tableMeta.description" class="text-secondary"><em>{{tableMeta.description}}</em></small>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <toolbar-view></toolbar-view>
      </div>
    </div>
    <div class="row">
      <div class="col">
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
import SearchComponent from '../components/SearchComponent'
import { mapState, mapActions } from 'vuex'
import ClipboardView from './ClipboardView'

export default Vue.extend({
  name: 'DataView',
  computed: {
    ...mapState(['showShoppingCart', 'tableName', 'tableMeta', 'tableSettings']),
    searchText: {
      get () {
        return this.$store.state.searchText
      },
      set (value) {
        this.$store.commit('setSearchText', value)
      }
    }
  },
  methods: {
    ...mapActions(['getTableSettings'])
  },
  created () {
    this.getTableSettings({ tableName: this.tableName })
  },
  components: { ToolbarView, SelectLayoutView, TableSettingsButton, ClipboardView, SearchComponent }
})
</script>
