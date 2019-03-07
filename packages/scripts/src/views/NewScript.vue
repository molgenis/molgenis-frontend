<template>
  <div class="container">
    <b-alert v-if="showValidationError" variant="danger" show dismissible>
      Error on saving data
    </b-alert>
    <b-row class="mb-3">
      <b-col sm="9">
        <label>Name *</label>
        <b-form-input :state="nameValidation" id="name" type="text" v-model="form.name"/>
        <b-form-invalid-feedback :state="nameValidation">
          This field is required, and needs to be unique.
        </b-form-invalid-feedback>
      </b-col>
      <b-col sm="3">
        <label>Type</label>
        <b-form-select v-model="form.type">
          <option v-for="(type, index) in scriptTypes" :key="`type-${index}`" :value="type">{{type}}</option>
        </b-form-select>
      </b-col>
    </b-row>
    <CodeEditor @valueChange="onValueChange" />
    <b-row class="mb-3">
      <b-col sm="4" class="border-right">
        <label>Result file extension</label>
        <b-form-input id="name" type="text" v-model='form.resultFileExtension' placeholder=""/>
      </b-col>
      <b-col sm="4">
        <label class="mb-3">Generate security token</label>
        <b-form-radio-group id="generateToken" v-model="form.generateToken" name="generateToken">
          <b-form-radio value="true">True</b-form-radio>
          <b-form-radio value="false">False</b-form-radio>
          <b-form-radio value="">N/A</b-form-radio>
        </b-form-radio-group>
        <small v-if="form.generateToken=='true'">Please use: <code>${molgenisToken}</code></small>
      </b-col>
      <b-col sm="4">
      </b-col>
    </b-row>
    <div class="mb-4">
      <button id="cancel-btn" class="btn btn-secondary mr-3" type="reset" @click.prevent="onCancel">Cancel</button>
      <button :disabled="!nameValidation" d="save-btn" class="btn btn-primary" type="submit" @click.prevent="onSubmit">Save</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
    ...mapGetters(['scriptTypes', 'scripts', 'loaded']),
    nameValidation () {
      return this.nameChanged ? (this.form.name.length > 0 && this.isUniqueName) : null
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
