<template>
  <span>
    <div
      v-b-tooltip.d500
      :title="$t('navigator:action-upload')"
      class="mr-1 btn-tooltip-wrapper"
    >
      <b-btn
        :disabled="!canUpload"
        :href="importWizardUrl + (folder ? '?selectedPackage=' + folder.id : '')"
        variant="secondary"
      >
        <font-awesome-icon
          :class="{'fa-disabled' : !canUpload}"
          icon="upload"
          size="lg"
        />
      </b-btn>
    </div>
    <div
      v-b-tooltip.d500
      :title="$t('navigator:action-download')"
      class="btn-tooltip-wrapper"
    >
      <b-btn
        :disabled="!canDownload"
        variant="secondary"
        @click="downloadSelectedResources"
      >
        <font-awesome-icon
          :class="{'fa-disabled' : !canDownload}"
          icon="download"
          size="lg"
        />
      </b-btn>
    </div>
  </span>
</template>

<script>
import { DOWNLOAD_SELECTED_RESOURCES } from '@/store/navigator/actions'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'NavigatorActionsTransfer',
  data () {
    return {
      importWizardUrl: window.__INITIAL_STATE__.pluginUrls['importwizard']
    }
  },
  computed: {
    ...mapState('navigator', [ 'folder' ]),
    ...mapGetters('navigator', [ 'nrSelectedResources', 'query' ]),
    canDownload () {
      return this.nrSelectedResources > 0
    },
    canUpload () {
      return this.importWizardUrl && !this.query
    }
  },
  methods: {
    downloadSelectedResources: function () {
      this.$store.dispatch(`navigator/${DOWNLOAD_SELECTED_RESOURCES}`)
    }
  }
}
</script>
