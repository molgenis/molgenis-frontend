<template>
  <div class="card-body">
    <h5 class="card-title">{{dataLabel}}</h5>
    <div class="card-text">
      <table>
        <tr v-for="(value, head) in dataContents" :key="head">
          <th scope="row">{{head}}</th>
          <td>{{value}}</td>
        </tr>
      </table>
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
