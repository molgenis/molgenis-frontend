<template>
  <div v-if="!loading" id="entity-detail-container" class="mg-mainview">
    <div class="ml-2">
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
      <div class="d-flex w-100 flex-wrap">
        <div class="w-50 mr-3 align-self-stretch">
          <!-- Editor -->
          <label>Template</label>
          <div class="border">
            <form-component
              id="template"
              :options="{ showEyeButton: false }"
              :form-fields="formFields"
              :initial-form-data="{ template: template }"
              @valueChange="template = $event.template"
            />
            <button 
              class="btn btn-primary mb-2 ml-2" 
              type="submit" 
              :disabled="isSavingTemplate"
              @click.prevent="saveTemplate"
            >
              Save template <font-awesome-icon v-if="isSavingTemplate" icon="spinner" spin />
            </button>
          </div>
        </div>
        <div class="ml-auto preview-container">
          <label>Preview</label>
          <div v-if="template" class="template-preview border">
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
      <!-- Context -->
      <div>
        <label class="mt-3">Context</label>
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
  </div>
</template>

<script>
import { getRowDataWithReferenceLabels } from '@/repository/dataRepository'
import { mapActions, mapState } from 'vuex'
import CustomEntityDetail from '@/components/dataView/CustomEntityDetail.vue'
import PropRender from '@/components/dataView/PropRender.vue'
import { FormComponent } from '@molgenis/molgenis-ui-form'

export default {
  name: 'EditDetailTemplate',
  components: { CustomEntityDetail, PropRender, FormComponent },
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
      record: null,
      formFields: [
        {
          id: 'template',
          label: 'Template',
          description: 'Edit the template to change the layout, use record.[property-name] and metaData.[property-name] to refer to the entity (meta)data.',
          type: 'script',
          visible: () => true,
          required: () => false,
          validate: () => true
        }
      ],
      formState: {}
    }
  },
  computed: {
    ...mapState('explorer', ['tableSettings', 'tableMeta']),
    template: {
      get () {
        return this.tableSettings.customDetailCode ? this.tableSettings.customDetailCode : this.baseTemplate()
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
    },
    baseTemplate() {
      return `
<div class="d-flex m-2">
	<h2>{{ record.label || record.name }}</h2>
	<div class="ml-auto"><shopping-cart-button :id="record.id" />
	</div>
</div>
<ul class="list-group list-group-flush">
	<li v-for="(value, propertyName, index) in record" :key="index" class="list-group-item border-0">
		<h5>{{ propertyName }}</h5>
		<template v-if="!isObject(value)">
			<p>{{ value }}</p>
		</template>
		<template v-else-if="isArray(value)">
			{{ value.map(v => v.label).join(', ') }}
		</template>
		<template v-else>
			<ul class="list-group list-group-flush">
				<li v-for="(refValue, refPropertyName, refIndex) in value" :key="refIndex" class="list-group-item border-0">
					<h5>{{ refPropertyName }}</h5>
					<p>{{ refValue }}</p>
				</li>
			</ul>
		</template>
	</li>
 </ul>`
    }
  }
}
</script>

<style scoped>

  .preview-container {
    min-width: 42rem;
    width: 48%;
  }

  .template-values {
    font-family: 'Courier New', monospace;
  }

  >>> label[for='template'] {
    display: none;
  }

  >>> .CodeMirror {
    height: 25.25rem !important;
  }
</style>
