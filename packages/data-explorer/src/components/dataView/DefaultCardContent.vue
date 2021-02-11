<template>
  <div>
    <h5 class="card-title mg-default-card-title">{{dataLabel}}
      <a
        v-if="isEditable"
        class="btn btn-sm btn-link ml-1"
        role="button"
        :href="'/plugin/data-row-edit/' + dataTable + '/' + dataId">
        <font-awesome-icon icon="edit"></font-awesome-icon>
      </a>
      <button
        v-if="isEditable"
        class="btn btn-sm btn-link"
        role="button"
        @click="$eventBus.$emit('delete-item', dataId)"
        >
        <font-awesome-icon icon="trash"></font-awesome-icon>
      </button>
      <slot name="shopping-button"></slot>
    </h5>
    <div class="card-text">
      <div class="row mb-1" v-for="(value, head) in dataToShow" :key="head">
        <div class="col-6">
          {{head}}
        </div>
        <div class="col-6">
          {{value}}
        </div>
      </div>
      <div class="row">
        <div class="col mt-2">
          <button v-if="numberOfAttributes > collapseLimit" class="btn btn-outline-info btn-sm mr-1 mg-card-expand" @click="handleExpandBtnClicked">
            <font-awesome-icon icon="chevron-up" v-if="cardState==='open'"></font-awesome-icon>
            <font-awesome-icon icon="chevron-right" v-if="cardState==='closed'"></font-awesome-icon> {{ expandBtnText }}
          </button>
          <button class="btn btn-outline-info btn-sm mg-info-btn" @click="goToDetails">
            <font-awesome-icon icon="search"></font-awesome-icon> {{ 'dataexplorer_default_card_info_btn_label' | i18n }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faChevronUp, faChevronRight, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSearch, faChevronRight, faChevronUp, faEdit, faTrash)

export default {
  name: 'DefaultCardContent',
  data: () => {
    return {
      cardState: 'closed'
    }
  },
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
  components: { FontAwesomeIcon },
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
    },
    detailLink () {
      return `/menu/main/dataexplorer/details/${this.dataTable}/${this.dataId}`
    }
  },
  methods: {
    goToDetails () {
      window.location.assign(this.detailLink)
    },
    handleExpandBtnClicked () {
      if (this.cardState === 'closed') {
        this.cardState = 'open'
        this.$emit('expandDefaultCard')
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
