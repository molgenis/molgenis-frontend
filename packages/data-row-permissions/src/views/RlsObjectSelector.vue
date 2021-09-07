<template>
  <div class="list-group w-50 mx-auto my-5 ">
    <div class="d-flex justify-content-between">
      <h3 class="mb-4">
        RLS objects of {{ entityId }}
      </h3>
      <router-link
        :to="{name: 'SelectEntity'}"
        class="mb-4 px-4 btn btn-secondary align-self-center">
        Back
      </router-link>
    </div>
    <b-form-input
      v-model="search"
      class="p-2 mb-2"
      type="text"
      placeholder="Type to filter" />
    <server-status :code="status" />
    <div
      v-for="row in results"
      :key="row.id">
      <custom-router-link
        :name="'DataRowPermissions'"
        :params="{ entityId, objectId: row.id }">
        <span>
          <font-awesome-icon
            class="mr-3"
            icon="list" />{{ row.label || row.id }}
        </span>
        <font-awesome-icon
          class="mt-1"
          icon="angle-right" />
      </custom-router-link>
    </div>
    <data-status
      v-if="status < 400"
      :items="results"
      :loaded="loaded" />
  </div>
</template>

<script>
import api from '@molgenis/molgenis-api-client'
import DataStatus from '../components/DataStatus.vue'
import ServerStatus from '../components/ServerStatus.vue'
import CustomRouterLink from '../components/CustomRouterLink.vue'

export default {
  name: 'RlsEntitySelector',
  components: { DataStatus, ServerStatus, CustomRouterLink },
  props: {
    // needed for the first part of the permissions query
    entityId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      search: '',
      loaded: false,
      status: 0,
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
    api.get(`/api/permissions/${this.entityId}`).then((response) => {
      this.rls_objects = response.data.objects
      this.loaded = true
    }).catch(e => {
      this.status = e.status
    })
  }
}
</script>

<style scoped>
a:not(.text-white) > div, a:not(.text-white) > .fa-angle-right {
    color: #000;
}
</style>
