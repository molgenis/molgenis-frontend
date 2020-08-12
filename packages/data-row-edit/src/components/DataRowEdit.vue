<template>
  <div class="container">

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

      <h1>{{dataTableLabel}}</h1>

      <form-component
        id="data-row-edit-form"
        :formFields="formFields"
        :initialFormData="formData"
        :formState="formState"
        @valueChange="onValueChanged">
      </form-component>

      <div class="row">
        <div class="col-md-12">
          <button
            id="cancel-btn"
            @click.prevent="goBackToPluginCaller"
            class="btn btn-secondary mr-1">
            {{ 'data-row-edit-cancel-button-label' | i18n }}
          </button>

          <button
            v-if="!isSaving"
            id="save-btn"
            class="btn btn-primary"
            type="submit"
            @click.prevent="onSubmit">
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

          <span v-if="!isSaving && formState.$invalid && formState.$touched && saveFailed"
                class="alert text-danger">
              {{ 'data-row-edit-invalid-fields-msg' | i18n }}
          </span>
        </div>
      </div>

    </div>
    <div v-else class=""><i class="fa fa-spinner fa-spin fa-3x" aria-hidden="true"></i></div>
  </div>

</template>

<script>
import { FormComponent, EntityToFormMapper } from '@molgenis/molgenis-ui-form'
import '../../node_modules/@molgenis/molgenis-ui-form/dist/static/css/molgenis-ui-form.css'
import * as repository from '@/repository/dataRowRepository'

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
        saveFailed: false
      }
    },
    methods: {
      onValueChanged (updatedFormData) {
        this.formData = updatedFormData
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
            await repository.save(this.formData, this.formFields, this.dataTableId, this.dataRowId)
            this.goBackToPluginCaller()
          } catch (e) {
            this.handleError(e)
          }
        } else {
          this.saveFailed = true
        }
      },
      goBackToPluginCaller () {
        window.history.go(-1)
      },
      clearAlert () {
        this.alert = null
      },
      handleError (message) {
        this.alert = {
          message: typeof message !== 'string' ? this.$t('data-row-edit-default-error-message')
            : message,
          type: 'danger'
        }
        this.showForm = true
        this.isSaving = false
      }
    },
    created: async function () {
      const mapperOptions = {
        showNonVisibleAttributes: true,
        mapperMode: this.dataRowId ? 'UPDATE' : 'CREATE',
        booleanLabels: {
          trueLabel: this.$t('data-row-edit-boolean-true'),
          falseLabel: this.$t('data-row-edit-boolean-false'),
          nillLabel: this.$t('data-row-edit-boolean-null')
        }
      }
      try {
        const resp = await repository.fetch(this.dataTableId, this.dataRowId)
        this.dataTableLabel = resp.meta.label
        const mappedData = EntityToFormMapper.generateForm(resp.meta, resp.rowData, mapperOptions)
        this.formFields = mappedData.formFields
        this.formData = mappedData.formData
        this.showForm = true
      } catch (e) {
        this.handleError(e)
      }
    },
    components: {
      FormComponent
    }
}
</script>
