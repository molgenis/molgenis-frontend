<template>

  <div v-if="!loading" id="entity-detail-container" class="mg-mainview">
    <div class="container-fluid">

      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item" aria-current="page">
            <router-link id="headItemTooltipID" :to="{ name: 'de-view', params: { entity: entityType} }">
            <b-tooltip v-if="tableMeta.description" placement="bottom" target="headItemTooltipID" triggers="hover">
              {{ tableMeta.description }}
            </b-tooltip>
            {{ tableMeta.label }}
            </router-link>
          </li>
          <li class="breadcrumb-item" aria-current="page">
            <span>
               {{record[tableMeta.idAttribute.name]}}
            </span>
          </li>
        </ol>
      </nav>

    <h1>Template editor</h1>

    <div class="row">
      <div class="col-12">
        <div>
          <label>Preview</label>
          <custom-entity-detail v-if="template" class="template-preview" :record="record" :metaData="tableMeta" :template="template" ></custom-entity-detail>
          <div v-else class="template-preview p-2 font-italic text-muted">No template set for current entity</div>
        </div>
      </div>
    </div>

    <hr/>

    <div class="row mb-3">
      <div class="col-12">
        <form class="template-editor" v-on:submit.prevent="saveTemplate">
          <label for="template-txt-area" class="form-label">Template</label>
          <textarea class="form-control" id="template-txt-area" rows="6"  v-model="template" placeholder="edit me"></textarea>
          <button type="submit" class="btn btn-primary mt-1" :disabled="isSavingTemplate">
            Save template <font-awesome-icon v-if="isSavingTemplate" icon="spinner" spin></font-awesome-icon></button>
        </form>
      </div>
    </div>

    <div class="row">

      <div class="col-6">
        <div class="card p-2">
          <h5 class="card-title">record</h5>
          <prop-render class="template-values" :object="record"></prop-render>
        </div>
      </div>

      <div class="col-6">
        <div class="card p-2">
          <h5 class="card-title">metaData</h5>
          <prop-render class="template-values" :object="tableMeta"></prop-render>
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
  props: ['entityType', 'entity'],
  components: { CustomEntityDetail, PropRender },
  data () {
    return {
      loading: true,
      isSavingTemplate: false,
      record: null
    }
  },
  computed: {
    ...mapState(['tableSettings', 'tableMeta']),
    template: {
      get () {
        return this.tableSettings.customDetailCode ? this.tableSettings.customDetailCode : ''
      },
      set (value) {
        this.tableSettings.customDetailCode = value
      }
    }
  },
  methods: {
    ...mapActions(['fetchTablePermissions', 'fetchTableMeta', 'fetchTableSettings', 'saveEntityDetailTemplate']),
    saveTemplate: async function () {
      this.isSavingTemplate = true
      await this.saveEntityDetailTemplate({ template: this.template })
      this.$router.push({ name: 'entity-detail', params: { entityType: this.entityType, entity: this.entity } })
    }
  },
  async mounted () {
    this.fetchTablePermissions({ tableName: this.entityType })
    await this.fetchTableMeta({ tableName: this.entityType })
    const [, data] = await Promise.all([
      this.fetchTableSettings({ tableName: this.entityType }),
      getRowDataWithReferenceLabels(this.entityType, this.entity, this.tableMeta)
    ])
    this.record = data
    this.loading = false
  }
}
</script>

<style scoped>
  .mg-mainview {
    padding: 16px;
  }

  .template-preview {
    min-height: 100px;
    border: dashed 1px blue;
  }

  .template-values {
    font-family: 'Courier New', monospace;
  }

</style>
