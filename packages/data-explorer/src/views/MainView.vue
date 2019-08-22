<template>
  <div class="container-fluid my-4">
    <toast-component
      class="toast-component mt-2"
      v-if="toast"
      :type="toast.type"
      :message="toast.message"
      @toastCloseBtnClicked="clearToast">
    </toast-component>
    <div class="flex-mainview d-flex" :class="{'showfilters': !showFilters}">
      <div class="flex-filter">
        <filters-view></filters-view>
      </div>
      <div class="flex-data ml-4" >
        <button
          type="button"
          class="btn btn-light m-0 btn-outline-secondary show-filters-button py-1"
          title="Show Filters"
          v-if="!showFilters && !showShoppingCart"
          @click="setShowFilters(true)">
          <font-awesome-icon icon="chevron-up"></font-awesome-icon>
          <span class="ml-2">Filters</span>
        </button>

        <data-view></data-view>
      </div>
    </div>

  </div>
</template>

<script>
import Vue from 'vue'
import FiltersView from './FiltersView'
import ToastComponent from '../components/Utils/ToastComponent'
import DataView from './DataView'
import { mapState, mapMutations } from 'vuex'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faChevronUp)

export default Vue.extend({
  name: 'MainView',
  computed: {
    ...mapState(['showFilters', 'toast', 'showShoppingCart'])
  },
  methods: {
    ...mapMutations([ 'clearToast', 'setShowFilters' ])
  },
  created () {
    if (this.$route.params.entity) {
      this.$store.commit('setTableName', this.$route.params.entity)
    }
  },
  components: { FiltersView, DataView, ToastComponent, FontAwesomeIcon }
})
</script>

<style scoped>
  .show-filters-button {
    display: inline-block;
    white-space: nowrap;
    position: absolute;
    left: -1px;
    transform: rotate(90deg);
    transform-origin: 0 100%;
  }
  .flex-mainview {
    white-space: normal;
  }
  .flex-filter {
    transition: max-width 0.3s, min-width 0.3s;
    min-width: 20rem;
    max-width: 20rem;
    padding-right: 1rem;
    overflow: hidden;
  }

  .flex-data {
    max-width: calc(100% - 22rem);
    width: 100%;
  }
  .showfilters .flex-filter {
    max-width: 0;
    min-width: 0;
    padding-right: 0;
  }
  .showfilters .flex-data {
    max-width: 100%;
  }

  @media only screen and (max-width: 576px) { /* Bootstrap brakepoint sm */
    .flex-mainview {
      display: block;
    }
    .flex-mainview .flex-filter {
      min-width: 0;
      max-width: none;
      padding: 0;
    }
  }
</style>
