<template>
  <div>
    <input
      id="app-file-input"
      @change="handleFileUpload"
      ref="app-file-input-field"
      type="file"
      v-show="false"
      accept=".gz, .zip"
    />
    <button
    class="app-upload-btn btn"
    :class="[update ? 'btn-sm btn-primary': 'btn-lg btn-success']"
    @click="triggerFileBrowser">
      <template v-if="update">
        <i class="fa fa-refresh"></i>
      </template>
      <template v-else>
        <span class="fa fa-cloud-upload"></span> Upload new app
      </template>
    </button>
  </div>
</template>
<script>
export default {
  props: {
    appId: {
      type: String,
      required: false,
      default: ''
    },
    update: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },
  methods: {
    triggerFileBrowser () {
      // Trigger file upload by clicking the hidden input
      document.getElementById('app-file-input').click()
    },

    handleFileUpload (event) {
      this.$store.commit('SET_ERROR', '')
      const file = event.target.files[0]

      if (this.update) {
        this.$store.dispatch('UPDATE_APP', { id: this.appId, file })
      } else { this.$store.dispatch('UPLOAD_APP', file) }

      // Clear the existing value to make it possible to upload the same file again
      this.$refs['app-file-input-field'].value = ''
    }
  }
}
</script>
