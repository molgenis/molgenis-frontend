<template>
  <a :href="settingHref"
    type="button"
    class="btn btn-sm m-2 text-nowrap btn-light"
    title="Table settings">
    <font-awesome-icon icon="cog"></font-awesome-icon>
    Table settings
  </a>
</template>

<script>

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCog)

const SETTINGS_APP_URL = '/plugin/data-row-edit'

export default {
  name: 'TableSettingsButton',
  components: { FontAwesomeIcon },
  props: {
    selectedTable: {
      type: String,
      required: true
    },
    selectedRowId: {
      type: String,
      required: false
    }
  },
  computed: {
    settingHref () {
      if (this.selectedRowId) {
        return `${SETTINGS_APP_URL}/${this.selectedTable}/${this.selectedRowId}`
      } else {
        return `${SETTINGS_APP_URL}/${this.selectedTable}`
      }
    }
  }
}
</script>
