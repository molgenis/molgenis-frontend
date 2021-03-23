<template>
  <div class="card-deck mx-n2">
    <explorer-card
      v-for="(entity, index) in entitiesToShow"
      :key="index"
      :data-id="getEntityId(entity)"
      :data-table="tableName"
      :is-selected="isSelected(entity)"
      :is-shop="tableSettings.isShop"
      :collapse-limit="tableSettings.collapseLimit"
      :data-label="getEntityLabel(entity)"
      :data-contents="entity"
      :number-of-attributes="numberOfAttributes"
      :custom-code="tableSettings.customCardCode"
      :is-editable="hasEditRights"
      :hidden-columns="hiddenColumns"
      @expandCard="handleExpandCard(entity)"
    />
  </div>
</template>

<script>
import ExplorerCard from '../components/dataView/ExplorerCard'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'CardView',
  components: { ExplorerCard },
  props: {
    entitiesToShow: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapState('explorer', ['tableMeta', 'selectedItemIds', 'tableSettings', 'tableName', 'hiddenColumns']),
    ...mapGetters('explorer', ['filterRsql', 'hasEditRights']),
    idAttribute () {
      return this.tableMeta.idAttribute
    },
    labelAttribute () {
      return this.tableMeta.labelAttribute
    },
    numberOfAttributes () {
      return this.tableMeta.attributes.filter((attr) => { return attr.type !== 'compound' }).length
    }
  },
  methods: {
    ...mapActions('explorer', ['fetchRowDataLabels']),
    getEntityId (entity) {
      return entity[this.idAttribute.name] ? entity[this.idAttribute.name].toString() : ''
    },
    getEntityLabel (entity) {
      return this.labelAttribute && entity[this.labelAttribute.name] ? entity[this.labelAttribute.name].toString() : this.getEntityId(entity).toString()
    },
    isSelected (entity) {
      return this.selectedItemIds.includes(this.getEntityId(entity))
    },
    handleExpandCard (entity) {
      this.fetchRowDataLabels({ rowId: this.getEntityId(entity) })
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
