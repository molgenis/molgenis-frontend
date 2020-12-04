<template>
  <a :href="href"
    v-b-tooltip.hover.bottom="'Settings'"
    type="button" role="button"
    class="btn btn-light btn-outline-secondary table-settings"
    title="Table settings">
    <font-awesome-icon icon="cog"></font-awesome-icon>
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
    settingsTableId: {
      type: String,
      required: true
    },
    settingsRowId: {
      type: String,
      required: false
    }
  },
  computed: {
    href () {
      const href = `${SETTINGS_APP_URL}/${this.settingsTableId}`
      return this.settingsRowId ? `${href}/${this.settingsRowId}` : href
    }
  }
}
</script>
