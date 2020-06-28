<template>
  <page-component id="app" @contextLoaded="setContext">
    <router-view />
  </page-component>
</template>

<script>
import Vue from 'vue'
import PageComponent from '../node_modules/@molgenis/molgenis-ui-context/src/components/PageComponent.vue'
import '../node_modules/@molgenis/molgenis-ui-context/public/sticky-footer.css'
import { mapMutations } from 'vuex'

export default Vue.extend({
  name: 'app',
  components: { PageComponent },
  methods: { ...mapMutations('account', ['setContext'])
  }
})
</script>
