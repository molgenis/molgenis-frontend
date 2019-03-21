<template>
  <div @click.stop>
    <b-modal
      :ref="'modal-'+name"
      :title="'scripts-parameters-label' | i18n"
      :ok-title="'scripts-run-label' | i18n"
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
  </div>
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
      const url = this.parameters.reduce((accumulator, key, index) => {
        return accumulator + encodeURIComponent(key) + '=' + encodeURIComponent(this.values[index]) + '&'
      }, '/scripts/' + this.name + '/start?')
      window.open(url, '_blank')
    }
  }
}
</script>

<style scoped>
  div{
    cursor:auto;
  }
</style>
