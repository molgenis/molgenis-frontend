<template>
  <div class="btn-toolbar justify-content-between" role="toolbar">

    <div v-if="!showSelected" class="btn-group" role="group" aria-label="Row actions group">
      <button type="button" class="btn btn-outline-secondary show-filters-button"
        v-b-tooltip.hover.bottom="'Show Filters'"
        v-if="filters.hideSidebar"
        @click="setHideFilters(false)">
        <font-awesome-icon icon="chevron-right"></font-awesome-icon>
      </button>

      <a v-if="hasEditRights" type="button" role="button" class="btn btn-outline-secondary add-row"
      :href="'/plugin/data-row-edit/' + tableName"
      v-b-tooltip.hover.bottom="'Add'">
        <font-awesome-icon icon="plus-square"></font-awesome-icon>
      </a>
      <button v-if="hasEditRights" type="button" class="btn btn-outline-secondary" v-b-tooltip.hover.bottom="'Delete'">
        <font-awesome-icon icon="trash" />
      </button>
    </div>

    <div class="btn-group" role="group" aria-label="Colum actions group">
      <search-component v-model="searchText"></search-component>
    </div>

    <div class="btn-group" role="group" aria-label="Table actions group">
      <button :disabled="isDownloading" @click="downloadData" class="btn btn-outline-secondary"
        v-b-tooltip.hover.bottom="'Download'">
        <font-awesome-icon icon="download" />
      </button>

      <button type="button" role="button"
        v-if="!showSelected && dataDisplayLayout === 'TableView'"
        @click="toggleDataDisplayLayout"
        class="btn btn-light btn-outline-secondary card-layout"
        v-b-tooltip.hover.bottom="'Card view'">
        <font-awesome-icon icon="th"></font-awesome-icon>
      </button>

      <button type="button" role="button"
        v-else-if="!showSelected"
        @click="toggleDataDisplayLayout"
        class="btn btn-light btn-outline-secondary table-layout"
        v-b-tooltip.hover.bottom="'Tabel view'">
        <font-awesome-icon icon="th-list"></font-awesome-icon>
      </button>

      <table-settings-button v-if="hasEditSettingsRights"
        :settingsRowId="tableSettings.settingsRowId"
        :settingsTableId="settingsTable"
      ></table-settings-button>
    </div>

  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStore, faTh, faThList, faSlidersH, faShoppingBag, faPlusSquare, faDownload, faCog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import SearchComponent from '../components/SearchComponent'
import TableSettingsButton from '../components/utils/TableSettingsButton'

library.add(faTh, faThList, faSlidersH, faStore, faShoppingBag, faPlusSquare, faDownload, faCog)

export default Vue.extend({
  name: 'ToolbarView',
  components: { FontAwesomeIcon, SearchComponent, TableSettingsButton },
  computed: {
    ...mapState([
      'filters',
      'dataDisplayLayout',
      'tableMeta',
      'tableSettings',
      'searchText',
      'tableName',
      'showSelected',
      'settingsTable'
    ]),
    ...mapGetters([
      'hasEditRights',
      'hasEditSettingsRights'
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
      'setHideFilters',
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

<style scoped>
  /* safari scrollbar fix */
  .btn-toolbar{
    min-height: 36px;
  }

  .btn-toolbar .btn:focus,.btn:active {
   outline: none;
   box-shadow: none;
}
</style>
