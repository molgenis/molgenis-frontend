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
    </div>
  </div>
</template>

<script>
export default {
  name: 'DefaultCardContent',
  props: {
    dataLabel: {
      type: String,
      required: true
    },
    dataContents: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
