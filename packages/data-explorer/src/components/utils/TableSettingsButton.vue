<template>
  <a :href="href"
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
    tableSettings: {
      type: Object,
      required: true
    }
  },
  computed: {
    href () {
      const href = `${SETTINGS_APP_URL}/${this.tableSettings.settingsTable}`
      return this.tableSettings.settingsRowId ? `${href}/${this.tableSettings.settingsRowId}` : href
    }
  }
}
</script>
