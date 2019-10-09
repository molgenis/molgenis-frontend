<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <my-component></my-component>
    <default-card-content
    dataLabel="Data label"
    dataId="dataId"
    dataTable="dataTable"
    :dataContents=dataContents
    :numberOfAttributes="2" ></default-card-content>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import MyComponent from './components/MyComponent.vue'
import DefaultCardContent from './components/DefaultCardContent.vue'

export default Vue.extend({
  name: 'app',
  components: {
    MyComponent, DefaultCardContent
  },
  data: () => {
    return {
      dataContents: {
        field1: 'value 1',
        field2: 2,
        field3: true
      }
    }
  }
})
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
