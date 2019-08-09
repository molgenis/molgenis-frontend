<template>
  <div class="mt-1 entity-table" v-if="entities && entities.items.length > 0 && entityMeta">
    <div v-if="isShop && entitiesToShow.length === 0" class="alert alert-warning"> {{ 'dataexplorer_empty_shopping_cart' | i18n}} </div>
    <table v-else class="table">
      <thead>
      <tr>
        <th scope="col" v-if="isShop"></th>
        <th scope="col"
            v-for="(entity, index) in entitiesToShow[0].data" :key="index"
        >{{index}}</th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="(entity, index) in entitiesToShow" :key="index">
          <td v-if="isShop"><shopping-button :showShop="showShop(entity)" @click.native="cardClick(entity)"></shopping-button></td>
          <td v-for="(item, index) in entity.data" :key="index">{{item}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Vue from 'vue'
import ShoppingButton from '../Utils/ShoppingButton'
import { mapMutations, mapState } from 'vuex'

export default Vue.extend({
  name: 'EntityTable',
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
  methods: {
    ...mapMutations(['toggleShoppingItems']),
    showShop (entity) {
      return this.isShop && this.isSelected(entity)
    },
    getEntityId (entity) {
      return entity.data[this.idAttribute].toString()
    },
    isSelected (entity) {
      return this.shoppedEntityItems.includes(this.getEntityId(entity))
    },
    cardClick (entity) {
      if (this.isShop) {
        this.toggleShoppingItems(this.getEntityId(entity))
      }
    }
  },
  components: { ShoppingButton }
})
</script>
