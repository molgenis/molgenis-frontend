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
      <div class="col-6">

      <label for="template-props">Active template properties</label>
      <div id="template-props" class="mb-3" v-if="tableSettings.customCardAttrs">
        <span class="badge badge-info ml-1" style="font-size: 1em;" v-for="(attr, index) in tableSettings.customCardAttrs.split(',')" :key="index">
          {{attr}}
        </span>
      </div>

      <label for="record-props">Property options</label>
      <ul id="record-props" v-if="record" class="list-group">
        <li class="list-group-item" v-for="(item, index) in Object.keys(record)" :key="index">
          <template>{{item}}<span v-if="typeof record[item] !== 'object'"> : {{record[item]}}</span></template>
          <ul class="list-group" v-if="typeof record[item] === 'object'">
            <li class="list-group-item" v-for="(subItem, subIndex) in Object.keys(record[item])" :key="index +'_'+ subIndex">
              {{subItem}}: {{record[item][subItem]}}
            </li>
          </ul>
        </li>
      </ul>

      </div>
    </div>
  </div>
</template>

<script>
import CustomCardContent from '@/components/dataView/CustomCardContent'
import ToastComponent from '../components/utils/ToastComponent'
import BreadcrumbBar from '@/components/BreadcrumbBar.vue'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  name: 'TemplateEditor',
  components: { CustomCardContent, ToastComponent },
  computed: {
    ...mapState(['toast', 'tableMeta', 'tableSettings'])
  },
  data () {
    return {
      recordOptions: [],
      selectedOption: null,
      record: null
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
      'fetchRowData',
      'saveTemplate'
    ]),
    async onRecordChange () {
      this.record = await this.fetchRowData({ rowId: this.selectedOption })
    },
    async onSaveTemplate () {
      await this.saveTemplate()
    }
  },
  async mounted () {
    const tableName = this.$route.params.entity
    if (this.tableName !== tableName) {
      await this.fetchTableMeta({ tableName })
      const optionItems = await this.fetchPreviewOptions()
      this.recordOptions = optionItems.items
      this.selectedOption = this.recordOptions[0][this.tableMeta.idAttribute.name]

      this.record = await this.fetchRowData({ rowId: this.selectedOption })

      this.setTableName(tableName)
    }
  }
}
</script>

<style>

</style>
