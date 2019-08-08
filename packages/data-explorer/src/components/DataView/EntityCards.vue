<template>
  <div v-if="entities && entities.items.length > 0 && entityMeta" class="mt-1">
    <div v-if="isShop && entitiesToShow.length === 0" class="alert alert-warning"> {{ 'dataexplorer_empty_shopping_cart' | i18n}} </div>
    <div
      class="card-columns"
      v-else
    >
      <entity-card
        class="card"
        v-for="(entity, index) in entitiesToShow"
        :key="index"
        :id="getEntityId(entity)"
        :isSelected="isSelected(entity)"
        :isShop="isShop"
      >
        <div class="card-body">
          <h5 class="card-title">{{entity.data.xstring}}</h5>
          <p class="card-text">{{entity.data.xtext}}</p>
        </div>
      </entity-card>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import EntityCard from './EntityCard'
import { mapState } from 'vuex'

export default Vue.extend({
  name: 'EntityCards',
  props: {
    entities: {
      type: Object
    },
    isShop: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },
  methods: {
    isSelected (entity) {
      return this.shoppedEntityItems.includes(this.getEntityId(entity))
    },
    getEntityId (entity) {
      return entity.data[this.idAttribute].toString()
    }
  },
  computed: {
    ...mapState(['shoppingFilter', 'entityMeta', 'shoppedEntityItems']),
    idAttribute () {
      return this.entityMeta.idAttribute
    },
    entitiesToShow () {
      if (this.shoppingFilter) {
        return this.entities.items.filter((entity) => this.shoppedEntityItems.includes(this.getEntityId(entity)))
      } else {
        return this.entities.items
      }
    }
  },
  components: { EntityCard }
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
