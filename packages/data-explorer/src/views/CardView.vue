<template>
  <div class="card-columns">
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
</template>

<script>
import ExplorerCard from '../components/DataView/ExplorerCard'
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
    ...mapState(['entityMeta', 'shoppedEntityItems', 'isShop']),
    idAttribute () {
      return this.entityMeta.idAttribute
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
