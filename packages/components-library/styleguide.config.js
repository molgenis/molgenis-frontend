module.exports = {
  require: [
    './node_modules/bootstrap/dist/css/bootstrap.css',
    './node_modules/bootstrap-vue/dist/bootstrap-vue.css',
    './node_modules/@fortawesome/fontawesome-free/css/all.css',
    './styleguidist-setup.js'
  ],
  title: 'Molgenis Style Guide',
  components: 'src/components/**/[A-Z]*.vue',
  sections: [
    {
      name: 'Filters',
      sections: [
        {
          name: 'Types',
          components: 'src/components/filters/*.vue'
        },
        {
          name: 'Containers',
          components: 'src/components/filters/containers/*.vue'
        }
      ]
    },
    {
      name: 'UI',
      components: 'src/components/ui/*.vue'
    },
    {
      name: 'Table',
      components: 'src/components/table/*.vue'
    },
    {
      name: 'RefTable',
      components: 'src/components/table/dataDisplayTypes/RefTable.vue'
    }
  ],
  exampleMode: 'expand',
  compilerConfig: {
    transforms: { asyncAwait: false }
  }
}
