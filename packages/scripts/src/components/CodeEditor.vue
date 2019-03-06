<template>
  <div>
    <div class="position-relative">
      <form-component v-if="showField"
                      id="CodeEditor"
                      :formFields="codeEditorFields"
                      :initialFormData="codeEditorData"
                      :formState="codeEditorState"
                      :options="options"
                      @valueChange="onValueChanged"></form-component>
      <span id="in-corner"><slot></slot></span>
    </div>
    <div class="mb-3">
      <small v-if="parameters.length>0">Exposed Parameters <b-badge class="mr-1" v-for="(parameter, index) in parameters" :key="`type-${index}`" >{{parameter}}</b-badge></small>
    </div>
  </div>
</template>

<script>
import { FormComponent } from '@molgenis/molgenis-ui-form'

export default {
  name: 'CodeEditor',
  props: ['initialData'],
  data () {
    return {
      showField: true,
      options: {
        showEyeButton: false,
        allowAddingOptions: false
      },
      codeEditorFields: [
        {
          type: 'script',
          id: 'content',
          label: 'Script',
          description: null,
          required: (formData) => true,
          disabled: false,
          readOnly: false,
          visible: (formData) => true,
          validate: (formData) => true
        }
      ],
      codeEditorData: {
        content: ''
      },
      codeEditorState: {},
      parameters: []
    }
  },
  methods: {
    onValueChanged (event) {
      this.codeEditorData = event
      const code = event.content
      if (code) {
        const parameter = /\${(\w+)}/g // Select ${name} from code
        let result
        let list = []
        while ((result = parameter.exec(code)) !== null) {
          list.push(result[1]) // add the caputure group
        }
        this.$emit('valueChange', { 'parameters': list, 'content': code })
        this.parameters = list
      }
    }
  },
  created () {
    if (this.initialData) {
      this.codeEditorData.content = this.initialData
    }
  },
  components: {
    FormComponent
  }
}
</script>

<style scoped>
  >>> #in-corner {
    position: absolute;
    bottom: 2rem;
    right: 1rem;
  }
</style>
