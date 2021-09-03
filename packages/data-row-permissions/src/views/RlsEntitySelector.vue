<template>
  <div class="list-group w-25 mx-auto my-5 ">
    <h3 class="mb-4">
      Row level secured entities
    </h3>
    <input
      v-model="search"
      class="p-2 mb-2"
      type="text"
      placeholder="Type to filter">
    <div
      v-for="row in results"
      :key="row.id">
      <custom-router-link
        :name="'SelectEntitityObject'"
        :params="{ entityId: row.id }">
        <span>{{ row.label || row.id }}</span>
        <font-awesome-icon
          class="mt-1"
          icon="angle-right" />
      </custom-router-link>
    </div>
    <data-status
      :items="results"
      :loaded="loaded" />
  </div>
</template>

<script>
import api from '@molgenis/molgenis-api-client'
import DataStatus from '../components/DataStatus.vue'
import CustomRouterLink from '../components/CustomRouterLink.vue'

export default {
  name: 'RlsEntitySelector',
  components: { DataStatus, CustomRouterLink },
  data () {
    return {
      search: '',
      loaded: false,
      // id is typeId
      // typeId's you can get by querying api/data/entityType (their id's)
      rls_entities: []
    }
  },
  computed: {
    results () {
      if (!this.search) {
        return this.rls_entities
      } else {
        const matchOn = this.search.toLowerCase()

        return this.rls_entities.filter(entity => entity.entityType.toLowerCase().includes(matchOn) ||
        entity.label.toLowerCase().includes(matchOn) ||
        entity.id.toLowerCase().includes(matchOn))
      }
    }
  },
  beforeMount () {
    api.get('/api/permissions/types').then((response) => {
      this.rls_entities = response.data.filter(entity => entity.id)
      this.loaded = true
    })
  }
}
</script>

<style scoped>
a:not(.text-white) > .fa-angle-right {
  color: #000;
}
</style>
