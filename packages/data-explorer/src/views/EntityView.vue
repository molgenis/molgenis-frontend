<template>
  <div class="mt-1 entity-table" v-if="activeEntityData && activeEntityData.items.length > 0 && entityMeta">
    <div v-if="isShop && entitiesToShow.length === 0" class="alert alert-warning">
      {{ 'dataexplorer_empty_shopping_cart' | i18n}}
    </div>

    <div class="card-columns" v-else-if="dataDisplayLayout==='cards'">
      <entity-card
        class="card"
        v-for="(entity, index) in entitiesToShow"
        :key="index"
        :id="getEntityId(entity)"
        :isSelected="isSelected(entity)"
        :isShop="isShop"
        :clickShop="toggleShoppingItems">

        <!-- Card template, to be made generic-->
        <div class="card-body">
          <h5 class="card-title">{{entity.data.xstring}}</h5>
          <p class="card-text">{{entity.data.xtext}}</p>
        </div>

      </entity-card>
    </div>

    <table v-else class="table">
      <entity-table-header :header="Object.keys(entitiesToShow[0].data)" :isShop="isShop"></entity-table-header>
      <tbody>
      <entity-table-row v-for="(entity, index) in entitiesToShow"
                        :key="index"
                        :id="getEntityId(entity)"
                        :data="entity.data"
                        :isSelected="isSelected(entity)"
                        :isShop="isShop"
                        :clickShop="toggleShoppingItems"></entity-table-row>
      </tbody>
    </table>

    <button v-if="shoppingFilter && isShop" class="btn btn-danger m-1">
      <font-awesome-icon icon="shopping-bag" /> Order
    </button>

  </div>
</template>

<script>
import EntityCard from '../components/DataView/EntityCard'
import EntityTableRow from '../components/DataView/EntityTableRow'
import EntityTableHeader from '../components/DataView/EntityTableHeader'
import { mapGetters, mapState, mapMutations } from 'vuex'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faShoppingBag)

export default {
  name: 'EntityView',
  components: { EntityCard, EntityTableRow, EntityTableHeader, FontAwesomeIcon },
  props: {
    isShop: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },
  computed: {
    ...mapGetters(['activeEntityData']),
    ...mapState(['dataDisplayLayout', 'shoppingFilter', 'entityMeta', 'shoppedEntityItems']),
    idAttribute () {
      return this.entityMeta.idAttribute
    },
    entitiesToShow () {
      if (this.shoppingFilter) {
        return this.activeEntityData.items.filter((entity) => this.shoppedEntityItems.includes(this.getEntityId(entity)))
      } else {
        return this.activeEntityData.items
      }
    }
  },
  methods: {
    ...mapMutations(['toggleShoppingItems']),
    getEntityId (entity) {
      return entity.data[this.idAttribute].toString()
    },
    isSelected (entity) {
      return this.shoppedEntityItems.includes(this.getEntityId(entity))
    }
  }
}
</script>

<style scoped>
  .showfilters .card-columns {
    column-count: 4;
  }

  @media only screen and (max-width: 1200px) {
    /* Bootstrap brakepoint xl */
    .flex-mainview .card-columns {
      column-count: 2;
    }

    .showfilters .card-columns {
      column-count: 3;
    }
  }

  @media only screen and (max-width: 992px) {
    /* Bootstrap brakepoint lg */
    .flex-mainview .card-columns {
      column-count: 1;
    }

    .showfilters .card-columns {
      column-count: 2;
    }
  }

  @media only screen and (max-width: 576px) {
    /* Bootstrap brakepoint sm */
    .flex-mainview .card-columns {
      column-count: 1;
    }
  }
</style>
