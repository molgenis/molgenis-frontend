<template>
  <div id="app" class="container">
    <h1>Components</h1>
    <hr/>
    <div class="row">
      <div class="col">
        <h3>Default card</h3>
          <default-card-content
          dataLabel="Data label"
          dataId="dataId"
          dataTable="dataTable"
          :dataContents=dataContents
          :numberOfAttributes="2" ></default-card-content>
      </div>
    </div>
    <hr/>
    <div class="row">
      <div class="col">
        <h3>Toast</h3>
        <button type="button" @click="isToastShown = !isToastShown">Toggle toast</button>
        <toast-component
          v-show="isToastShown"
          class="m-3"
          message="Message from toast"
          type="warning"
          @toastCloseBtnClicked="isToastShown = false"></toast-component>
        <toast-component
          v-show="isAutoHideToastShown"
          class="m-3"
          message="This will hide in about 5 seconds"
          type="info"
          :autoHideOnType="['info', 'succes']"
          :autoHideTime="5000"
          @toastCloseBtnClicked="isAutoHideToastShown = false"></toast-component>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import DefaultCardContent from './components/DefaultCardContent.vue'
import ToastComponent from './components/ToastComponent.vue'

export default Vue.extend({
  name: 'app',
  components: {
    DefaultCardContent,
    ToastComponent
  },
  data: () => {
    return {
      isToastShown: true,
      isAutoHideToastShown: true,
      dataContents: {
        field1: 'value 1',
        field2: 2,
        field3: true
      }
    }
  }
})
</script>
