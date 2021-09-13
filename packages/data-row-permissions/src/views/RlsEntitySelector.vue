<template>
  <div class="list-group w-50 mx-auto my-5 ">
    <h3 class="mb-4">
      Row level secured entities
    </h3>
    <b-form-input
      v-model="search"
      class="p-2 mb-2"
      type="text"
      placeholder="Type to filter" />
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
import DataStatus from '../components/DataStatus.vue'
import CustomRouterLink from '../components/CustomRouterLink.vue'
import { mapState } from 'vuex'

export default {
  name: 'RlsEntitySelector',
  components: { DataStatus, CustomRouterLink },
  data () {
    return {
      search: ''
    }
  },
  computed: {
    ...mapState(['rlsEntities']),
    loaded () {
      return this.rlsEntities.length > 0
    },
    results () {
      if (!this.search) {
        return this.rlsEntities
      } else {
        const matchOn = this.search.toLowerCase()

        return this.rlsEntities.filter(entity => entity.entityType.toLowerCase().includes(matchOn) ||
        entity.label.toLowerCase().includes(matchOn) ||
        entity.id.toLowerCase().includes(matchOn))
      }
    }
  }
}
</script>

<style scoped>
a:not(.text-white) > .fa-angle-right {
  color: #000;
}
</style>
