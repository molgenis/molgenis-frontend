<template>
  <div class="container">
    <b-alert v-if="showValidationError" variant="danger" show dismissible>
      {{ 'scripts-save-error' | i18n }}
    </b-alert>
    <h1>{{form.name}}</h1>
    <CodeEditor v-if="loaded" @valueChange="onValueChange" :initialData="form.content">
      <ExecuteButton :disabled="(!contentValidation)" :doSave="true" :form="form" size="sm" :parameters="form.parameters" :name="form.name">{{ 'scripts-save-and-run' | i18n }}</ExecuteButton>
    </CodeEditor>
    <b-row class="mb-3">
      <b-col sm="4" class="border-right">
        <label>{{ 'scripts-type-label' | i18n }}</label>
        <b-form-select v-model="form.type">
          <option v-for="(type, index) in scriptTypes" :key="`type-${index}`" :value="type">{{type}}</option>
        </b-form-select>
      </b-col>
      <b-col sm="4" class="border-right">
        <label>{{ 'scripts-result-file-extension' | i18n }}</label>
        <b-form-input id="name" type="text" v-model='form.resultFileExtension' placeholder=""/>
      </b-col>
      <b-col sm="4">
        <label class="mb-3">{{ 'scripts-generate-security-token' | i18n }}</label>
        <b-form-radio-group id="generateToken" v-model="form.generateToken" name="generateToken">
          <b-form-radio :value="true">{{ 'scripts-true-label' | i18n }}</b-form-radio>
          <b-form-radio :value="false">{{ 'scripts-false-label' | i18n }}</b-form-radio>
        </b-form-radio-group>
        <small v-if="form.generateToken">{{ 'scripts-please-use' | i18n }}: <code>${molgenisToken}</code></small>
      </b-col>
    </b-row>
    <div class="mb-4">
      <button id="cancel-btn" class="btn btn-secondary mr-3" type="reset" @click.prevent="onCancel">{{ 'scripts-cancel-label' | i18n }}</button>
      <button :disabled="(!contentValidation)" id="save-btn" class="btn btn-primary mr-3" type="submit" @click.prevent="onSubmit">{{ 'scripts-save-label' | i18n }}</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CodeEditor from '../components/CodeEditor'
import ExecuteButton from '../components/ExecuteButton'

export default {
  name: 'EditScript',
  data () {
    return {
      id: 0,
      showValidationError: false,
      form: {
        name: '',
        type: '',
        generateToken: 'false',
        resultFileExtension: '',
        content: '',
        parameters: []
      }
    }
  },
  computed: {
    ...mapState(['scriptTypes', 'scripts', 'loaded']),
    contentValidation () {
      return this.form.content.length > 0
    }
  },
  watch: {
    scripts (scripts) {
      this.updateForm(scripts)
    }
  },
  methods: {
    updateForm (data) {
      if (data.hasOwnProperty('items')) {
        let scriptData = []
        if (data.items.length > 0) {
          scriptData = data.items.find(obj => {
            return obj.name === this.id
          })
        }
        this.form.name = scriptData.name
        this.form.type = scriptData.type.name
        this.form.generateToken = scriptData.generateToken
        this.form.resultFileExtension = scriptData.resultFileExtension
        this.form.content = scriptData.content
        this.form.parameters = scriptData.parameters.map(parameter => parameter.name)
      }
    },
    onSubmit () {
      this.$store.dispatch('saveParametersAndScripts', this.form).then(() => {
        this.$router.push({ name: 'scripts' })
      }, (error) => {
        this.onError(error)
      })
    },
    onError () {
      this.showValidationError = true
    },
    onCancel () {
      this.$router.push({ name: 'scripts' })
    },
    onValueChange ({ parameters, content }) {
      this.form.parameters = parameters
      this.form.content = content
    }
  },
  created () {
    this.id = this.$route.params.id
    this.updateForm(this.scripts)
  },
  components: {
    CodeEditor, ExecuteButton
  }
}
</script>
