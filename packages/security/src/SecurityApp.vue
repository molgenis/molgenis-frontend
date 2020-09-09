<template>
  <router-view></router-view>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'SecurityApp',
  methods: {
    ...mapActions('account', ['fetchContext'])
  },
  created () {
    this.fetchContext()
  }
}
</script>
