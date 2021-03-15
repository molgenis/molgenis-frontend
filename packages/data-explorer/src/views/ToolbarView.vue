<template>
  <div class="btn-toolbar justify-content-between" role="toolbar">
    <div
      v-if="!showSelected"
      class="btn-group"
      role="group"
      aria-label="Row actions group"
    >

      <router-link
        v-if="hasAddRights"
        class="btn btn-outline-secondary add-row"
        v-b-tooltip.hover.bottom
        :title="$t('dataexplorer_add_entity_btn_tooltip')"
        :to="{ name: 'de-create', params: { entity: tableName }, query: {}}"
      >
        <font-awesome-icon icon="plus-square"></font-awesome-icon>
      </router-link>
    </div>

    <div class="btn-group" role="group" aria-label="Column actions group">
      <search-component v-model="_searchText" />
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
        $t('dataexplorer_toggle_column_visibility_btn_tooltip')
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

      <router-link class="btn btn-light btn-outline-secondary table-settings" :to="{name: 'de-edit', params: {entity: settingsTable, dataRowId: tableSettings.settingsRowId }}">
        <font-awesome-icon icon="cog"/>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
import SearchComponent from '../components/SearchComponent'
import SortSelect from '../components/SortSelect'
import ColumnSelection from '@/components/ColumnSelection.vue'

export default {
  name: 'ToolbarView',
  components: {
    SearchComponent,
    SortSelect,
    ColumnSelection
  },
  computed: {
    ...mapState('explorer', [
      'filters',
      'dataDisplayLayout',
      'tableMeta',
      'tableSettings',
      'tableName',
      'searchText',
      'showSelected',
      'settingsTable',
      'sort'
    ]),
    ...mapGetters('explorer', [
      'hasAddRights',
      'hasEditSettingsRights',
      'compressedRouteFilter'
    ]),
    _searchText: {
      get () {
        return this.searchText
      },
      set (value) {
        this.$store.commit('explorer/setSearchText', value)
        this.$router.push({
          name: 'de-view',
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
    ...mapActions('explorer', ['downloadResources']),
    ...mapMutations('explorer', [
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
        name: 'de-view',
        params: { ...this.$route.params },
        query: { ...this.$route.query, view: value }
      })
    },
    handleSortSelectChange (sort) {
      this.$router.push({
        name: 'de-view',
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
