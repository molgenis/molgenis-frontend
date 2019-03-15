<template>
  <div class="container">
    <b-alert v-if="showValidationError" variant="danger" show dismissible>
      {{ 'scripts-save-error' | i18n }}
    </b-alert>
    <b-row class="mb-3">
      <b-col sm="9">
        <label>{{ 'scripts-name-label' | i18n }} *</label>
        <b-form-input :state="nameValidation" id="name" type="text" v-model="form.name"/>
        <b-form-invalid-feedback :state="nameValidation">
          {{ 'scripts-unique-error' | i18n }}
        </b-form-invalid-feedback>
      </b-col>
      <b-col sm="3">
        <label>{{ 'scripts-type-label' | i18n }}</label>
        <b-form-select v-model="form.type">
          <option v-for="(type, index) in scriptTypes" :key="`type-${index}`" :value="type">{{type}}</option>
        </b-form-select>
      </b-col>
    </b-row>
    <CodeEditor @valueChange="onValueChange" />
    <b-row class="mb-3">
      <b-col sm="4" class="border-right">
        <label>{{ 'scripts-result-file-extension' | i18n }}</label>
        <b-form-input id="name" type="text" v-model='form.resultFileExtension' placeholder=""/>
      </b-col>
      <b-col sm="4">
        <label class="mb-3">{{ 'scripts-generate-security-token' | i18n }}</label>
        <b-form-radio-group id="generateToken" v-model="form.generateToken" name="generateToken">
          <b-form-radio value="true">{{ 'scripts-true-label' | i18n }}</b-form-radio>
          <b-form-radio value="false">{{ 'scripts-false-label' | i18n }}</b-form-radio>
        </b-form-radio-group>
        <small v-if="form.generateToken=='true'">{{ 'scripts-please-use' | i18n }}: <code>${molgenisToken}</code></small>
      </b-col>
      <b-col sm="4">
      </b-col>
    </b-row>
    <div class="mb-4">
      <button id="cancel-btn" class="btn btn-secondary mr-3" type="reset" @click.prevent="onCancel">{{ 'scripts-cancel-label' | i18n }}</button>
      <button :disabled="(!nameValidation || !contentValidation)" d="save-btn" class="btn btn-primary" type="submit" @click.prevent="onSubmit">{{ 'scripts-save-label' | i18n }}</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CodeEditor from '../components/CodeEditor'

export default {
  name: 'NewScript',
  data () {
    return {
      showValidationError: false,
      nameChanged: false,
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
    nameValidation () {
      return this.nameChanged ? (this.form.name.length > 0 && this.isUniqueName) : null
    },
    contentValidation () {
      return this.form.content.length > 0
    },
    formName () {
      return this.form.name
    },
    isUniqueName () {
      if (this.loaded) {
        return !this.scripts.items.some((script) => {
          return this.form.name === script.name
        })
      }
      return true
    }
  },
  watch: {
    formName: function () {
      this.nameChanged = true
    },
    scriptTypes: function (types) {
      this.form.type = types[0]
    }
  },
  methods: {
    onSubmit () {
      this.nameChanged = true
      if (this.nameValidation && this.form.name !== '') {
        this.$store.dispatch('newParametersAndScripts', this.form).then(() => {
          this.$router.push({ name: 'scripts' })
        }, (error) => {
          this.onError(error)
        })
      }
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
    this.form.type = this.scriptTypes[0]
  },
  components: {
    CodeEditor
  }
}
</script>
