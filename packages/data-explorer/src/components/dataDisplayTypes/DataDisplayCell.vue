<template>
  <component :is="getMapping()" :value="value" :type="type" :rowIndex="rowIndex" :data="data"></component>
</template>

<script>
import LinkDisplay from './LinkDisplay'
import StringDisplay from './StringDisplay'
import DateDisplay from './DateDisplay'
import EmailDisplay from './EmailDisplay'
import HTMLDisplay from './HTMLDisplay'
import RefDisplay from './RefDisplay'

export default {
  name: 'DataDisplayCell',
  components: { StringDisplay, LinkDisplay, DateDisplay, EmailDisplay, HTMLDisplay, RefDisplay },
  props: {
    value: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    rowIndex: {
      type: Number,
      required: true
    },
    data: {
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
        'file': 'LinkDisplay',
        'compound': 'StringDisplay'
      }
      return fieldTypeToFilterType[this.type] || 'StringDisplay'
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
