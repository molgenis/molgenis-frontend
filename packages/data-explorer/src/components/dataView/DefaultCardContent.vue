<template>
  <div>
    <h5 class="card-title mg-default-card-title">{{dataLabel}}
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
          <button v-if="this.numberOfAttributes > this.collapseLimit" class="btn btn-outline-info btn-sm mr-1" @click="handleExpandBtnClicked">
            <font-awesome-icon icon="chevron-up" v-if="this.cardState==='open'"></font-awesome-icon>
            <font-awesome-icon icon="chevron-right" v-if="this.cardState==='closed'"></font-awesome-icon> {{ expandBtnText }}
          </button>
          <button class="btn btn-outline-info btn-sm" @click="goToDetails">
            <font-awesome-icon icon="search"></font-awesome-icon> Info
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faChevronUp, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSearch, faChevronRight, faChevronUp)
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
    }
  },
  components: { FontAwesomeIcon },
  computed: {
    expandBtnText () {
      return this.cardState === 'closed' ? 'Expand' : 'Collapse'
    },
    dataToShow () {
      if (this.cardState === 'closed') {
        const elementsToShow = Object.keys(this.dataContents).slice(0, this.collapseLimit)
        return elementsToShow.reduce((accumulator, key) => {
          accumulator[key] = this.dataContents[key]
          return accumulator
        }, {})
      } else {
        return this.dataContents
      }
    }
  },
  methods: {
    goToDetails () {
      window.location.href = '/menu/main/dataexplorer/details/it_emx_datatypes_TypeTest/1'
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
