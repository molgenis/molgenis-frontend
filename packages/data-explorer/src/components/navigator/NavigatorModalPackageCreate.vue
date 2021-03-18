<template>
  <b-modal
    id="packageCreateModal"
    ref="packageCreateModal"
    :title="$t('navigator:create-package-title')"
    :ok-title="$t('navigator:create-package-ok-text')"
    :cancel-title="$t('navigator:create-package-cancel-text')"
    @ok="handleOk"
    @shown="resetForm">
    <b-form
      :validated="validated"
      @submit.stop.prevent="handleSubmit">
      <b-form-group
        id="packageLabelInputGroup"
        :label="$t('navigator:package-input-label') + ' *'"
        :invalid-feedback="$t('navigator:package-input-label-invalid')"
        label-for="packageNameInput">
        <b-form-input
          id="packageLabelInput"
          ref="createPackageLabelInput"
          v-model="form.label"
          type="text"
          required/>
      </b-form-group>
      <b-form-group
        id="packageDescriptionInputGroup"
        :label="$t('navigator:package-input-description')"
        label-for="packageDescriptionInput">
        <b-form-input
          id="packageDescriptionInput"
          v-model="form.description"
          type="text"/>
      </b-form-group>
    </b-form>
  </b-modal>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  CREATE_RESOURCE
} from '@/store/navigator/actions'

export default {
  name: 'NavigatorModalPackageCreate',
  data () {
    return {
      form: {
        label: '',
        description: ''
      },
      validated: false
    }
  },
  computed: {
    ...mapGetters('navigator', ['folderId'])
  },
  methods: {
    resetForm () {
      this.form = {
        label: '',
        description: ''
      }
      this.validated = false
      this.$refs.createPackageLabelInput.$el.focus()
    },
    handleOk (evt) {
      evt.preventDefault()
      if (!this.form.label) {
        this.validated = true
      } else {
        this.handleSubmit()
      }
    },
    handleSubmit () {
      var folder = Object.assign({}, this.form, { type: 'PACKAGE', readonly: false })
      this.$store.dispatch(`navigator/${CREATE_RESOURCE}`, folder)
      this.$refs.packageCreateModal.hide()
    }
  }
}
</script>
