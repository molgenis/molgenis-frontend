<template>
  <center-modal
    v-model="changeOwner"
    :title="$t('data-row-permissions-modal-title-change-ownership')"
    :ok-title="$t('data-row-permissions-change-owner')"
    :cancel-title="$t('data-row-permissions-cancel')"
    @ok="save"
    @cancel="cancel">
    <b-form-select
      v-model="newOwner"
      class="m-1 py-3"
      :select-size="10"
      :options="potentialOwnerList" />
  </center-modal>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import CenterModal from './CenterModal.vue'
export default {
  components: { CenterModal },
  props: {
    value: {
      type: Boolean,
      required: true,
      default: () => false
    }
  },
  data () {
    return {
      changeOwner: false,
      newOwner: ''
    }
  },
  computed: {
    ...mapState(['permissionObject', 'userOptions', 'roleOptions']),
    potentialOwnerList () {
      return this.userOptions.concat(this.roleOptions)
    }
  },
  watch: {
    value (newValue) {
      this.changeOwner = newValue
      this.newOwner = this.permissionObject.ownedByUser || this.permissionObject.ownedByRole
    }
  },
  methods: {
    ...mapActions(['updatePermissions']),
    save () {
      const updateOwnership = {}
      if (this.userOptions.some(f => f.value === this.newOwner)) {
        updateOwnership.ownedByUser = this.newOwner
      } else {
        updateOwnership.ownedByRole = this.newOwner
      }
      this.updatePermissions(updateOwnership)
      this.$emit('input', false)
    },
    cancel () {
      this.newOwner = this.permissionObject.ownedByUser || this.permissionObject.ownedByRole
      this.$emit('input', false)
    }
  }
}
</script>
