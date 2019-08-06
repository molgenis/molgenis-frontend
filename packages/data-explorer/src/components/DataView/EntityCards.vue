<template>
  <div class="card-columns mt-1" v-if="entities && entities.items.length > 0">
    <div class="card" v-for="(entity, index) in entities.items" :key="index">
      <div class="card-body">
        <h5 class="card-title">Metadata title?</h5>
        <div v-for="(item, index) in entity.data" :key="index">
          {{index+': '+item}}
        </div>
        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'EntityCards',
  props: {
    entities: {
      type: Object
    }
  }
})
</script>

<style scoped>
  .showfilters .card-columns {
    column-count: 4;
  }

  @media only screen and (max-width: 1200px) { /* Bootstrap brakepoint xl */
    .flex-mainview .card-columns {
      column-count: 2;
    }
    .showfilters .card-columns {
      column-count: 3;
    }
  }
  @media only screen and (max-width: 992px) { /* Bootstrap brakepoint lg */
    .flex-mainview .card-columns {
      column-count: 1;
    }
    .showfilters .card-columns {
      column-count: 2;
    }
  }
  @media only screen and (max-width: 576px) { /* Bootstrap brakepoint sm */
    .flex-mainview .card-columns {
      column-count: 1;
    }
  }
</style>
