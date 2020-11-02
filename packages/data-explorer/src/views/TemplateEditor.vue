<template>
  <div class="container-fluid">
    <toast-component
      class="toast-component mt-2"
      v-if="toast"
      :type="toast.type"
      :message="toast.message"
      @toastCloseBtnClicked="clearToast">
    </toast-component>
    <h1 class="mt-3" v-if="tableMeta">{{tableMeta.label}} Card template editor</h1>
    <div class="row mb-3">
      <div class="col-6">

        <form>
          <div class="form-group">
            <label for="exampleFormControlTextarea1">Template</label>
            <textarea
              v-model="tableSettings.customCardCode"
              class="form-control"
              id="exampleFormControlTextarea1" rows="10">
            </textarea>
            <div class="mt-1">
              <button type="button" class="btn btn-primary" @click="onSaveTemplate">Save templete</button>
            </div>
          </div>
        </form>

      </div>

      <div class="col-6">
        <label for="card-preview">Live preview</label>
        <div id="card-preview" class="card mg-explorer-card mb-3">
          <div class="card-body">
            <custom-card-content v-if="tableSettings.customCardCode && record"
              :id="record.id"
              :customCode="tableSettings.customCardCode"
              :record="record">
            </custom-card-content>
          </div>
        </div>
        <div class="row form-group">
          <div class="col-9">
            <label for="record-select">Preview record selector</label>
            <select class="form-control" v-model="selectedOption" @change="onRecordChange()">
              <option
                v-for="option in recordOptions"
                :value="option[tableMeta.idAttribute.name]"
                :key="option[tableMeta.idAttribute.name]">
                {{ option[tableMeta.labelAttribute.name] }}
              </option>
            </select>
          </div>
        </div>
      </div>

    </div>
    <div class="row">
      <div class="col">

      <div class="row mb-3">
        <div class="col-6">
          <label for="template-props">Active template properties</label>
          <div id="template-props" class="mb-3">
            <span class="badge badge-info ml-1 mb-1" style="font-size: 1em;" v-for="(attr, index) in selectedRecordProps" :key="index">
              {{attr}}
            </span>
            <em v-if="!selectedRecordProps.length" class="pl-3">no properties selected</em>
          </div>
        </div>

         <div class="col-6">
          <label for="record-props">Property options</label>
          <editor-property
            id="record-props"
            v-if="recordProps"
            :propertyData="recordProps"
            :selectedRecordProps="customCardAttrs"
            @change="onTemplatePropChange">
          </editor-property>
         </div>
     </div>

      </div>
    </div>
  </div>
</template>

<script>
import CustomCardContent from '@/components/dataView/CustomCardContent'
import EditorProperty from '@/components/editor/EditorProperty'

import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  name: 'TemplateEditor',
  components: { CustomCardContent, EditorProperty },
  data () {
    return {
      /**
       * Data object to serve as template model
       */
      record: null,
      /**
       * Data object containing posible properties to use in template
       */
      recordProps: null,
      /**
       * Data object containing selected properties to use in template
       */
      selectedRecordProps: [],
      /**
       * List of records to use in preview
       */
      recordOptions: [],
      /**
       * Selected record to use in preview
       */
      selectedOption: null
    }
  },
  computed: {
    ...mapState(['toast', 'tableMeta', 'tableSettings']),
    customCardAttrs () {
      return this.tableSettings.customCardAttrs ? this.tableSettings.customCardAttrs.split(',') : []
    }
  },
  methods: {
    ...mapMutations([
      'clearToast',
      'setTableName'
    ]),
    ...mapActions([
      'fetchTableMeta',
      'fetchTableMeta',
      'fetchPreviewOptions',
      'fetchTemplateData',
      'fetchRowData',
      'saveTemplate'
    ]),
    async onRecordChange () {
      this.record = await this.fetchRowData({ rowId: this.selectedOption })
      this.recordProps = await this.fetchRowData({ rowId: this.selectedOption })
    },
    async onSaveTemplate () {
      await this.saveTemplate()
    },
    async onTemplatePropChange (payload) {
      if (payload.isSelected && !this.selectedRecordProps.includes(payload.property)) {
        this.selectedRecordProps.push(payload.property)
      } else {
        this.selectedRecordProps = this.selectedRecordProps.filter(selectedProp => selectedProp !== payload.property)
      }
      this.record = await this.fetchTemplateData({ rowId: this.selectedOption, attrs: this.selectedRecordProps })
    }
  },
  async mounted () {
    const tableName = this.$route.params.entity
    await this.fetchTableMeta({ tableName })
    this.recordOptions = (await this.fetchPreviewOptions()).items
    this.selectedOption = this.recordOptions[0][this.tableMeta.idAttribute.name]

    this.selectedRecordProps = this.customCardAttrs
    this.record = await this.fetchTemplateData({ rowId: this.selectedOption, attrs: this.selectedRecordProps })
    this.recordProps = await this.fetchRowData({ rowId: this.selectedOption })
    this.setTableName(tableName)
  }
}
</script>

<style>

</style>
