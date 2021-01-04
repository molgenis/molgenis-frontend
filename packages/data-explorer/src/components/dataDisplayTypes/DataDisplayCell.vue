<template>
  <component :is="getMapping" :value="value" :type="type"></component>
</template>

<script>
import LinkDisplay from './LinkDisplay'
import StringDisplay from './StringDisplay'

export default {
  name: 'DataDisplayCell',
  components: { StringDisplay, LinkDisplay },
  props: {
    value: {
      required: false
    },
    type: {
      type: String,
      required: true
    }
  },
  methods: {
    getMapping () {
      /*
      const fieldTypeToFilterType = {
        'string': 'StringDisplay',
        'text': 'StringDisplay',
        'html': 'StringDisplay',
        'int': 'StringDisplay',
        'long': 'StringDisplay',
        'decimal': 'StringDisplay',
        'bool': 'StringDisplay',
        'date': 'StringDisplay',
        'datetime': 'StringDisplay',
        'email': 'StringDisplay',
        'hyperlink': 'StringDisplay',
        'categorical': 'StringDisplay',
        'categorical_mref': 'StringDisplay',
        'mref': 'StringDisplay',
        'xref': 'StringDisplay',
        'onetomany': 'StringDisplay',
        'enum': 'StringDisplay',
        'file': 'StringDisplay',
        'compound': 'StringDisplay'
      }
      */
      return 'StringDisplay'
    }
  }
}
</script>

<style scoped>
</style>
