<template>
  <div class="btn-toolbar justify-content-between" role="toolbar">
    <div
      v-if="!showSelected"
      class="btn-group"
      role="group"
      aria-label="Row actions group"
    >
      <button
        type="button"
        class="btn btn-outline-secondary show-filters-button"
        v-b-tooltip.hover.bottom
        :title="$t('dataexplorer_show_filters_btn_tooltip')"
        @click="setHideFilters(false)"
      >
        <font-awesome-icon icon="chevron-right"></font-awesome-icon>
      </button>

      <a
        v-if="hasEditRights"
        role="button"
        class="btn btn-outline-secondary add-row"
        :href="'/plugin/data-row-edit/' + tableName"
        v-b-tooltip.hover.bottom
        :title="$t('dataexplorer_add_entity_btn_tooltip')"
      >
        <font-awesome-icon icon="plus-square"></font-awesome-icon>
      </a>
    </div>

    <div class="btn-group" role="group" aria-label="Column actions group">
      <search-component v-model="searchText" />
    </div>

    <div class="btn-group" role="group" aria-label="sort selector">
      <sort-select
        :sortOptions="sortOptions"
        :sort="sort"
        @sort="handleSortSelectChange"
      ></sort-select>
    </div>
    <div class="btn-group" arial-label="table settings">
      <b-button variant="outline-secondary" v-b-modal.hide-show-columns>{{
        "dataexplorer_toggle_column_visibility_btn_tooltip" | i18n
      }}</b-button>
      <b-modal
        ok-only
        scrollable
        id="hide-show-columns"
        :title="$t('dataexplorer_toggle_column_visibility_modal_header')"
      >
        <column-selection></column-selection>
      </b-modal>
    </div>
    <div class="btn-group" role="group" aria-label="Table actions group">
      <button
        :disabled="isDownloading"
        @click="downloadData"
        class="btn btn-outline-secondary"
        v-b-tooltip.hover.bottom
        :title="$t('dataexplorer_download_btn_tooltip')"
      >
        <font-awesome-icon icon="download" />
      </button>

      <button
        type="button"
        role="button"
        v-if="!showSelected && dataDisplayLayout === 'TableView'"
        @click="toggleDataDisplayLayout"
        class="btn btn-light btn-outline-secondary card-layout"
        v-b-tooltip.hover.bottom
        :title="$t('dataexplorer_select_view_card_view_tooltip')"
      >
        <font-awesome-icon icon="th"></font-awesome-icon>
      </button>

      <button
        type="button"
        role="button"
        v-else-if="!showSelected"
        @click="toggleDataDisplayLayout"
        class="btn btn-light btn-outline-secondary table-layout"
        v-b-tooltip.hover.bottom
        :title="$t('dataexplorer_select_view_table_view_tooltip')"
      >
        <font-awesome-icon icon="th-list"></font-awesome-icon>
      </button>

      <table-settings-button
        v-if="hasEditSettingsRights"
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
import {
  faStore,
  faTh,
  faThList,
  faSlidersH,
  faShoppingBag,
  faPlusSquare,
  faDownload,
  faCog
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import SearchComponent from '../components/SearchComponent'
import TableSettingsButton from '../components/utils/TableSettingsButton'
import SortSelect from '../components/SortSelect'
import ColumnSelection from '@/components/ColumnSelection.vue'

library.add(
  faTh,
  faThList,
  faSlidersH,
  faStore,
  faShoppingBag,
  faPlusSquare,
  faDownload,
  faCog
)

export default {
  name: 'ToolbarView',
  components: {
    FontAwesomeIcon,
    SearchComponent,
    TableSettingsButton,
    SortSelect,
    ColumnSelection
  },
  computed: {
    ...mapState([
      'filters',
      'dataDisplayLayout',
      'tableMeta',
      'tableSettings',
      'tableName',
      'showSelected',
      'settingsTable',
      'sort'
    ]),
    ...mapGetters([
      'hasEditRights',
      'hasEditSettingsRights',
      'compressedRouteFilter'
    ]),
    searchText: {
      get () {
        return this.$store.state.searchText
      },
      set (value) {
        this.$store.commit('setSearchText', value)
        this.$router.push({
          name: 'main-view',
          query: { ...this.$route.query, filter: this.compressedRouteFilter }
        })
      }
    },
    sortOptions () {
      return !this.tableMeta
        ? []
        : this.tableMeta.attributes
          .filter((a) => a.visible)
          .filter((a) => a.type !== 'compound')
          .map((a) => ({ id: a.id, name: a.name }))
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
      await this.downloadResources([
        {
          id: this.tableMeta.id,
          type: 'ENTITY_TYPE'
        }
      ])
      this.isDownloading = false
    },
    toggleDataDisplayLayout () {
      const value =
        this.dataDisplayLayout === 'TableView' ? 'CardView' : 'TableView'
      this.$router.push({
        name: 'main-view',
        params: { ...this.$route.params, view: value },
        query: { ...this.$route.query }
      })
    },
    handleSortSelectChange (sort) {
      this.$router.push({
        name: 'main-view',
        query: {
          ...this.$route.query,
          sort: `${sort.isSortOrderReversed ? '-' : ''}${sort.sortColumnName}`
        }
      })
    }
  }
}
</script>

<style scoped>

.btn-toolbar {
  flex-wrap: wrap;
  margin-top: -0.5rem;
}

.btn-group{
  margin: 0.5rem 0.5rem 0 0;
}
/*
@media screen and (max-width: 1160px) {
  .btn-toolbar {
    flex-wrap: wrap;
    justify-content: start !important;
  }
  .btn-group{
    margin: 1rem 1rem 0 0;
  }
}
*/
.btn-toolbar .btn.btn-outline-secondary:focus {
  outline: none;
  box-shadow: none;
}
.btn-toolbar .btn.btn-outline-secondary:not(:hover):focus,
.btn-toolbar .btn.btn-outline-secondary:not(:hover):active {
  background-color: inherit;
  color: var(--secondary);
  border-color: var(--secondary);
}
</style>
