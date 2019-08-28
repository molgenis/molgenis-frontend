<template>
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
</template>

<script>
import ExplorerCard from '../components/dataView/ExplorerCard'
import { mapState } from 'vuex'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons'
library.add(faShoppingBag)

export default {
  name: 'CardView',
  props: {
    entitiesToShow: {
      type: Array,
      required: true
    }
  },
  components: { ExplorerCard },
  computed: {
    ...mapState(['tableMeta', 'shoppedEntityItems', 'isShop']),
    idAttribute () {
      return this.tableMeta.idAttribute
    },
    labelAttribute () {
      return this.tableMeta.labelAttribute
    }
  },
  methods: {
    getEntityId (entity) {
      return entity[this.idAttribute].toString()
    },
    getEntityLabel (entity) {
      return this.labelAttribute ? entity[this.labelAttribute].toString() : ''
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
