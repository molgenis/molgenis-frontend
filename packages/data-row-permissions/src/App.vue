<template>
  <div id="data-row-permissions-plugin">
    <router-view />
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  created () {
    this.fetchContext()
  },
  methods: {
    ...mapActions('uiContext', ['fetchContext'])
  }
}
</script>
