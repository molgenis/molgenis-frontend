<template>
  <div class="list-group w-50 mx-auto my-5 ">
    <div class="d-flex justify-content-between">
      <h3 class="mb-4">
        RLS objects of {{ currentLabel }}
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
    <div
      v-for="row in results"
      :key="row.id">
      <custom-router-link
        :name="'DataRowPermissions'"
        :params="{ entityId, objectId: row.id }">
        <span>
          <font-awesome-icon
            class="mr-3"
            icon="file" />{{ row.label || row.id }}
        </span>
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
import DataStatus from '../components/DataStatus.vue'
import CustomRouterLink from '../components/CustomRouterLink.vue'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'RlsEntitySelector',
  components: { DataStatus, CustomRouterLink },
  props: {
    // needed for the first part of the permissions query
    entityId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      search: ''
    }
  },
  computed: {
    ...mapState(['rlsEntities', 'responseStatus', 'rlsObjects']),
    currentLabel () {
      if (this.rlsEntities && this.rlsEntities.length) {
        return this.rlsEntities.find(entity => entity.id === this.entityId).label
      }

      return ''
    },
    loaded () {
      return this.responseStatus !== 0
    },
    results () {
      if (!this.search) {
        return this.rlsObjects
      } else {
        const matchOn = this.search.toLowerCase()

        return this.rlsObjects.filter(entity =>
          (entity.description && entity.description.toLowerCase().includes(matchOn)) ||
        entity.label.toLowerCase().includes(matchOn) ||
        entity.id.toLowerCase().includes(matchOn))
      }
    }
  },
  beforeMount () {
    this.getAllRlsObjects(this.entityId)
  },
  methods: {
    ...mapActions(['getAllRlsObjects'])
  }
}
</script>

<style scoped>
a:not(.text-white) > div, a:not(.text-white) > .fa-angle-right {
    color: #000;
}
</style>
