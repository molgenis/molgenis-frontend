<template>
  <div class="list-group w-50 mx-auto my-5 ">
    <div class="d-flex justify-content-between">
      <h3 class="mb-4">
        Row level secured objects of {{ entityId }}
      </h3>
      <router-link
        :to="{name: 'SelectEntity'}"
        class="mb-4 px-4 btn btn-secondary align-self-center">
        back
      </router-link>
    </div>
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
        class="list-group-item d-flex"
        :to="{ name: 'SelectEntitityObject', params: { entityId, objectId: row.id }}">
        <b>{{ row.label }}</b>
        <div class="d-inline ml-3">
          <span>{{ row.description }}</span>
        </div>
        <font-awesome-icon
          class="ml-auto mt-1 fa-icon"
          icon="angle-right" />
      </router-link>
    </div>
  </div>
</template>

<script>
import api from '@molgenis/molgenis-api-client'

export default {
  name: 'RlsEntitySelector',
  props: {
    // needed for the first part of the permissions query
    entityId: {
      type: String,
      required: true
    },
    // needed to get object Id's if you don't know these yet (second part of the query)
    entityType: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      search: '',
      // id is typeId
      // typeId's you can get by querying api/data/entityType (their id's)
      rls_objects: []
    }
  },
  computed: {
    results () {
      if (!this.search) {
        return this.rls_objects
      } else {
        const matchOn = this.search.toLowerCase()

        return this.rls_objects.filter(entity =>
          (entity.description && entity.description.toLowerCase().includes(matchOn)) ||
        entity.label.toLowerCase().includes(matchOn) ||
        entity.id.toLowerCase().includes(matchOn))
      }
    }
  },
  beforeMount () {
    api.get(`/api/data/${this.entityType}`).then((response) => {
      this.rls_objects = response.items.map(item => ({ id: item.data.id, label: item.data.label, description: item.data.description }))
    })
  }
}
</script>

<style scoped>
a:not(.text-white) > div, a:not(.text-white) > .fa-angle-right {
    color: #000;
}
</style>
