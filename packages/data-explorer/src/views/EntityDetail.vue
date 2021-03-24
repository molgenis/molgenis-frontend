<template>
  <div v-if="!loading" id="entity-detail-container" class="mg-mainview">
    <div class="container-fluid">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item" aria-current="page">
            <router-link id="headItemTooltipId" :to="{ name: 'de-view', params: { entity: entityType}, query: $route.query }">
              <b-tooltip
                v-if="metaData.description" placement="bottom"
                target="headItemTooltipId"
                triggers="hover"
              >
                {{ metaData.description }}
              </b-tooltip>
              {{ metaData.label }}
            </router-link>
          </li>
          <li class="breadcrumb-item" aria-current="page">
            <span>
              {{ record[metaData.idAttribute.name] }}
            </span>
          </li>
        </ol>
      </nav>
    </div>

    <div class="btn-group float-right pr-3 mr-3" role="group" aria-label="row actions group">
      <router-link
        v-if="hasAddRights"
        v-b-tooltip.hover.bottom
        class="btn btn-outline-secondary"
        :title="$t('dataexplorer_add_entity_btn_tooltip')"
        :to="{ name: 'de-create', params: { entity: entityType }}"
      >
        <font-awesome-icon icon="plus-square" />
      </router-link>

      <router-link
        v-if="hasEditRights"
        v-b-tooltip.hover.bottom
        class="btn btn-outline-secondary"
        :title="$t('dataexplorer_row_action_edit_btn_tooltip')"
        :to="{ name: 'de-edit', params: { entity: entityType, dataRowId: entity}}"
      >
        <font-awesome-icon icon="edit" />
      </router-link>

      <button
        v-if="hasDeleteRights"
        v-b-tooltip.hover.bottom
        class="btn btn-outline-secondary delete-btn"
        role="button"
        :title="$t('dataexplorer_row_action_delete_btn_tooltip')"
        @click="deleteEntity"
      >
        <font-awesome-icon icon="trash" />
      </button>

      <router-link
        v-if="hasEditSettingsRights"
        v-b-tooltip.hover.bottom
        class="btn btn-outline-secondary"
        title="Edit template"
        :to="{ name: 'edit-detail-template', params: { entityType, entity}}"
      >
        <font-awesome-icon icon="cog" />
      </router-link>
    </div>

    <template v-if="customDetailCode">
      <custom-entity-detail :record="record" :meta-data="metaData" :template="customDetailCode" />
    </template>
    <template v-else>
      <default-entity-detail :record="record" :meta-data="metaData" />
    </template>
  </div>
</template>

<script>
import { fetchMetaDataById } from '@/repository/metaDataRepository'
import { getRowDataWithReferenceLabels } from '@/repository/dataRepository'
import { mapActions, mapGetters, mapState } from 'vuex'
import DefaultEntityDetail from '@/components/dataView/DefaultEntityDetail.vue'
import CustomEntityDetail from '@/components/dataView/CustomEntityDetail.vue'

export default {
  name: 'EntityDetail',
  components: { DefaultEntityDetail, CustomEntityDetail },
  props: {
    entityType: {
      type: String,
      required: true
    },
    entity: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      loading: true,
      metaData: null,
      record: null
    }
  },
  computed: {
    ...mapState('explorer', {
      customDetailCode: state => state.tableSettings.customDetailCode
    }),
    ...mapGetters('explorer', [
      'hasAddRights',
      'hasEditRights',
      'hasDeleteRights',
      'hasEditSettingsRights'
    ])
  },
  async mounted () {
    this.fetchTablePermissions({ tableName: this.entityType })
    this.metaData = await fetchMetaDataById(this.entityType)
    const [, data] = await Promise.all([
      this.fetchTableSettings({ tableName: this.entityType }),
      getRowDataWithReferenceLabels(this.entityType, this.entity, this.metaData)
    ])
    this.record = data
    this.loading = false
  },
  methods: {
    ...mapActions('explorer', [
      'fetchTablePermissions',
      'fetchTableSettings',
      'deleteRow'
    ]),
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
  }
}
</script>
