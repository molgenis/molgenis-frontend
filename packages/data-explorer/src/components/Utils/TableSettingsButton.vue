<template>
  <button
    type="button"
    class="btn btn-sm btn-light m-2 btn-outline-dark"
    title="Table settings"
    @click="alterSettings">
    <font-awesome-icon icon="cog"></font-awesome-icon>
    Table settings
  </button>
</template>

<script>

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCog)

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
  methods: {
    alterSettings () {
      if (this.selectedRowId) {
        console.log('id', this.selectedRowId, 'will be updated')
      } else {
        console.log('Settings will be created for', this.selectedTable)
      }
    }
  }
}
</script>

<style scoped>

</style>
