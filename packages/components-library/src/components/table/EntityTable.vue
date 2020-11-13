<template>
<div>
  <div class="btn-toolbar justify-content-between pb-1" role="toolbar" aria-label="Table actions Toolbar">
    <div class="btn-group" role="group" aria-label="Row actions group">
      <button type="button" class="btn btn-outline-secondary">Add</button>
      <button type="button" class="btn btn-outline-secondary">Remove</button>
    </div>
    <div class="btn-group" role="group" aria-label="Colum group">
      <button type="button" class="btn btn-outline-secondary">Hide</button>
      <button type="button" class="btn btn-outline-secondary">Sort</button>
      <button type="button" class="btn btn-outline-secondary">Filter</button>
      <button type="button" class="btn btn-outline-secondary">Move Left</button>
      <button type="button" class="btn btn-outline-secondary">Move Right</button>
    </div>

    <div class="btn-group" role="group" aria-label="Table actions group">
      <button type="button" class="btn btn-outline-secondary">Download</button>
    </div>
  </div>

  <div class="mg-data-table-container">
    <table class="table table-bordered table-hover">

      <thead>
        <tr>
          <th v-if="showRowSelect || showRowActions" class="checkbox-cell top-left-corner">
            <input v-if="showRowSelect" class="form-check-input" type="checkbox" value="" >
          </th>
          <th scope="col" v-for="attr in Object.values(tableMeta.attributes)" :key="attr.name">
            <span class="text-nowrap">{{attr.label}}
              <i v-show="showColumnActions" class="cell-action fas fa-sort pl-1"></i>
              <i v-show="showColumnActions" class="cell-action fas fa-filter pl-2"></i>
              <i v-show="showColumnActions" class="cell-action fas fa-eye pl-2"></i>
            </span>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="row in tableData.items" :key="row.id">
          <th v-if="showRowSelect || showRowActions" class="checkbox-cell align-middle text-nowrap">
            <input v-if="showRowSelect" class="form-check-input" type="checkbox" value="" >
              <i v-if="showRowActions" class="fas fa-s fa-search cell-action ml-2"></i>
              <i v-if="showRowActions" class="fas fa-s fa-edit cell-action ml-1"></i>
              <i v-if="showRowActions" class="fas fa-s fa-trash cell-action ml-1"></i>
          </th>
          <td v-for="(col, index) in Object.values(row)" :key="index" class="text-nowrap text-truncate mg-data-column">
            {{col}}
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
    },
    showColumnActions: {
      type: Boolean,
      default: () => false
    }
  },
  computed: {}
}
</script>

<style scoped>

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
    /* color: #FFF; */
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
    /* border-right: 1px solid #CCC; */
  }

  .mg-data-column {
    max-width: 8rem;
    overflow: hidden;
    /* text-overflow: ellipsis; */
  }

  .cell-action {
    color: #767676;
  }

  .checkbox-cell .form-check-input {
    position: static;
    margin-top: 0;
    margin-left: 0;
  }
</style>

<docs>
Display entity data in table view
### Usage
```jsx
// bool props
const showRowSelect = true // toggle row selection on/off
const showRowActions = false // toglge row action on/off
const showColumnActions = false // toglge column header action on/off

// const tableData = {
//       1: { // 1 is the value of the idAttribute of the entity
//         id: 1, // id is the name of the attribute, 1 is the value of the attribute
//         firstName: 'Mark', lastName: 'Otto', handle: '@mdo'
//       },
//       2: {id: 2, firstName: 'Jacob', lastName: 'Thornton', handle: '@fat' },
//       3: {id: 3, firstName: 'Larry', lastName: 'the Bird', handle: '@twitter'}
//     }

const tableMeta = {
  id: "demo_twitter_devs",
  label: "Developers",
  description: "a list of bootstrap devs",
  package: "http://localhost:443/api/data/demo_twitter",
  idAttribute: {
    name: "id",
    label: "id",
    type: "string",
    idAttribute: true,
  },
  attributes: {
    id: { name: "id", label: "id", type: "string", idAttribute: true },
    firstName: { name: "firstName", label: "First", type: "string", idAttribute: false },
    lastName: { name: "lastName", label: "Last", type: "string", idAttribute: false },
    handle: { name: "handle", label: "Handle", type: "string", idAttribute: false }
  }
}

<EntityTable
  v-bind:tableData="typeTestData"
  v-bind:tableMeta="typeTestMetaData"
  v-bind:showRowSelect="showRowSelect"
  v-bind:showRowActions="showRowActions"
  v-bind:showColumnActions="showColumnActions">
</EntityTable>
```
</docs>
