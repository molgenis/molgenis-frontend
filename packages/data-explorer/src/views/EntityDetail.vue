<template>

  <div v-if="!loading" id="entity-detail-container" class="mg-mainview">
    <div class="container-fluid">

      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item" aria-current="page">
            <router-link id="headItemTooltipID" :to="{ name: 'de-view', params: { entity: entityType} }">
            <b-tooltip v-if="metaData.description" placement="bottom" target="headItemTooltipID" triggers="hover">
              {{ metaData.description }}
            </b-tooltip>
            {{ metaData.label }}
            </router-link>
          </li>
          <li class="breadcrumb-item" aria-current="page">
            <span>
               {{record[metaData.idAttribute.name]}}
            </span>
          </li>
        </ol>
      </nav>
    </div>

    <div class="btn-group float-right pr-3 mr-3" role="group" aria-label="row actions group">

      <router-link
        v-if="hasAddRights"
        class="btn btn-outline-secondary"
        v-b-tooltip.hover.bottom
        :title="$t('dataexplorer_add_entity_btn_tooltip')"
        :to="{ name: 'de-create', params: { entity: entityType }}"
      >
        <font-awesome-icon icon="plus-square"></font-awesome-icon>
      </router-link>

      <router-link
        v-if="hasEditRights"
        class="btn btn-outline-secondary"
        v-b-tooltip.hover.bottom
        :title="$t('dataexplorer_row_action_edit_btn_tooltip')"
        :to="{ name: 'de-edit', params: { entity: entityType, dataRowId: entity}}"
      >
        <font-awesome-icon icon="edit"></font-awesome-icon>
      </router-link>

      <button
      v-if="hasDeleteRights"
      class="btn btn-outline-secondary delete-btn"
      role="button"
      v-b-tooltip.hover.bottom
      :title="$t('dataexplorer_row_action_delete_btn_tooltip')"
      @click="deleteEntity">
        <font-awesome-icon icon="trash"></font-awesome-icon>
      </button>

    </div>

    <ul class="list-group list-group-flush">
      <li class="list-group-item" v-for="(value, propertyName, index) in record" :key="index">
        <h5>{{propertyName}}</h5>
        <template v-if="typeof value !== 'object'">
           <p>{{value}}</p>
        </template>
        <template v-else-if="Array.isArray(value)">
          {{value.map(v => v.label).join(', ')}}
        </template>
        <template v-else>
          <ul class="list-group list-group-flush">
            <li class="list-group-item" v-for="(value, propertyName, refIndex) in value" :key="refIndex">
              <h5>{{propertyName}}</h5>
              <p>{{value}}</p>
            </li>
          </ul>
        </template>
      </li>
    </ul>

  </div>

</template>

<script>
import { fetchMetaDataById } from '@/repository/metaDataRepository'
import { getRowDataWithReferenceLabels } from '@/repository/dataRepository'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'EntityDetail',
  props: ['entityType', 'entity'],
  data () {
    return {
      loading: true,
      metaData: null,
      record: null
    }
  },
  computed: {
    ...mapGetters([
      'hasAddRights',
      'hasEditRights',
      'hasDeleteRights'
    ])
  },
  methods: {
    ...mapActions(['fetchTablePermissions', 'deleteRow']),
    async deleteEntity () {
      const msg = this.$t('dataexplorer_delete_confirm_msg')
      const isDeleteConfirmed = await this.$bvModal.msgBoxConfirm(msg, {
        okVariant: 'danger',
        okTitle: this.$t('dataexplorer_delete_confirm_approve'),
        cancelTitle: this.$t('dataexplorer_delete_confirm_cancel'),
        hideHeaderClose: false,
        centered: true
      })
      if (isDeleteConfirmed) {
        await this.deleteRow({ rowId: this.entity })
        this.router.replace({ name: 'de-view', params: { entity: this.entityType } })
      }
    }
  },
  async mounted () {
    this.fetchTablePermissions({ tableName: this.entityType })
    this.metaData = await fetchMetaDataById(this.entityType)
    this.record = await getRowDataWithReferenceLabels(this.entityType, this.entity, this.metaData)
    this.loading = false
  }
}
</script>

<style scoped>
  .mg-mainview {
    padding: 16px;
  }
  .list-group .list-group-item {
    color: #495057;
  }
</style>
