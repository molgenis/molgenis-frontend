<template>
  <div>
    <b-alert v-if="showError" variant="danger" show dismissible>
      {{ 'scripts-connection-error' | i18n }}
      <router-link to="/login" tag="button">Sign in</router-link>
    </b-alert>
    <router-view v-if="!showError" />
  </div>
</template>

<script>
import '@molgenis/molgenis-ui-form/dist/static/css/molgenis-ui-form.css'

export default {
  name: 'App',
  data () {
    return {
      showError: false
    }
  },
  created () {
    this.$store.dispatch('requestScripts').catch(() => {
      this.showError = true
    })
  }
}
</script>
