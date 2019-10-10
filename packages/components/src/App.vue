<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <h3>My component</h3>
    <my-component></my-component>
    <hr/>
    <h3>Default card</h3>
    <default-card-content
    dataLabel="Data label"
    dataId="dataId"
    dataTable="dataTable"
    :dataContents=dataContents
    :numberOfAttributes="2" ></default-card-content>
    <hr/>
    <h3>Custom card</h3>
    <custom-card-content
    id="custom-card-content-id"
    :record="customCardRecord"
    :customCode="customCardCode" ></custom-card-content>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import MyComponent from './components/MyComponent.vue'
import DefaultCardContent from './components/card/DefaultCardContent.vue'
import CustomCardContent from './components/card/CustomCardContent.vue'

export default Vue.extend({
  name: 'app',
  components: {
    MyComponent, DefaultCardContent, CustomCardContent
  },
  data: () => {
    return {
      dataContents: {
        field1: 'value 1',
        field2: 2,
        field3: true
      },
      customCardRecord: {
        msg: 'Hello custom card!'
      },
      customCardCode: '<span>{{record.msg}}</span>'
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
