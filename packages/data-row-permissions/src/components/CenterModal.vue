<template>
  <b-modal
    v-model="modalShow"
    centered
    :title="modalTitle"
    :ok-title="okTitle"
    :cancel-title="cancelTitle"
    @hide="$emit('cancel')"
    @close="$emit('cancel')"
    @cancel="$emit('cancel')"
    @ok="$emit('ok')">
    <slot />
  </b-modal>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: () => ''
    },
    okTitle: {
      type: String,
      required: false,
      default: () => ''
    },
    cancelTitle: {
      type: String,
      required: false,
      default: () => ''
    },
    value: {
      type: Boolean,
      required: true,
      default: () => false
    }
  },
  data () {
    return {
      modalShow: false
    }
  },
  computed: {
    modalTitle () {
      return this.title
    }
  },
  watch: {
    value (newValue) {
      this.modalShow = newValue
    }
  }
}
</script>
