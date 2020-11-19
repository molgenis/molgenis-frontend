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

      <div class="btn-group float-right">
        <button :disabled="isDownloading" @click="downloadData" class="btn btn-outline-secondary">{{$t('Download')}}</button>

        <button
          v-if="!showSelected && dataDisplayLayout === 'TableView'"
          @click="toggleDataDisplayLayout"
          class="btn btn-light btn-outline-secondary card-layout">
          <font-awesome-icon icon="th"></font-awesome-icon>
          Card layout
        </button>
        <button
          v-else-if="!showSelected"
          @click="toggleDataDisplayLayout"
          class="btn btn-light btn-outline-secondary table-layout">
          <font-awesome-icon icon="th-list"></font-awesome-icon>
          Table layout
        </button>
      </div>

    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStore, faTh, faThList, faSlidersH, faShoppingBag, faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import SearchComponent from '../components/SearchComponent'

library.add(faTh, faThList, faSlidersH, faStore, faShoppingBag, faPlusSquare)

export default Vue.extend({
  name: 'ToolbarView',
  components: { FontAwesomeIcon, SearchComponent },
  computed: {
    ...mapState([
      'dataDisplayLayout',
      'tableMeta',
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
  data: function () {
    return {
      isDownloading: false
    }
  },
  methods: {
    ...mapActions(['downloadResources']),
    ...mapMutations([
      'setDataDisplayLayout',
      'setFilterSelection',
      'setSearchText'
    ]),
    downloadData: async function () {
      this.isDownloading = true
      await this.downloadResources([{
        id: this.tableMeta.id,
        type: 'ENTITY_TYPE'
      }])
      this.isDownloading = false
    },
    toggleDataDisplayLayout () {
      const value =
        this.dataDisplayLayout === 'TableView' ? 'CardView' : 'TableView'
      this.setDataDisplayLayout(value)
    }
  }
})
</script>
