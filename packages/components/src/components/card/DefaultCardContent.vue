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
          <button v-if="numberOfAttributes > collapseLimit" class="btn btn-outline-info btn-sm mr-1 mg-card-expand" @click="handleExpandBtnClicked">
            </button>
          <button class="btn btn-outline-info btn-sm mg-info-btn" @click="goToDetails">
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

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
    }
  },
  computed: {
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
