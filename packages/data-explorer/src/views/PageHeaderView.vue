<template>
  <div class="container-fluid mb-3">
    <div class="row">
      <div class="col-3">
        <table-select
          v-if="tableMeta && tableMeta.label && packageTables"
          :label="tableMeta.label"
          :packageTables="selectableTabels"
        >
        </table-select>
      </div>
      <div class="col-6"></div>
      <div v-if="hasEditSettingsRights" class="col-3">
        <table-settings-button
          class="float-right"
          :settingsRowId="tableSettings.settingsRowId"
          :settingsTableId="settingsTable"
        >
        </table-settings-button>
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
import TableSelect from '@/components/TableSelect'
import TableSettingsButton from '../components/utils/TableSettingsButton'
import { mapState, mapActions, mapGetters } from 'vuex'

export default Vue.extend({
  name: 'PageHeaderView',
  components: { ToolbarView, TableSettingsButton, TableSelect },
  computed: {
    ...mapState([
      'tableName',
      'tableMeta',
      'tableSettings',
      'settingsTable'
    ]),
    ...mapState('header', [
      'packageTables'
    ]),
    ...mapGetters(['hasEditSettingsRights']),
    selectableTabels () {
      return this.packageTables.filter(pt => pt.id !== this.tableMeta.id)
    }
  },
  methods: {
    ...mapActions('header', [
      'getGroupTabels'
    ])
  },
  mounted () {
    this.getGroupTabels({ package: this.tableMeta.package })
  }
})
</script>

<style scoped>
.bread-crumb-select {
  color: black;
  padding-right: 2rem;
}
.bread-crumb-select > h1 {
  display: inline;
}
.bread-crumb-select > svg {
  display: none;
  vertical-align: 0.2rem;
}
.bread-crumb-select:hover > svg {
  display: inline;
}

.bread-crumb-dropdown >>> .bread-crumb-item-dropdown {
  padding-left: 0;
  padding-bottom: 0;
}
</style>
