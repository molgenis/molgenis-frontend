<template>
  <component :is="getMapping()" :value="value" :rowIndex="rowIndex" :metadata="metadata"></component>
</template>

<script>
import LinkDisplay from './LinkDisplay'
import StringDisplay from './StringDisplay'
import DateDisplay from './DateDisplay'
import EmailDisplay from './EmailDisplay'
import HTMLDisplay from './HTMLDisplay'
import RefDisplay from './RefDisplay'
import FileDisplay from './FileDisplay'

export default {
  name: 'DataDisplayCell',
  components: { StringDisplay, LinkDisplay, DateDisplay, EmailDisplay, HTMLDisplay, RefDisplay, FileDisplay },
  props: {
    value: {
      type: [ String, Object, Array, Number, Boolean ],
      required: true
    },
    rowIndex: {
      type: Number,
      required: true
    },
    metadata: {
      type: Object,
      required: true
    }
  },
  methods: {
    getMapping () {
      const fieldTypeToFilterType = {
        'string': 'StringDisplay',
        'text': 'StringDisplay',
        'html': 'HTMLDisplay',
        'int': 'StringDisplay',
        'long': 'StringDisplay',
        'decimal': 'StringDisplay',
        'bool': 'StringDisplay',
        'date': 'DateDisplay',
        'datetime': 'DateDisplay',
        'email': 'EmailDisplay',
        'hyperlink': 'LinkDisplay',
        'categorical': 'RefDisplay',
        'categoricalmref': 'RefDisplay',
        'mref': 'RefDisplay',
        'xref': 'RefDisplay',
        'onetomany': 'RefDisplay',
        'enum': 'StringDisplay',
        'file': 'FileDisplay',
        'compound': 'StringDisplay'
      }
      return fieldTypeToFilterType[this.metadata.type] || 'StringDisplay'
    }
  }
}
</script>

<style scoped>
  >>> .mouse-help{
    cursor: help;
  }
  >>> .mouse-ref{
    cursor: pointer;
  }
</style>
