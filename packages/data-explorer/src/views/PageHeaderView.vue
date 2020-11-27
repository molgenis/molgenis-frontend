<template>
  <div>
    <div class="row">
      <div class="col-9">
        <h1>{{tableMeta.label}}</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <small v-if="tableMeta && tableMeta.description" class="text-secondary">
          <em>{{tableMeta.description}}</em>
        </small>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

import TableSettingsButton from '../components/utils/TableSettingsButton'
import { mapState, mapGetters } from 'vuex'

export default Vue.extend({
  name: 'PageHeaderView',
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
