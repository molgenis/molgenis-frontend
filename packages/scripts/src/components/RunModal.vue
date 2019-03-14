<template>
  <b-modal
    :ref="'modal-'+name"
    title="Parameters"
    ok-title="Run"
    @ok="run"
    v-model="showModal"
  >
    <form @submit.stop.prevent="handleSubmit">
      <div class="mb-1" v-for="(parameter, index) in parameters" :key="`modal-parameter-${index}`" >
        <label :for="parameter" class="mb-1">{{parameter}}</label>
        <b-form-input :id="parameter" class="mb-1" v-model="values[index]" type="text" />
      </div>
    </form>
  </b-modal>
</template>

<script>
export default {
  props: ['parameters', 'name', 'value'],
  name: 'RunModal',
  data () {
    return {
      values: [],
      showModal: this.value
    }
  },
  watch: {
    showModal (changedValue) {
      this.$emit('input', changedValue)
    },
    value (changedValue) {
      this.showModal = changedValue
    }
  },
  methods: {
    run () {
      this.showModal = false
      let url = '/scripts/' + this.name + '/start?'
      // this.parameters.forEach((key, index) => {
      //   url += encodeURIComponent(key) + '=' + encodeURIComponent(this.values[index]) + '&'
      // })
      url += this.parameters.reduce((accumulator, key, index) => {
        return accumulator + encodeURIComponent(key) + '=' + encodeURIComponent(this.values[index]) + '&'
      })
      console.log(url)
      window.open(url, '_blank')
    }
  }
}
</script>
