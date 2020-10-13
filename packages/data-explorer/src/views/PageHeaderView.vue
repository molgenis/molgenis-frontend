<template>
  <div class="container-fluid mb-3">
    <div class="row">
      <div class="col-3">
        <h1>{{ tableMeta.label }}</h1>
      </div>
      <div class="col-6"></div>
      <div v-if="hasEditSettingsRights" class="col-3">
        <table-settings-button
          class="float-right"
          :settings-row-id="tableSettings.settingsRowId"
          :settings-table-id="settingsTable"
        >
        </table-settings-button>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <small v-if="tableMeta && tableMeta.description" class="text-secondary">
          <em>{{ tableMeta.description }}</em>
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
import { mapState, mapGetters } from 'vuex'

export default Vue.extend({
  name: 'PageHeaderView',
  components: { ToolbarView, TableSettingsButton },
  computed: {
    ...mapState([
      'tableName',
      'tableMeta',
      'tableSettings',
      'settingsTable'
    ]),
    ...mapGetters(['hasEditSettingsRights'])
  }
})
</script>
