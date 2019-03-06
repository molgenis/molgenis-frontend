<template>
  <div class="navigator-actions">
    <b-button class="mb-2" size="sm" variant="secondary" @click="createNewScript">New script</b-button>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'NewButton',
  methods: {
    createNewScript () {
      this.$router.push({ name: 'newscript' })
    }
  }
})
</script>
