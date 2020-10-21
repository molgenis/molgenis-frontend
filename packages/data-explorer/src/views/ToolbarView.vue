<template>
  <div class="toolbar row">
    <div class="col-4">
      <a
        v-if="hasEditRights && !showSelected"
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
        v-if="!showSelected && dataDisplayLayout === 'TableView'"
        @click="toggleDataDisplayLayout"
        class="btn btn-light ml-1 float-right btn-outline-secondary card-layout">
        <font-awesome-icon icon="th"></font-awesome-icon>
        Card layout
      </button>
      <button
        v-else-if="!showSelected"
        @click="toggleDataDisplayLayout"
        class="btn btn-light ml-1 float-right btn-outline-secondary table-layout">
        <font-awesome-icon icon="th-list"></font-awesome-icon>
        Table layout
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import SearchComponent from '../components/SearchComponent'

export default {
  components: { SearchComponent },
  computed: {
    ...mapState([
      'dataDisplayLayout',
      'tableSettings',
      'searchText',
      'tableName',
      'showSelected'
    ]),
    ...mapGetters([
      'hasEditRights'
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
      'setFilterSelection',
      'setSearchText'
    ]),
    toggleDataDisplayLayout () {
      const value =
        this.dataDisplayLayout === 'TableView' ? 'CardView' : 'TableView'
      this.setDataDisplayLayout(value)
    }
  }
}
</script>
