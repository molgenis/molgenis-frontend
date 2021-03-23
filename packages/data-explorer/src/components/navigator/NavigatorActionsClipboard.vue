<template>
  <span>
    <div
      v-b-tooltip.d500
      :title="$t('navigator:action-cut')"
      class="mr-1 btn-tooltip-wrapper"
    >
      <b-btn
        :disabled="!canCut"
        variant="secondary"
        @click="selectClipboardResources('CUT')"
      >
        <font-awesome-icon
          :class="{'fa-disabled' : !canCut}"
          icon="cut"
          size="lg"
        />
      </b-btn>
    </div>
    <div
      v-b-tooltip.d500
      :title="$t('navigator:action-copy')"
      class="mr-1 btn-tooltip-wrapper"
    >
      <b-btn
        :disabled="!canCopy"
        variant="secondary"
        @click="selectClipboardResources('COPY')"
      >
        <font-awesome-icon
          :class="{'fa-disabled' : !canCopy}"
          icon="clone"
          size="lg"
        />
      </b-btn>
    </div>
    <div
      v-b-tooltip.d500
      :title="$t('navigator:action-paste')"
      class="btn-tooltip-wrapper"
    >
      <b-btn
        :disabled="!canPaste"
        variant="secondary"
        @click="pasteClipboardResources"
      >
        <font-awesome-icon
          :class="{'fa-disabled' : !canPaste}"
          icon="paste"
          size="lg"
        />
      </b-btn>
    </div>
  </span>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { COPY_CLIPBOARD_RESOURCES, MOVE_CLIPBOARD_RESOURCES } from '@/store/navigator/actions'
import { SET_CLIPBOARD } from '@/store/navigator/mutations'

export default {
  name: 'NavigatorActionsClipboard',
  computed: {
    ...mapGetters('navigator', ['nrSelectedResources', 'folderId', 'query', 'nrClipboardResources']),
    ...mapState('navigator', ['clipboard', 'folder', 'selectedResources']),
    canCut () {
      return this.nrSelectedResources > 0 && !(this.folder && this.folder.readonly)
    },
    canCopy () {
      return this.nrSelectedResources > 0
    },
    canPaste () {
      return !this.query && this.nrClipboardResources > 0 && !(this.folder && this.folder.readonly)
    }
  },
  methods: {
    selectClipboardResources: function (mode) {
      this.$emit('bv::disable::tooltip')
      const clipboard = {
        mode: mode,
        resources: this.selectedResources.slice()
      }
      this.$store.commit(`navigator/${SET_CLIPBOARD}`, clipboard)
    },
    pasteClipboardResources: function () {
      const action = this.clipboard.mode === 'CUT' ? MOVE_CLIPBOARD_RESOURCES : COPY_CLIPBOARD_RESOURCES
      this.$store.dispatch(`navigator/${action}`, this.folder)
    }
  }
}
</script>
