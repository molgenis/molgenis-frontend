<template>
  <div>
    <div class="position-relative">
      <form-component v-if="showField"
                      id="CodeEditor"
                      :class="(codeEditorState.$valid||codeEditorState.$untouched)&&'border'"
                      :formFields="codeEditorFields"
                      :initialFormData="codeEditorData"
                      :formState="codeEditorState"
                      :options="options"
                      @valueChange="onValueChanged"></form-component>
      <span class="in-corner"><slot></slot></span>
    </div>
    <div class="mb-3">
      <small v-if="parameters.length>0">Exposed Parameters
        <b-badge :variant="(parameter=='molgenisToken'||parameter=='outputFile')?'secondary':'primary'" class="mr-1" v-for="(parameter, index) in parameters" :key="`type-${index}`" >{{parameter}}</b-badge>
      </small>
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
          required: () => true,
          disabled: false,
          readOnly: false,
          visible: () => true,
          validate: () => true
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
    findParameters (code) {
      const parameterRegEx = /\${(\w+)}/g // Select ${name} from code
      let result
      let list = []
      while ((result = parameterRegEx.exec(code)) !== null) {
        list.push(result[1]) // add the capture group
      }
      return list
    },
    onValueChanged (event) {
      this.codeEditorData = event
      const code = event.content
      let list = this.findParameters(code)
      list = list.filter((value, index, self) => self.indexOf(value) === index) // select Unique values
      this.$emit('valueChange', { 'parameters': list, 'content': code })
      this.parameters = list
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
  >>> .form-group, >>> .form-text{
    margin:0;
  }
  >>> label[for='content']{
    display: none;
  }
  >>> .in-corner {
    position: absolute;
    bottom: 2rem;
    right: 1rem;
  }
  >>> form.vf-form-invalid + .in-corner{
    bottom: 3.5rem;
  }
</style>
