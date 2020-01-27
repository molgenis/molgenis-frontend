<template>
  <div class="card-deck">
    <explorer-card
      v-for="(entity, index) in entitiesToShow"
      :key="index"
      :dataId="getEntityId(entity)"
      :dataTable="tableName"
      :isSelected="isSelected(entity)"
      :isShop="tableSettings.isShop"
      :collapseLimit="tableSettings.collapseLimit"
      :dataLabel="getEntityLabel(entity)"
      :dataContents="entity"
      :numberOfAttributes="numberOfAttributes"
      :customCode="tableSettings.customCardCode"
      @expandCard="handleExpandCard(entity)">
    </explorer-card>
  </div>
</template>

<script>
import ExplorerCard from '../components/dataView/ExplorerCard'
import { mapState, mapActions, mapGetters } from 'vuex'

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
    ...mapState(['tableMeta', 'shoppedEntityItems', 'tableSettings', 'tableName']),
    ...mapGetters(['filterRsql']),
    idAttribute () {
      return this.tableMeta.idAttribute
    },
    labelAttribute () {
      return this.tableMeta.labelAttribute
    },
    numberOfAttributes () {
      return this.tableMeta.attributes.filter((attr) => { return attr.fieldType !== 'COMPOUND' }).length
    }
  },
  methods: {
    ...mapActions(['fetchCardViewData', 'fetchRowDataLabels']),
    getEntityId (entity) {
      return entity[this.idAttribute].toString()
    },
    getEntityLabel (entity) {
      return this.labelAttribute ? entity[this.labelAttribute].toString() : this.getEntityId(entity).toString()
    },
    isSelected (entity) {
      return this.shoppedEntityItems.includes(this.getEntityId(entity))
    },
    handleExpandCard (entity) {
      this.fetchRowDataLabels({ rowId: this.getEntityId(entity) })
    }
  },
  watch: {
    filterRsql: {
      handler: function () {
        this.fetchCardViewData()
      },
      immediate: true
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
