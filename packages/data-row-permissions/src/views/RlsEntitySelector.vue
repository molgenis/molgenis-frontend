<template>
  <div class="list-group w-50 mx-auto my-5 ">
    <h3 class="mb-4">
      {{ $t('data-row-permissions-rls-entities') }}
    </h3>
    <b-form-input
      v-model="search"
      class="p-2 mb-2"
      type="text"
      :placeholder="$t('data-row-permissions-filter-placeholder')" />
    <div
      v-for="row in results"
      :key="row.id">
      <custom-router-link
        :name="'SelectEntitityObject'"
        :params="{ entityId: row.id }">
        <span>
          <font-awesome-icon
            class="mr-3"
            icon="folder-open" />{{ row.label || row.id }}
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
import { filterObjectOnStringProperties } from '../logic/filter'
import DataStatus from '../components/DataStatus.vue'
import CustomRouterLink from '../components/CustomRouterLink.vue'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'RlsEntitySelector',
  components: { DataStatus, CustomRouterLink },
  data () {
    return {
      search: ''
    }
  },
  computed: {
    ...mapState(['rlsEntities', 'responseStatus']),
    ...mapGetters(['loaded']),
    results () {
      return filterObjectOnStringProperties(this.rlsEntities, ['entityType', 'label', 'id'], this.search)
    }
  }
}
</script>

<style scoped>
a:not(.text-white) > .fa-angle-right {
  color: #000;
}
</style>
