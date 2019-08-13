<template>
  <div class="container-fluid mb-4">
    <h2>{{activeEntity}}</h2>
    <toast-component
      class="toast-component mt-2"
      v-if="toast"
      :type="toast.type"
      :message="toast.message"
      @toastCloseBtnClicked="clearToast">
    </toast-component>
    <div class="flex-mainview d-flex" :class="{'showfilters': !showFilters}">
      <div class="flex-filter" >
        <filters-view />
      </div>
      <div class="flex-data" >
        <data-view />
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

export default Vue.extend({
  name: 'MainView',
  computed: {
    ...mapState(['showFilters', 'activeEntity', 'toast'])
  },
  methods: {
    ...mapMutations([
      'clearToast'
    ])
  },
  created () {
    this.$store.commit('setActiveEntity', this.$route.params.entity)
  },
  components: { FiltersView, DataView, ToastComponent }
})
</script>

<style scoped>
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
    max-width: calc(100% - 20rem);
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
