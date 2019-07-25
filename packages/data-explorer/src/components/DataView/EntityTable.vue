<template>
  <div class="mt-1" v-if="entities && entities.items.length > 0">
    <table class="table">
      <thead>
      <tr>
        <th scope="col"
            v-for="(entity, index) in entities.items[0].data" :key="index"
        >{{index}}</th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="(entity, index) in entities.items" :key="index">
          <td v-for="(item, index) in entity.data" :key="index">{{item}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'EntityTable',
  props: {
    entities: {
      type: Object
    }
  }
})
</script>

<style scoped>
</style>
