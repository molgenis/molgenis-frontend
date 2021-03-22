<template>
  <div v-if="!loading" id="entity-detail-container" class="mg-mainview">
    <div class="container-fluid">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item" aria-current="page">
            <router-link id="headItemTooltipId" :to="{ name: 'de-view', params: { entity: entityType}, query: $route.query }">
              <b-tooltip
                v-if="tableMeta.description" placement="bottom"
                target="headItemTooltipId"
                triggers="hover"
              >
                {{ tableMeta.description }}
              </b-tooltip>
              {{ tableMeta.label }}
            </router-link>
          </li>
          <li class="breadcrumb-item" aria-current="page">
            <span>
              {{ record[tableMeta.idAttribute.name] }}
            </span>
          </li>
        </ol>
      </nav>

      <h1>Template editor</h1>

      <div class="row">
        <div class="col-12">
          <div>
            <label>Preview</label>
            <div v-if="template" class="template-preview">
              <custom-entity-detail
                :record="record"
                :meta-data="tableMeta" :template="template"
              />
            </div>
            <div v-else class="template-preview p-2 font-italic text-muted">
              No template set for current entity
            </div>
          </div>
        </div>
      </div>

      <hr>

      <div class="row mb-3">
        <div class="col-12">
          <form class="template-editor" @submit.prevent="saveTemplate">
            <label for="template-txt-area" class="form-label">Template</label>
            <textarea
              id="template-txt-area" v-model="template"
              class="form-control"
              rows="6" placeholder="edit me"
            />
            <button type="submit" class="btn btn-primary mt-1" :disabled="isSavingTemplate">
              Save template <font-awesome-icon v-if="isSavingTemplate" icon="spinner" spin />
            </button>
          </form>
        </div>
      </div>

      <div class="row">
        <div class="col-6">
          <div class="card p-2">
            <h5 class="card-title">
              record
            </h5>
            <prop-render class="template-values" :object="record" />
          </div>
        </div>

        <div class="col-6">
          <div class="card p-2">
            <h5 class="card-title">
              metaData
            </h5>
            <prop-render class="template-values" :object="tableMeta" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRowDataWithReferenceLabels } from '@/repository/dataRepository'
import { mapActions, mapState } from 'vuex'
import CustomEntityDetail from '@/components/dataView/CustomEntityDetail.vue'
import PropRender from '@/components/dataView/PropRender.vue'

export default {
  name: 'EditDetailTemplate',
  components: { CustomEntityDetail, PropRender },
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
      isSavingTemplate: false,
      record: null
    }
  },
  computed: {
    ...mapState('explorer', ['tableSettings', 'tableMeta']),
    template: {
      get () {
        return this.tableSettings.customDetailCode ? this.tableSettings.customDetailCode : ''
      },
      set (value) {
        this.tableSettings.customDetailCode = value
      }
    }
  },
  async mounted () {
    this.fetchTablePermissions({ tableName: this.entityType })
    await this.fetchTableMeta({ tableName: this.entityType })
    // Wait for both items to be present, but only the second item is needed.
    const [, data] = await Promise.all([
      this.fetchTableSettings({ tableName: this.entityType }),
      getRowDataWithReferenceLabels(this.entityType, this.entity, this.tableMeta)
    ])
    this.record = data
    this.loading = false
  },
  methods: {
    ...mapActions('explorer', [
      'fetchTablePermissions',
      'fetchTableMeta',
      'fetchTableSettings',
      'saveEntityDetailTemplate'
    ]),
    saveTemplate: async function () {
      this.isSavingTemplate = true
      await this.saveEntityDetailTemplate({ template: this.template })
      this.$router.push({ name: 'entity-detail', params: { entityType: this.entityType, entity: this.entity } })
    }
  }
}
</script>

<style scoped>
  .template-preview {
    border: dashed 1px var(--primary);
    min-height: 100px;
  }

  .template-values {
    font-family: 'Courier New', monospace;
  }

</style>
