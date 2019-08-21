<template>
  <div class="mt-2 entity-table" v-if="activeEntityData && activeEntityData.items.length > 0 && entityMeta">
    <div v-if="entitiesToShow.length === 0" class="alert alert-warning">
      {{ 'dataexplorer_empty_shopping_cart' | i18n}}
    </div>
    <div v-else>
      <button class="btn btn-success" v-if="entitiesToShow.length > 10">
        <font-awesome-icon icon="shopping-bag"></font-awesome-icon> Order
      </button>
      <table class="table">
        <table-header :header="tableHeaderToShow" :isShop="true"></table-header>
        <tbody>
        <table-row v-for="(entity, index) in entitiesToShow"
                   :key="index"
                   :id="getEntityId(entity)"
                   :rowData="entity.data"
                   :isSelected="isSelected(entity)"
                   :isShop="true"></table-row>
        </tbody>
      </table>
      <button class="btn btn-success mb-2">
        <font-awesome-icon icon="shopping-bag"></font-awesome-icon> Order
      </button>
    </div>
  </div>
</template>

<script>
import TableRow from '../components/DataView/TableRow'
import TableHeader from '../components/DataView/TableHeader'
import { mapGetters, mapState } from 'vuex'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faShoppingBag)

export default {
  name: 'CartView',
  components: { TableRow, TableHeader, FontAwesomeIcon },
  computed: {
    ...mapGetters(['activeEntityData']),
    ...mapState(['dataDisplayLayout', 'showShoppingCart', 'entityMeta', 'shoppedEntityItems']),
    idAttribute () {
      return this.entityMeta.idAttribute
    },
    tableHeaderToShow () {
      return Object.keys(this.entitiesToShow[0].data)
    },
    entitiesToShow () {
      if (this.showShoppingCart) {
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
