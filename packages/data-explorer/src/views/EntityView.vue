<template>
  <!-- Used for rendering inside <component :is > -->
  <div
    v-if="tableData && tableData.items.length > 0"
    class="entity-table container-fluid"
  >
    <div v-if="isShop && entitiesToShow.length === 0" class="row">
      <div class="alert alert-warning col" />
    </div>

    <div v-else-if="dataDisplayLayout==='cards'" class="row">
      <div class="col">
        <div class="card-columns">
          <explorer-card
            v-for="(entity, index) in entitiesToShow"
            :id="getEntityId(entity)"
            :key="index"
            class="card"
            :is-selected="isSelected(entity)"
            :is-shop="isShop"
            :data-label="getEntityLabel(entity)"
            :data-contents="entity"
          />
        </div>
      </div>
    </div>

    <div v-else class="row">
      <div class="col">
        <table class="table">
          <table-header :header="tableHeaderToShow" :is-shop="isShop" />
          <tbody>
            <table-row
              v-for="(entity, index) in entitiesToShow"
              :id="getEntityId(entity)"
              :key="index"
              :row-index="index"
              :row-data="entity"
              :is-selected="isSelected(entity)"
              :is-shop="isShop"
            />
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="shoppingFilter && isShop" class="row">
      <div class="col">
        <button class="btn btn-success m-1">
          <font-awesome-icon icon="shopping-bag" />
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

export default {
  name: 'EntityView',
  components: { ExplorerCard, TableRow, TableHeader },
  props: {
    isShop: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },
  computed: {
    ...mapState('explorer', ['dataDisplayLayout', 'tableMeta', 'selectedItemIds', 'defaultEntityData', 'tableData']),
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
        return this.tableData.items.filter((entity) => this.selectedItemIds.includes(this.getEntityId(entity)))
      } else {
        return this.tableData.items
      }
    }
  },
  methods: {
    ...mapActions('explorer', ['loadDefaultEntityData']),
    getEntityId (entity) {
      return entity[this.idAttribute].toString()
    },
    isSelected (entity) {
      return this.selectedItemIds.includes(this.getEntityId(entity))
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
