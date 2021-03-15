<template>
  <b-input-group class="w-50 my-4">
    <b-form-input
      v-model="query"
      :placeholder="$t('navigator:search-input-placeholder')"
      type="text"/>
    <b-input-group-append>
      <b-btn variant="secondary"><font-awesome-icon icon="search"/></b-btn>
    </b-input-group-append>
  </b-input-group>
</template>

<script>
export default {
  name: 'NavigatorSearch',
  computed: {
    query: {
      get: function () {
        return this.$store.state.route.query.q
      },
      set: function (query) {
        this.$router.push({
          name: 'nav-view-folder',
          params: { ...this.$route.params, folder: undefined },
          query: query ? { ...this.$route.query, q: query } : undefined
        })
      }
    }
  }
}
</script>
