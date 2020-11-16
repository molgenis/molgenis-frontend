<template>
<div>

  <div class="btn-toolbar justify-content-between pb-1" role="toolbar" aria-label="Table actions Toolbar">
    <div class="btn-group" role="group" aria-label="Row actions group">
      <button type="button" class="btn btn-outline-secondary"><i class="fas fa-plus"></i></button>
      <button type="button" class="btn btn-outline-secondary" :disabled="!selectedRows.length"><i class="fas fa-trash"></i></button>
    </div>
    <div class="btn-group" role="group" aria-label="Colum actions group">
      <button type="button" class="btn btn-outline-secondary"
        :disabled="!this.hiddenColumns.length"
        @click="toggleUnhide">
        <i class="fas fa-eye"></i>
      </button>
      <button type="button" class="btn btn-outline-secondary" v-b-modal.modal-1>
        <i class="fas fa-eye-slash"></i>
      </button>
        <b-modal id="modal-1" title="Hidden columns" ok-only scrollable>
          <div class="form-check" v-for="attr in this.tableMeta.attributes" :key="attr.name">
            <input class="form-check-input" type="checkbox" :value="attr.name" v-model="hiddenColumns">
            <label class="form-check-label">
              {{attr.label}}
            </label>
          </div>
       </b-modal>
      <button type="button" class="btn btn-outline-secondary" :disabled="!selectedColumns.length"><i class="fas fa-arrow-left"></i></button>
      <button type="button" class="btn btn-outline-secondary" :disabled="!selectedColumns.length"><i class="fas fa-arrow-right"></i></button>
    </div>

    <div class="btn-group" role="group" aria-label="Table actions group">
      <button type="button" class="btn btn-outline-secondary"><i class="fas fa-download"></i></button>
    </div>
  </div>

  <div class="mg-data-table-container">
    <table class="table table-bordered table-hover" v-columns-resizable>
      <thead>
        <tr>
          <th v-if="showRowSelect || showRowActions" class="checkbox-cell top-left-corner">
            <input v-if="showRowSelect" class="form-check-input" type="checkbox" value="" >
          </th>
          <th scope="col" v-for="attr in visibleColumns" :key="attr.name"
          :class="{ 'col-hover': attr.name ===  hovercol, 'selected': selectedColumns.includes(attr.name) }"
          @mouseover="hovercol = attr.name"
          @mouseleave="hovercol = ''"
          @click.meta.exact="selectMultiColumn(attr.name)"
          @click.exact="selectColumn(attr.name)"
          >
            <span class="text-nowrap pr-3 col-header-label">{{attr.label}}
              <i class="cell-action fas fa-sort pl-1"></i>
              <i class="cell-action fas fa-eye-slash pl-2" @click="hideColumn(attr.name)"></i>
            </span>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="row in tableData.items" :key="row.id">
          <th v-if="showRowSelect || showRowActions" class="checkbox-cell align-middle text-nowrap">
            <input v-if="showRowSelect" class="form-check-input" type="checkbox" v-model="selectedRows" :value="row.id" >
              <i v-if="showRowActions" class="fas fa-s fa-search cell-action ml-2"></i>
              <i v-if="showRowActions" class="fas fa-s fa-edit cell-action ml-1"></i>
              <i v-if="showRowActions" class="fas fa-s fa-trash cell-action ml-1"></i>
          </th>
          <td v-for="attr in visibleColumns" :key="attr.name" class="text-nowrap text-truncate mg-data-column"
            :class="{ 'col-hover': attr.name ===  hovercol, 'selected': selectedColumns.includes(attr.name) }">
            {{row[attr.name]}}
          </td>
        </tr>
      </tbody>

    </table>
  </div>

  <nav aria-label="Page navigation example" class="mt-3">
    <ul class="pagination justify-content-center">
      <li class="page-item disabled">
        <a class="page-link" href="#" tabindex="-1">Previous</a>
      </li>
      <li class="page-item"><a class="page-link" href="#">1</a></li>
      <li class="page-item"><a class="page-link" href="#">2</a></li>
      <li class="page-item"><a class="page-link" href="#">3</a></li>
      <li class="page-item">
        <a class="page-link" href="#">Next</a>
      </li>
    </ul>
  </nav>

</div>
</template>

<script>
export default {
  name: 'EntityTable',
  data () {
    return {
      hovercol: '',
      selectedColumns: [],
      hiddenColumns: [],
      selectedRows: []
    }
  },
  props: {
    tableData: {
      type: Object
    },
    tableMeta: {
      type: Object
    },
    showRowSelect: {
      type: Boolean,
      default: () => true
    },
    showRowActions: {
      type: Boolean,
      default: () => true
    }
  },
  computed: {
    visibleColumns () {
      return this.tableMeta.attributes.filter(attr => {
        return !this.hiddenColumns.includes(attr.name)
      })
    }
  },
  methods: {
    selectColumn (columnName) {
      const index = this.selectedColumns.indexOf(columnName)
      this.selectedColumns.splice(0, this.selectedColumns.length)
      if (index === -1) {
        this.selectedColumns.push(columnName)
      }
    },
    selectMultiColumn (columnName) {
      const index = this.selectedColumns.indexOf(columnName)
      index === -1 ? this.selectedColumns.push(columnName) : this.selectedColumns.splice(index, 1)
    },
    hideColumn (columnName) {
      this.hiddenColumns.push(columnName)
    },
    unHideColumn (columnName) {
      const index = this.hiddenColumns.indexOf(columnName)
      this.hiddenColumns.splice(index, 1)
    },
    toggleUnhide () {
      this.hiddenColumns.splice(0, this.hiddenColumns.length)
    }
  }
}
</script>

<style scoped>

  table {
    table-layout: fixed;
  }

  .mg-data-table-container {
    max-height: 30rem;
    overflow-y: auto;
    overflow-x: auto;
  }

  .top-left-corner:before {
    pointer-events: none;
    content: '';
    position: absolute;
    height: auto;
    width: auto;
    top: -1px;
    right: -1px;
    bottom: -1px;
    left: -1px;
    border: 1px solid #dee2e6;
  }

  .col-header-label:hover {
    cursor: pointer;
  }

  th:hover .col-header-label i.fa-sort {
    display: inline;
  }

  th:hover .col-header-label i.fa-eye-slash {
    display: inline;
  }

  .col-hover {
    background-color: #c0c0c0;
  }

  .selected {
    background-color: #c0c0c0;
  }

  /**
   * Fix borders in the head
   */

  thead th:after,
  thead th:before {
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
  }

  thead th:before {
    top: -1px;
    border-top: 1px solid #dee2e6;
  }

  thead th:after {
    bottom: -1px;
    border-bottom:
    1px solid #dee2e6;
  }

  thead th.col-hover {
    cursor: pointer;
  }

  /**
   * Fix borders in the first column
   */
  tbody th:after,
  tbody th:before {
    content: '';
    position: absolute;
    top: 0;
    height: 100%;
  }

  tbody th:before {
    left: -1px;
    border-left: 1px solid #dee2e6;
  }

  tbody th:after {
    right: -1px;
    border-right: 1px solid #dee2e6;
  }

  thead th {
    position: -webkit-sticky; /* for Safari */
    position: sticky;
    top: 0;
    background-color: #ffffff;
    border: 1px #dee2e6 solid;
    width: 12rem;
  }

  thead th.top-left-corner {
    width: 3rem;
  }

  thead th:first-child {
    left: 0;
    z-index: 1;
    box-sizing: border-box;
  }

  tbody th {
    position: -webkit-sticky; /* for Safari */
    position: sticky;
    left: 0;
    background: #ffffff;
    border-right: 1px #dee2e6 solid;
  }

  .mg-data-column {
    max-width: 8rem;
    overflow: hidden;
  }

  .cell-action {
    color: #767676;
  }

  .checkbox-cell .form-check-input {
    position: static;
    margin-top: 0;
    margin-left: 0;
  }

  .col-header-label i {
    display: none;
  }

</style>

<docs>
Display entity data in table view
### Usage
```jsx
// bool props
const showRowSelect = true // toggle row selection on/off
const showRowActions = false // toglge row action on/off

<EntityTable
  v-bind:tableData="typeTestData"
  v-bind:tableMeta="typeTestMetaData"
  v-bind:showRowSelect="showRowSelect"
  v-bind:showRowActions="showRowActions">
</EntityTable>
```
</docs>
