<template>
  <div class="custom-card position-relative">
    <v-runtime-template :template="template"></v-runtime-template>

    <pre style="border:1px solid red">
    {{customCode}}
    ---
    {{record}}
    </pre>

  </div>
</template>

<script>
import VRuntimeTemplate from 'v-runtime-template'
import { mapActions } from 'vuex'

export default {
  name: 'CustomCardContent',
  components: { VRuntimeTemplate },
  props: {
    id: {
      type: String,
      required: true
    },
    record: {
      type: Object,
      required: true
    },
    customCode: {
      type: String,
      required: true
    }
  },
  methods: {
    ...mapActions(['fetchRowData'])
  },
  created () {
    this.fetchRowData({ rowId: this.id })
  },
  computed: {
    template: function () {
      return '<div>' + this.customCode.trim() + '</div>'
    }
  }
}
</script>
