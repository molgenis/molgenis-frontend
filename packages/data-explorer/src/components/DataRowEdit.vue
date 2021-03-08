<template>
  <div class="container mt-4">

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
              {{ $t('data-row-edit:data-row-edit-cancel-button-label') }}
            </button>

            <button
              v-if="!isSaving"
              id="save-btn"
              class="btn btn-primary"
              type="submit"
              @click.prevent="onSubmit">
              {{ $t('data-row-edit:data-row-edit-save-button-label') }}
            </button>

            <button
              v-else
              id="save-btn-saving"
              class="btn btn-primary"
              type="button"
              disabled="disabled">
              {{ $t('data-row-edit:data-row-edit-save-busy-state-label') }} <i
              class="fa fa-spinner fa-spin " aria-hidden="true"></i>
            </button>

            <span v-if="!isSaving && formState.$invalid && formState.$touched && saveFailed"
                  class="alert text-danger">
                {{ $t('data-row-edit:data-row-edit-invalid-fields-msg') }}
            </span>
            <span v-else-if="alert && alert.type === 'danger' && alert.message"
                  class="alert text-danger">
                {{ alert.message }}
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
    entity: {
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
      dataTableLabel: '',
      formFields: [],
      formData: {},
      formState: {},
      alert: null,
      showForm: false,
      isSaving: false,
      saveFailed: false,
      formComponentOptions: {
        showEyeButton: true,
        allowAddingOptions: true,
        inputDebounceTime: 500
      },
      showRef: false,
      idAttribute: null,
      labelAttribute: null,
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
        propsData: { entity: referenceTableId, parent: this }
      })
      refDataRowEdit.$mount()

      // Show the reference option form and hide the parent form
      this.setRef(true) // hide parent
      this.$refs.refContainer.appendChild(refDataRowEdit.$el) // show child
    },
    touchField (field) {
      field.children ? field.children.forEach(this.touchField) : this.formState[field.id].$touched = true
    },
    async onSubmit () {
      this.formFields.forEach(this.touchField) // validate all fields

      if (this.formState.$valid) {
        this.isSaving = true
        try {
          const response = await repository.save(this.formData, this.formFields, this.entity, this.dataRowId)
          if (this.parent) {
            const newOptionLocation = response.headers.get('Location')
            const createdRow = await repository.fetchOption(newOptionLocation)
            // Create a new option object to pass to the reference select
            this.parent.optionCreatedCallback({
              id: createdRow[this.idAttribute],
              value: createdRow[this.idAttribute],
              label: createdRow[this.labelAttribute]
            })
            this.showParent()
          } else {
            this.goBackToPluginCaller()
          }
        } catch (e) {
          this.handleError(e)
        }
      } else {
        this.saveFailed = true
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
    setRef (ref) {
      this.showRef = ref
    },
    showParent () {
      this.parent.setRef(false) // show parent
      this.parent.$refs.refContainer.removeChild(this.$el) // destroy child
    },
    handleError (error) {
      const alertMsg = this.errorToMessage(error)
      this.showForm = true
      this.isSaving = false
      this.alert = { message: alertMsg, type: 'danger' }
    },
    errorToMessage (error) {
      if (typeof error === 'string') {
        return error
      } else if (error && Array.isArray(error.errors) && error.errors.length) {
        return `${error.errors[0].message} (${error.errors[0].code})`
      } else {
        return this.$t('data-row-edit:data-row-edit-default-error-message')
      }
    },
    /**
       * Takes molgenis api-v2 metaData object and builds a map from fieldName to referenceEntity name
       * Only field that have a reference entity are included in the map
       */
    buildReferenceMap (metaData) {
      // recursily walk compound
      const flattenAttr = (attr) => attr.attributes && attr.attributes.length ? attr.attributes.flatMap(flattenAttr) : [attr]

      return metaData.attributes
        .flatMap(flattenAttr)
        .filter(attr => Object.prototype.hasOwnProperty.call(attr, 'refEntity'))
        .reduce((accum, attr) => {
          accum[attr.name] = attr.refEntity.name
          return accum
        }, {})
    },
    async fetchTableData (entity, dataRowId) {
      const mapperOptions = {
        showNonVisibleAttributes: true,
        mapperMode: dataRowId ? 'UPDATE' : 'CREATE',
        booleanLabels: {
          trueLabel: this.$t('data-row-edit:data-row-edit-boolean-true'),
          falseLabel: this.$t('data-row-edit:data-row-edit-boolean-false'),
          nillLabel: this.$t('data-row-edit:data-row-edit-boolean-null')
        }
      }
      try {
        const resp = await repository.fetch(entity, dataRowId)
        this.idAttribute = resp.meta.idAttribute
        this.labelAttribute = resp.meta.labelAttribute
        this.referenceMap = this.buildReferenceMap(resp.meta)
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
    this.fetchTableData(this.entity, this.dataRowId)
  },
  components: {
    FormComponent
  }
}
</script>
