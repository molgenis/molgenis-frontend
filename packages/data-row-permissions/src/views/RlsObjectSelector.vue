<template>
  <div class="list-group w-50 mx-auto my-5 ">
    <div class="d-flex justify-content-between">
      <h3 class="mb-4">
        {{ $t('data-row-permissions-rls-object-of') }} {{ currentLabel }}
      </h3>
      <back-button route="SelectEntity" />
    </div>
    <b-form-input
      v-model="search"
      class="p-2 mb-2"
      type="text"
      :placeholder="$t('data-row-permissions-filter-placeholder')" />
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
import { mapActions, mapGetters, mapState } from 'vuex'
import BackButton from '../components/BackButton.vue'
import { filterObjectOnStringProperties } from '../logic/filter'

export default {
  name: 'RlsEntitySelector',
  components: { DataStatus, CustomRouterLink, BackButton },
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
    ...mapGetters(['loaded']),
    currentLabel () {
      if (this.rlsEntities && this.rlsEntities.length) {
        return this.rlsEntities.find(entity => entity.id === this.entityId).label
      }
      return ''
    },
    results () {
      return filterObjectOnStringProperties(this.rlsObjects, ['description', 'label', 'id'], this.search)
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
