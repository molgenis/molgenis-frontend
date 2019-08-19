<template>
  <div class="mt-2 entity-table" v-if="activeEntityData && activeEntityData.items.length > 0 && entityMeta">
    <div v-if="isShop && entitiesToShow.length === 0" class="alert alert-warning">
      {{ 'dataexplorer_empty_shopping_cart' | i18n}}
    </div>

    <div class="card-columns" v-else-if="dataDisplayLayout==='cards'">
      <explorer-card
        class="card"
        v-for="(entity, index) in entitiesToShow"
        :key="index"
        :id="getEntityId(entity)"
        :isSelected="isSelected(entity)"
        :isShop="isShop">

        <!-- Card template, to be made generic-->
        <div class="card-body">
          <h5 class="card-title">{{entity.data.xstring}}</h5>
          <p class="card-text">{{entity.data.xtext}}</p>
        </div>

      </explorer-card>
    </div>

    <table v-else class="table">
      <table-header :header="tableHeaderToShow" :isShop="isShop"></table-header>
      <tbody>
      <table-row v-for="(entity, index) in entitiesToShow"
                        :key="index"
                        :id="getEntityId(entity)"
                        :rowData="entity.data"
                        :isSelected="isSelected(entity)"
                        :isShop="isShop"></table-row>
      </tbody>
    </table>

    <button v-if="shoppingFilter && isShop" class="btn btn-success m-1">
      <font-awesome-icon icon="shopping-bag"></font-awesome-icon> Order
    </button>

  </div>
</template>

<script>
import ExplorerCard from '../components/DataView/ExplorerCard'
import TableRow from '../components/DataView/TableRow'
import TableHeader from '../components/DataView/TableHeader'
import { mapGetters, mapState } from 'vuex'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faShoppingBag)

export default {
  name: 'EntityView',
  components: { ExplorerCard, TableRow, TableHeader, FontAwesomeIcon },
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
    tableHeaderToShow () {
      return Object.keys(this.entitiesToShow[0].data)
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
