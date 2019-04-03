<template>
  <div class="container">
    <h1 class="h4 mb-3">Reset password</h1>
    <form-component
      id="register-form"
      :formFields="formFields"
      :initialFormData="formData"
      :formState="formState"
      @valueChange="valueChange">
    </form-component>
    <button class="btn btn-primary btn-lg" @click="resetAndGotoSignin" :disabled="!formState.$valid">Reset</button>
  </div>
</template>

<script>
import Vue from 'vue'
import { FormComponent } from '@molgenis/molgenis-ui-form'
import '@molgenis/molgenis-ui-form/dist/static/css/molgenis-ui-form.css'
import {mapActions} from 'vuex'

export default Vue.extend({
  name: 'Reset',
  components: {
    FormComponent
  },
  data () {
    return {
      email: ''
    }
  },
  methods: {
    valueChange ({ email }) {
      this.email = email
    },
    resetAndGotoSignin (){
      this.reset(this.email).then(() => this.$router.push('/'))
    },
    ...mapActions(['reset'])
  },
  data () {
    return {
      formData: {},
      formState: {},
      formFields: [{
        type: 'email',
        id: 'email',
        label: 'Email',
        required: () => true,
        disabled: false,
        readOnly: false,
        visible: () => true,
        validate: () => true
      }]
    }
  }
})
</script>

<style scoped>
</style>
