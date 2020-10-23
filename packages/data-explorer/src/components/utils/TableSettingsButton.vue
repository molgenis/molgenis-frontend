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

const SETTINGS_APP_URL = '/plugin/data-row-edit'

export default {
  name: 'TableSettingsButton',
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
