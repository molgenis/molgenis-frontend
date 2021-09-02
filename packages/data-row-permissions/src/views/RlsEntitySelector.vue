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
      <router-link
        v-add-class-hover="'bg-primary text-white'"
        class="list-group-item d-flex justify-content-between"
        :to="{ name: 'SelectEntitityObject', params: { entityId: row.id, entityType: row.entityType }}">
        <span>{{ row.label }}</span>
        <font-awesome-icon
          class="mt-1"
          icon="angle-right" />
      </router-link>
    </div>
  </div>
</template>

<script>
import api from '@molgenis/molgenis-api-client'

export default {
  name: 'RlsEntitySelector',
  data () {
    return {
      search: '',
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
      this.rls_entities = response.data
    })
  }
}
</script>

<style scoped>
a:not(.text-white) > .fa-angle-right {
  color: #000;
}
</style>
