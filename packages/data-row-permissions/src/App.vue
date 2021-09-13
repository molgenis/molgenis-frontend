<template>
  <div id="data-row-permissions-plugin">
    <router-view />
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'

import { sync } from 'vuex-router-sync'
import store from './store' // vuex store instance
import router from './router' // vue-router instance

export default {
  data: function () {
    return {
      unsync: undefined
    }
  },
  computed: {
    ...mapState(['serverError'])
  },
  watch: {
    serverError (mssg) {
      this.$bvToast.toast(mssg, {
        title: 'Error occurred',
        toaster: 'b-toaster-bottom-right',
        solid: true,
        variant: 'danger',
        appendToast: true,
        autoHideDelay: 6000
      })
    }
  },
  beforeCreate () {
    this.unsync = sync(store, router)
  },
  beforeMount () {
    this.fetchContext()
    this.getAllUsers()
    this.getAllPermissionsTypes()
  },
  destroyed () {
    // During app/Vue teardown (e.g., you only use Vue.js in a portion of your app
    // and you navigate away from that portion and want to release/destroy
    // Vue components/resources)
    this.unsync()
  },
  methods: {
    ...mapActions('uiContext', ['fetchContext']),
    ...mapActions(['getAllUsers', 'getAllPermissionsTypes'])
  }
}
</script>
