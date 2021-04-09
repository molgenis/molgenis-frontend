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
      <h1>
        Template editor
      </h1>
      <div class="my-3">
        <b-card no-body>
          <b-tabs pills card vertical>
            <!-- Record -->
            <b-tab title="Record properties" class="property-tab" active>
              <em class="font-weight-light">Example usage: record.id</em>
              <prop-render class="template-values mt-2" :object="record" />
            </b-tab>
            <!-- MetaData -->
            <b-tab title="Metadata properties" class="property-tab">
              <em class="font-weight-light">Example usage: metaData.id</em>
              <prop-render class="template-values mt-2" :object="tableMeta" />
            </b-tab>
            <!-- Components -->
            <b-tab title="Components" class="property-tab">
              <table class="table table-striped">
                <thead>
                  <th>
                    Component:
                  </th>
                  <th>Code:</th>
                </thead>
                <tbody>
                  <tr>
                    <td>Shoppingcart Button</td>
                    <td>&lt;shopping-cart-button :id="record.id" /&gt;</td>
                  </tr>
                </tbody>
              </table>
            </b-tab>
            <!-- Editor Options -->
            <b-tab title="Editor options">
              <button class="btn btn-outline-primary" @click="landscapeMode = !landscapeMode">
                Set {{ landscapeMode ? "Portrait" : "Landscape" }}
              </button>
            </b-tab>
          </b-tabs>
        </b-card>
      </div>
      <div 
        class="d-flex w-100 flex-wrap"
        :class="{ 'flex-column': landscapeMode }"
      >
        <div 
          class="mr-3 mt-3"
          :class="[{'w-100': landscapeMode}, {'w-50': !landscapeMode}]"
        >
          <!-- Editor -->
          <span class="font-weight-bold mb-1">Template</span>
          <form-component
            id="template"
            class="border-top"
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
        <div
          class="preview-container mt-3"
          :class="[{'w-100': landscapeMode}, {'ml-auto': !landscapeMode}]"
        >
          <span class="font-weight-bold mb-1">Preview</span>
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
    </div>
  </div>
</template>

<script>
import { defaultDetailsView } from '@/lib/defaultTemplate/defaultDetailsView'
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
      landscapeMode: false,
      currentTemplate: '',
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
      return defaultDetailsView
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
  created() {
    // if we have a small screen we still want to use the editor
    if(window.innerWidth < 1420) {
      this.landscapeMode = true;
    }
  },
}
</script>

<style scoped>

  .preview-container {
    min-width: 42rem;
    width: 48%;
  }

  .template-preview {
    max-height: 75vh;
    overflow: auto;
  }

  .template-values {
    font-family: 'Courier New', monospace;
  }

  .property-tab {
    height: 200px;
    max-height: 200px;
    overflow: auto;
  }

  /* 
    ::v-deep is the stylelint accepted version, does the same as >>> and /deep/ 
    >>> is the deep selector for plain css (if you don't use stylelint)
    /deep/ is the scss selector
  */

  ::v-deep label[for='template'] {
    display: none;
  }

  ::v-deep .CodeMirror {
    height: 25.25rem !important;
  }

  ::v-deep #template-description {
    margin-left: 1rem;
  }
</style>
