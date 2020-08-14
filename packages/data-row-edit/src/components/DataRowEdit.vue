<template>
  <div class="container">

    <div v-show="!showRef">

      <!-- Alert container -->
      <div class="row">
        <div class="col-md-12">
          <div id="alert-message" v-if="alert" :class="'alert alert-' + alert.type" role="alert">
            <button @click="clearAlert()" type="button" class="close">
              <span aria-hidden="true">&times;</span>
            </button>
            <span id="message-span">{{alert.message}}</span>
          </div>
        </div>
      </div>

      <div v-if="showForm">

        <nav  v-if="parent" aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#" v-on:click.prevent="showParent()">{{parent.dataTableLabel}} </a></li>
            <li class="breadcrumb-item active" aria-current="page">{{dataTableLabel}}</li>
          </ol>
        </nav>
        <h1>{{dataTableLabel}}</h1>

        <form-component
          id="data-row-edit-form"
          :formFields="formFields"
          :initialFormData="formData"
          :formState="formState"
          :options="formComponentOptions"
          @valueChange="onValueChanged"
          @addOptionRequest="onAddOptionRequest">
        </form-component>

        <div class="row">
          <div class="col-md-12">
            <button
              id="cancel-btn"
              @click.prevent="onCancelClick"
              class="btn btn-secondary mr-1">
              {{ 'data-row-edit-cancel-button-label' | i18n }}
            </button>

            <button
              v-if="!isSaving"
              id="save-btn"
              class="btn btn-primary"
              type="submit"
              @click.prevent="onSubmit"
              :disabled="formState.$invalid && formState.$touched">
              {{ 'data-row-edit-save-button-label' | i18n }}
            </button>

            <button
              v-else
              id="save-btn-saving"
              class="btn btn-primary"
              type="button"
              disabled="disabled">
              {{ 'data-row-edit-save-busy-state-label' | i18n }} <i
              class="fa fa-spinner fa-spin " aria-hidden="true"></i>
            </button>

            <span v-if="!isSaving && formState.$invalid && formState.$touched"
                  class="alert text-danger">
                {{ 'data-row-edit-invalid-fields-msg' | i18n }}
            </span>
          </div>
        </div>

      </div>
      <div v-else class=""><i class="fa fa-spinner fa-spin fa-3x" aria-hidden="true"></i></div>

    </div>

    <div ref="refContainer"></div>

  </div>

</template>

<script>
import { FormComponent, EntityToFormMapper } from '@molgenis/molgenis-ui-form'
import '../../node_modules/@molgenis/molgenis-ui-form/dist/static/css/molgenis-ui-form.css'
import * as repository from '@/repository/dataRowRepository'
import DataRowEdit from '@/components/DataRowEdit'
import Vue from 'vue'

export default {
  name: 'DataRowEdit',
    props: {
      dataTableId: {
        type: String,
        required: true
      },
      dataRowId: {
        type: String,
        required: false,
        default: null
      },
      parent: {
        type: Object,
        required: false,
        default: null
      }
    },
    data () {
      return {
        dataExplorerBaseUrl: window.__INITIAL_STATE__.dataExplorerBaseUrl,
        dataTableLabel: '',
        formFields: [],
        formData: {},
        formState: {},
        alert: null,
        showForm: false,
        isSaving: false,
        formComponentOptions: {
          showEyeButton: true,
          allowAddingOptions: true,
          inputDebounceTime: 500
        }, 
        showRef: false,
        referenceMap: {} // Map from field id to entityName for all reference entities 
      }
    },
    methods: {
      onValueChanged (updatedFormData) {
        this.formData = updatedFormData
      },
      onAddOptionRequest (optionCreatedCallback, event, sourceField) {
        // Translate the reference field id (short name) into a tableId (full molgenis name)
        const referenceTableId = this.referenceMap[sourceField.id]

        // Store the afterOption creation callback on the parent
        this.optionCreatedCallback = optionCreatedCallback

        // Create a new child DataRowEdit for the reference option passing the parent for context
        const ComponentClass = Vue.extend(DataRowEdit)
        const refDataRowEdit = new ComponentClass({
            propsData: { dataTableId: referenceTableId, parent: this }
        })
        refDataRowEdit.$mount() 

        // Show the reference option form and hide the parent form
        this.showRef = true // hide parent
        this.$refs.refContainer.appendChild(refDataRowEdit.$el) // show child
      },
      async onSubmit () {
        const formState = this.formState
        this.formFields
          .filter(field => field.type !== 'field-group') // field-groups have no validation to show
          .forEach((field) => {
            const fieldState = formState[field.id]
            fieldState.$touched = true // trigger field to show validation result to user
          })
        if (this.formState.$valid) {
          this.isSaving = true
          try {
            const response = await repository.save(this.formData, this.formFields, this.dataTableId, this.dataRowId)
            if (this.parent) {
              const newOptionLocation = response.headers.get('Location');
              const createdRow = await repository.fetchOption(newOptionLocation)
              // Create a new option object to pass to the reference select
              this.parent.optionCreatedCallback({id: createdRow.id, value: createdRow.id, label: createdRow.label})
              this.showParent()
            } else {
              this.goBackToPluginCaller()
            }
          
          } catch (e) {
            this.handleError(e)
          }
        }
      },
      onCancelClick () {
        this.parent ? this.showParent() : this.goBackToPluginCaller()
      },
      goBackToPluginCaller () {
        window.history.go(-1)
      },
      clearAlert () {
        this.alert = null
      },
      showParent () {
        this.parent.showRef = false // show parent
        this.parent.$refs.refContainer.removeChild(this.$el) // destroy child
      },
      handleError (message) {
        this.alert = {
          message: typeof message !== 'string' ? this.$t('data-row-edit-default-error-message')
            : message,
          type: 'danger'
        }
        this.showForm = true
        this.isSaving = false
      },
      /**
       * Takes molgenis api-v2 metaData object and build map from fieldName to referenceEntity name
       * Only field that have a reference entity are included in the map
       */
      buildReferenceMap (metaData) {
        this.referenceMap = metaData.attributes
          .filter(attr => Object.prototype.hasOwnProperty.call(attr, 'refEntity'))
          .reduce((accum, attr) => {
            accum[attr.name] = attr.refEntity.name
            return accum
          }, {})
      },
      async fetchTableData (dataTableId, dataRowId) {
        const mapperOptions = {
          showNonVisibleAttributes: true,
          mapperMode: dataRowId ? 'UPDATE' : 'CREATE',
          booleanLabels: {
            trueLabel: this.$t('data-row-edit-boolean-true'),
            falseLabel: this.$t('data-row-edit-boolean-false'),
            nillLabel: this.$t('data-row-edit-boolean-null')
          }
        }
        try {
          const resp = await repository.fetch(dataTableId, dataRowId)
          this.buildReferenceMap(resp.meta)
          this.dataTableLabel = resp.meta.label
          const mappedData = EntityToFormMapper.generateForm(resp.meta, resp.rowData, mapperOptions)
          this.formFields = mappedData.formFields
          this.formData = mappedData.formData
          this.showForm = true
        } catch (e) {
          this.handleError(e)
        }
      }
    },
    created: async function () {
      this.fetchTableData(this.dataTableId, this.dataRowId)
    },
    components: {
      FormComponent
    }
}
</script>
