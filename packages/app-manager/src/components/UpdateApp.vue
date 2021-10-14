<template>
  <div class="d-inline">
    <input
          id="app-file-input"
          ref="app-file-input-field"
          @change="selectedFile"
          type="file"
          v-show="false"
          accept=".gz, .zip"
        />
    <b-button variant="primary" size="sm" class="mr-2" v-b-modal.update-modal>Update</b-button>
    <b-modal id="update-modal" title="Update app" okTitle="Update" @ok="handleFileUpload" centered>
      <div class="d-flex">
          <button
            class="app-upload-btn btn btn-sm btn-outline-primary"
            @click="triggerFileBrowser">
            <span class="fa fa-cloud-upload mr-1"></span><span>Select app</span>
          </button>
        <div v-if="fileName" class="ml-auto mr-2 mt-1"><span>{{ fileName }}</span></div>
        </div>
        <b-form-checkbox v-model="updateRuntimeOptions" class="mt-3"><span>Update runtime options</span></b-form-checkbox>
    </b-modal>
  </div>
</template>
<script>
export default {
  props: {
    appId: {
      type: String,
      required: false,
      default: ''
    }
  },
  data: () => {
    return {
      file: {},
      updateRuntimeOptions: false
    }
  },
  computed: {
    fileName () {
      return this.file.name || ''
    }
  },
  methods: {
    triggerFileBrowser () {
      // Trigger file upload by clicking the hidden input
      document.getElementById('app-file-input').click()
    },
    selectedFile (event) {
      this.file = event.target.files[0]
    },
    handleFileUpload () {
      this.$store.commit('SET_ERROR', '')
      this.$store.dispatch('UPDATE_APP', { id: this.appId, file: this.file, updateRuntimeOptions: this.updateRuntimeOptions })

      // Clear the existing value to make it possible to upload the same file again
      this.$refs['app-file-input-field'].value = ''
      this.file = {}
      this.updateRuntimeOptions = false
    }
  }
}
</script>
