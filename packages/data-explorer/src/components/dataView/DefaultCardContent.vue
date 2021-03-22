<template>
  <b-overlay :show="cardLoading">
    <h5 class="card-title mg-default-card-title">
      {{ dataLabel }}
      <router-link
        v-if="isEditable && dataId"
        class="btn btn-sm btn-link ml-1"
        role="button"
        :to="{ name: 'de-edit', params: { entity: dataTable, dataRowId: dataId}, query: {}}"
      >
        <font-awesome-icon icon="edit" />
      </router-link>
      <button
        v-if="isEditable"
        class="btn btn-sm btn-link"
        role="button"
        @click="$eventBus.$emit('delete-item', dataId)"
      >
        <font-awesome-icon icon="trash" />
      </button>
      <slot name="shopping-button" />
    </h5>
    <div class="card-text">
      <div v-for="(value, head) in dataToShow" :key="head" class="row mb-1">
        <div class="col-6">
          {{ head }}
        </div>
        <div class="col-6">
          <template v-if="Array.isArray(value)">
            {{ value.map(v => v.label).join(', ') }}
          </template>
          <template v-else-if="typeof value === 'object' && value !== null">
            {{ value.label }}
          </template>
          <template v-else>
            {{ value }}
          </template>
        </div>
      </div>
      <div class="row">
        <div class="col mt-2">
          <button v-if="numberOfAttributes > collapseLimit" class="btn btn-outline-info btn-sm mr-1 mg-card-expand" @click="handleExpandBtnClicked">
            <font-awesome-icon v-if="cardState==='open'" icon="chevron-up" />
            <font-awesome-icon v-if="cardState==='closed'" icon="chevron-right" /> {{ expandBtnText }}
          </button>
          <router-link class="btn btn-outline-info btn-sm mg-info-btn" role="button" :to="{ name: 'entity-detail', params: { entityType: dataTable, entity: dataId}}">
            <font-awesome-icon icon="search" /> {{ $t('dataexplorer_default_card_info_btn_label') }}
          </router-link>
        </div>
      </div>
    </div>
  </b-overlay>
</template>

<script>

export default {
  name: 'DefaultCardContent',
  props: {
    dataLabel: {
      type: String,
      required: true
    },
    dataId: {
      type: String,
      required: true
    },
    dataTable: {
      type: String,
      required: true
    },
    dataContents: {
      type: Object,
      required: true
    },
    numberOfAttributes: {
      type: Number,
      required: true
    },
    collapseLimit: {
      type: Number,
      default: () => 5
    },
    isEditable: {
      type: Boolean,
      default: () => false
    },
    // List of cardItem keys that need to be hidden
    hiddenColumns: {
      type: Array,
      default: () => []
    }
  },
  data: () => {
    return {
      cardState: 'closed',
      cardLoading: false
    }
  },
  computed: {
    expandBtnText () {
      return this.cardState === 'closed' ? this.$t('dataexplorer_default_card_expand_btn_label') : this.$t('dataexplorer_default_card_collapse_btn_label')
    },
    dataToShow () {
      const visibleDataContents = Object.keys(this.dataContents)
        .filter(columnName => !this.hiddenColumns.includes(columnName))
        .reduce((accum, key) => { return { ...accum, [key]: this.dataContents[key] } }, {})

      if (this.cardState === 'closed') {
        const elementsToShow = Object.keys(visibleDataContents).slice(0, this.collapseLimit)
        return elementsToShow.reduce((accumulator, key) => {
          accumulator[key] = visibleDataContents[key]
          return accumulator
        }, {})
      } else {
        return visibleDataContents
      }
    }
  },
  watch: {
    dataContents () {
      this.cardLoading = false
    }
  },
  methods: {
    handleExpandBtnClicked () {
      if (this.cardState === 'closed') {
        this.cardState = 'open'
        this.$emit('expandDefaultCard')
        this.cardLoading = true
      } else {
        this.cardState = 'closed'
      }
    }
  }
}
</script>

<style scoped>
  .mg-default-card-title {
    min-height: 3rem;
  }
</style>
