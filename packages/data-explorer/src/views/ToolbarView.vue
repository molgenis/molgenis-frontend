<template>
  <div class="toolbar row">
    <div class="col-4">
      <a
        v-if="!showShoppingCart"
        class="btn btn-light btn-outline-secondary card-layout"
        role="button"
        :href="'/plugin/data-row-edit/' + tableName">
        <font-awesome-icon icon="plus-square"></font-awesome-icon>
        Add
      </a>
    </div>
    <div class="col-4">
      <search-component v-model="searchText"></search-component>
    </div>
    <div class="col-4">
      <button
        v-if="!showShoppingCart && dataDisplayLayout === 'TableView'"
        @click="toggleDataDisplayLayout"
        class="btn btn-light ml-1 float-right btn-outline-secondary card-layout">
        <font-awesome-icon icon="th"></font-awesome-icon>
        Card layout
      </button>
      <button
        v-else-if="!showShoppingCart"
        @click="toggleDataDisplayLayout"
        class="btn btn-light ml-1 float-right btn-outline-secondary table-layout">
        <font-awesome-icon icon="th-list"></font-awesome-icon>
        Table layout
      </button>
      <button
        v-if="!showShoppingCart && tableSettings.isShop"
        @click="openShoppingCart"
        class="btn btn-light ml-1 float-right btn-outline-secondary show-cart">
        <font-awesome-icon icon="shopping-cart"></font-awesome-icon>
        Show cart
      </button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStore, faShoppingCart, faTh, faThList, faSlidersH, faShoppingBag, faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import SearchComponent from '../components/SearchComponent'

library.add(faShoppingCart, faTh, faThList, faSlidersH, faStore, faShoppingBag, faPlusSquare)

export default Vue.extend({
  name: 'ToolbarView',
  components: { FontAwesomeIcon, SearchComponent },
  computed: {
    ...mapState([
      'dataDisplayLayout',
      'hideFilters',
      'showShoppingCart',
      'tableSettings',
      'searchText',
      'tableName'
    ]),
    searchText: {
      get () {
        return this.$store.state.searchText
      },
      set (value) {
        this.$store.commit('setSearchText', value)
      }
    }
  },
  methods: {
    ...mapMutations([
      'setDataDisplayLayout',
      'setShowShoppingCart',
      'setHideFilters',
      'setFilterSelection',
      'setSearchText'
    ]),
    toggleDataDisplayLayout () {
      const value =
        this.dataDisplayLayout === 'TableView' ? 'CardView' : 'TableView'
      this.setDataDisplayLayout(value)
    },
    openShoppingCart () {
      this.setShowShoppingCart(true)
      this.setHideFilters(true)
    }
  }
})
</script>
