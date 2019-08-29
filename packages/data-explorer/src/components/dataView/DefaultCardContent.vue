<template>
  <div class="card-body">
    <h5 class="card-title">{{dataLabel}}</h5>
    <div class="card-text">
      <div class="row" v-for="(value, head) in dataContents" :key="head">
        <div class="col-6">
          {{head}}
        </div>
        <div class="col-6">
          {{value}}
        </div>
      </div>
      <button class="btn btn-info mt-3" @click="handleExpandBtnClicked">{{ expandBtnText }}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DefaultCardContent',
  data: () => {
    return {
      cardState: 'closed'
    }
  },
  props: {
    dataLabel: {
      type: String,
      required: true
    },
    dataContents: {
      type: Object,
      required: true
    }
  },
  computed: {
    expandBtnText () {
      return this.cardState === 'closed' ? 'Expand' : 'Collapse'
    }
  },
  methods: {
    handleExpandBtnClicked () {
      if (this.cardState === 'closed') {
        this.cardState = 'open'
        this.$emit('expandDefaultCard')
      } else {
        this.cardState = 'closed'
      }
    }
  }
}
</script>

<style scoped>

</style>
