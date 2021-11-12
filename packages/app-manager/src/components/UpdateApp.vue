<template>
  <div class="d-inline">
    <input
          :id="appId"
          :ref="appId"
          @change="selectedFile"
          type="file"
          v-show="false"
          accept=".gz, .zip"
        />
    <b-button variant="primary" size="sm" class="mr-2" v-b-modal="`${appId}`">Update</b-button>
    <b-modal :id="appId" title="Update app" okTitle="Update" @ok="handleFileUpload" centered>
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
      required: true
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
    // we need to generate id's else modal pops up for all
    generateId () {
      return 'update-modal' + Math.random().toString().split('.')[1]
    },
    triggerFileBrowser () {
      // Trigger file upload by clicking the hidden input
      document.getElementById(this.appId).click()
    },
    selectedFile (event) {
      this.file = event.target.files[0]
    },
    handleFileUpload () {
      this.$store.commit('SET_ERROR', '')
      this.$store.dispatch('UPDATE_APP', { id: this.appId, file: this.file, updateRuntimeOptions: this.updateRuntimeOptions })

      // Clear the existing value to make it possible to upload the same file again
      this.$refs[this.appId].value = ''
      this.file = {}
      this.updateRuntimeOptions = false
    }
  }
}
</script>
