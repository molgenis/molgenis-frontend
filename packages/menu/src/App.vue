<template>
  <div id="molgenis-site-menu">
    <cookie-wall v-if="showCookieWall" cookieName="permissionforcookies" />
    <header-component :molgenis-menu="molgenisMenu"/>
  </div>
</template>

<script>
import Vue from 'vue'
import HeaderComponent from '../node_modules/@molgenis/molgenis-ui-context/src/components/HeaderComponent.vue'
import CookieWall from '../node_modules/@molgenis/molgenis-ui-context/src/components/CookieWall'

export default Vue.extend({
  name: 'molgenis-site-menu',
  components: {
    HeaderComponent, CookieWall
  },
  data () {
    return {
      molgenisMenu: window.molgenisMenu,
      showCookieWall: window.cookieWall
    }
  }
})

</script>
