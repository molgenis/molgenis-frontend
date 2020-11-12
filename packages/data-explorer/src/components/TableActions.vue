<template>
    <div class="btn-group">
      <button @click="download" class="btn btn-secondary">{{$t('Download')}}</button>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  computed: {
    ...mapState('header', [
      'breadcrumbs'
    ])
  },
  methods: {
    download: function () {
      this.downloadResources([{
        id: this.breadcrumbs[0].id,
        type: 'ENTITY_TYPE'
      }])
    },
    ...mapActions(['downloadResources'])
  }
}
</script>
