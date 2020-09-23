<template>
  <div class="entity-table container-fluid"
       v-if="tableData && tableData.items.length > 0">
    <div class="row" v-if="isShop && entitiesToShow.length === 0">
      <div class="alert alert-warning col">
      </div>
    </div>

    <div class="row" v-else-if="dataDisplayLayout==='cards'">
      <div class="col">
        <div class="card-columns">
          <explorer-card
            class="card"
            v-for="(entity, index) in entitiesToShow"
            :key="index"
            :id="getEntityId(entity)"
            :isSelected="isSelected(entity)"
            :isShop="isShop"
            :dataLabel="getEntityLabel(entity)"
            :dataContents="entity">
          </explorer-card>
        </div>

      </div>
    </div>

    <div class="row" v-else>
      <div class="col">
        <table class="table">
          <table-header :header="tableHeaderToShow" :isShop="isShop"></table-header>
          <tbody>
          <table-row v-for="(entity, index) in entitiesToShow"
                     :key="index"
                     :id="getEntityId(entity)"
                     :rowData="entity"
                     :isSelected="isSelected(entity)"
                     :isShop="isShop"></table-row>
          </tbody>
        </table>
      </div>
    </div>

    <div class="row" v-if="isShop">
      <div class="col">
        <button class="btn btn-success m-1">
          <font-awesome-icon icon="shopping-bag"></font-awesome-icon>
          Order
        </button>
      </div>
    </div>

  </div>
</template>

<script>
import ExplorerCard from '../components/dataView/ExplorerCard'
import TableRow from '../components/dataView/TableRow'
import TableHeader from '../components/dataView/TableHeader'
import { mapState, mapActions } from 'vuex'
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
    ...mapState(['dataDisplayLayout', 'shoppingFilter', 'tableMeta', 'shoppedEntityItems', 'defaultEntityData', 'tableData']),
    idAttribute () {
      return this.tableMeta.idAttribute.name
    },
    labelAttribute () {
      return this.tableMeta.labelAttribute.name
    },
    tableHeaderToShow () {
      return Object.keys(this.entitiesToShow[0])
    },
    entitiesToShow () {
      if (this.shoppingFilter) {
        return this.tableData.items.filter((entity) => this.shoppedEntityItems.includes(this.getEntityId(entity)))
      } else {
        return this.tableData.items
      }
    }
  },
  methods: {
    ...mapActions(['loadDefaultEntityData']),
    getEntityId (entity) {
      return entity[this.idAttribute].toString()
    },
    isSelected (entity) {
      return this.shoppedEntityItems.includes(this.getEntityId(entity))
    },
    getEntityLabel (entity) {
      return this.labelAttribute ? entity[this.labelAttribute].toString() : ''
    }
  }
}
</script>

<style scoped>
  .hidefilters .card-columns {
    column-count: 4;
  }

  @media only screen and (max-width: 1200px) {
    /* Bootstrap brakepoint xl */
    .flex-mainview .card-columns {
      column-count: 2;
    }

    .hidefilters .card-columns {
      column-count: 3;
    }
  }

  @media only screen and (max-width: 992px) {
    /* Bootstrap brakepoint lg */
    .flex-mainview .card-columns {
      column-count: 1;
    }

    .hidefilters .card-columns {
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
