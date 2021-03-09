<template>
  <div class="table-container">
    <b-table
      :items="tableResources"
      :fields="fields"
      :filter="filter"
      :empty-text="$t('navigator:table-no-results')"
      class="text-left table-bordered"
      show-empty>
      <!-- A custom formatted header cell for field 'name' -->
      <!-- eslint-disable-next-line vue/no-unused-vars -->
      <template #head(selected)="data">
        <b-form-checkbox
          :class="tableResources.length == 0 ? 'invisible' : ''"
          :checked="isAllSelected()"
          @click.native.stop
          @change="toggleAllSelected">
          <!-- workaround for https://github.com/twbs/bootstrap/issues/26221 -->
          <span class="text-hide">placeholder</span>
        </b-form-checkbox>
      </template>
      <template #cell(selected)="row">
        <b-form-checkbox
          :checked="isSelected(row.item)"
          @click.native.stop
          @change="toggleSelected(row.item, $event)">
          <!-- workaround for https://github.com/twbs/bootstrap/issues/26221 -->
          <span class="text-hide">placeholder</span>
        </b-form-checkbox>
      </template>
      <template #cell(label)="label">
        <span v-if="label.item.type === 'ENTITY_TYPE'">
          <router-link :to="{name: 'de-view', params: {entity: label.item.id}}">
            <font-awesome-icon
              icon="list"
              fixed-width/> {{ label.item.label }}
          </router-link>
        </span>
        <span v-else-if="label.item.type === 'ENTITY_TYPE_ABSTRACT'">
          <font-awesome-icon
            icon="list"
            fixed-width/> {{ label.item.label }}
        </span>
        <span v-else>
          <router-link :to="{name: 'nav-view-folder', params: {folderId: label.item.id}}">
            <font-awesome-icon
              :icon="['far', 'folder-open']"
              fixed-width/> {{ label.item.label }}
          </router-link>
        </span>
      </template>
    </b-table>
  </div>
</template>

<script>
import {
  SELECT_ALL_RESOURCES,
  DESELECT_ALL_RESOURCES,
  DESELECT_RESOURCE,
  SELECT_RESOURCE
} from '@/store/navigator/actions'
import { mapState } from 'vuex'

export default {
  name: 'NavigatorTable',
  data () {
    return {
      fields: [
        {
          key: 'selected',
          'class': 'compact align-middle',
          tdClass: this.cellClass
        },
        {
          key: 'label',
          label: this.$t('navigator:table-col-header-name'),
          sortable: true,
          'class': 'text-nowrap',
          tdClass: this.cellClass
        },
        {
          key: 'description',
          label: this.$t('navigator:table-col-header-description'),
          sortable: false,
          'class': 'd-none d-md-table-cell',
          tdClass: this.cellClass
        }
      ],
      sortBy: 'label',
      filter: null,
      allSelected: false
    }
  },
  computed: {
    ...mapState('navigator', ['resources', 'selectedResources', 'showHiddenResources', 'clipboard']),
    tableResources () {
      return this.resources.filter(resource => this.showHiddenResources || !resource.hidden).map(
        resource => Object.assign({}, resource)).sort((a, b) => {
        if (a.type === 'PACKAGE' && b.type !== 'PACKAGE') {
          return -1
        } else if (b.type === 'PACKAGE' && a.type !== 'PACKAGE') {
          return 1
        } else {
          return a.label.localeCompare(b.label)
        }
      })
    },
    nrResources () {
      return this.resources.filter(resource => this.showHiddenResources || !resource.hidden).length
    },
    nrSelectedResources () {
      return Object.keys(this.selectedResources).length
    }
  },
  watch: {
    '$route' (to, from) {
      this.allSelected = false
    }
  },
  methods: {
    toggleSelected: function (resource, checked) {
      if (checked) {
        this.$store.dispatch(`navigator/${SELECT_RESOURCE}`, resource)
        this.allSelected = this.nrResources === this.nrSelectedResources
      } else {
        this.$store.dispatch(`navigator/${DESELECT_RESOURCE}`, resource)
        this.allSelected = false
      }
    },
    isSelected: function (resource) {
      return this.selectedResources.some(selectedResource => selectedResource.type === resource.type && selectedResource.id === resource.id)
    },
    toggleAllSelected: function (checked) {
      if (checked) {
        this.$store.dispatch(`navigator/${SELECT_ALL_RESOURCES}`)
      } else {
        this.$store.dispatch(`navigator/${DESELECT_ALL_RESOURCES}`)
      }
    },
    isAllSelected: function (resource) {
      return this.nrResources > 0 && this.nrResources === this.nrSelectedResources
    },
    isClipboardResource: function (resource) {
      return this.clipboard && this.clipboard.resources && this.clipboard.resources.some(
        clipboardResource => clipboardResource.type === resource.type && clipboardResource.id === resource.id)
    },
    cellClass: function (value, key, resource) {
      return this.isClipboardResource(resource) ? 'bg-warning' : ''
    }
  }
}
</script>

<style>
  .table-container {
    width: 100%;
    height: 70vh; /* no page scrollbar when using default header and footer */
    overflow-y: auto;
  }

  .invisible {
    visibility: hidden;
  }

  .compact {
    width: 1px;
    white-space: nowrap;
  }
</style>
