<template>
  <b-modal
    id="resourceDeleteModal"
    :title="$t('navigator:delete-confirmation-title')"
    :ok-title="$t('navigator:delete-confirmation-ok-text')"
    :cancel-title="$t('navigator:delete-confirmation-cancel-text')"
    ok-variant="danger"
    cancel-variant="secondary"
    @ok="deleteSelectedResources"
  >
    {{ $t('navigator:delete-confirmation-text') }}
  </b-modal>
</template>

<script>
import { DELETE_SELECTED_RESOURCES } from '@/store/navigator/actions'

export default {
  name: 'NavigatorDeleteModal',
  methods: {
    deleteSelectedResources: function () {
      this.$store.dispatch(`navigator/${DELETE_SELECTED_RESOURCES}`)
    }
  }
}
</script>
