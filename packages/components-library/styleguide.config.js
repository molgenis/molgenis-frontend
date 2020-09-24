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
      components: 'src/components/filters/*.vue'
    },
    {
      name: 'UI',
      components: 'src/components/ui/*.vue'
    }
  ],
  exampleMode: 'expand'
}
