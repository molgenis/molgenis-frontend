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
    <div
      v-for="row in rls_objects"
      :key="row.id">
      <router-link
        v-add-class-hover="'bg-primary text-white'"
        class="list-group-item d-flex justify-content-between"
        :to="{ name: 'SelectEntitityObject', params: { entityId, objectId: row.id }}">
        <b>{{ row.label }}</b>
        <div class="d-inline">
          <span>{{ row.description }}</span>
          <font-awesome-icon
            class="ml-3 fa-icon"
            icon="angle-right" />
        </div>
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
      // id is typeId
      // typeId's you can get by querying api/data/entityType (their id's)
      rls_objects: []
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
a:not(.text-white) > div {
    color: #000;
}
</style>
