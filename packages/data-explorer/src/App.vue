<template>
  <page-component id="app" @contextLoaded="setContext">
    <router-view />
  </page-component>
</template>

<script>
import PageComponent from '@molgenis/molgenis-ui-context/src/components/PageComponent.vue'
import '@molgenis/molgenis-ui-context/public/sticky-footer.css'
import { mapMutations } from 'vuex'

export default {
  name: 'app',
  components: { PageComponent },
  methods: { ...mapMutations('account', ['setContext']) }
}
</script>
