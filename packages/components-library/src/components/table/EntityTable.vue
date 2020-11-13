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

  <div class="scrollme mg-data-table">
    <table class="table table-bordered table-hover">

      <thead>
        <tr>
          <th v-if="enableRowSelect" class="checkbox-cell align-middle">
            <input class="form-check-input" type="checkbox" value="" >
          </th>
          <th v-if="enableRowDetail || enableEditActions" class="row-actions-col-head">
          </th>
          <th scope="col" v-for="attr in Object.values(tableMeta.attributes)" :key="attr.name">
            <span class="text-nowrap">{{attr.label}}
              <i v-show="enableColumnActions && attr.name === 'xbool'" class="col-header-action fas fa-sort pl-1"></i>
              <i v-show="enableColumnActions" class="col-header-action fas fa-filter pl-2"></i>
              <i v-show="enableColumnActions" class="col-header-action fas fa-eye pl-2"></i>
            </span>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="row in tableData.items" :key="row.id">
          <td v-if="enableRowSelect" class="checkbox-cell  align-middle">
            <input class="form-check-input" type="checkbox" value="" >
          </td>
          <td v-if="enableRowDetail || enableEditActions" class="text-nowrap">
            <!-- <button type="button" class="btn btn-sm btn-secondary"> -->
              <i class="fas fa-xs fa-search"></i>
            <!-- </button> -->
            <!-- <button type="button" class="btn btn-sm btn-secondary ml-1"> -->
              <i class="fas fa-xs fa-edit ml-1"></i>
            <!-- </button>
            <button type="button" class="btn btn-sm btn-secondary ml-1"> -->
              <i class="fas fa-xs fa-trash ml-1"></i>
            <!-- </button> -->
          </td>
          <td v-for="(col, index) in Object.values(row)" :key="index" class="text-nowrap text-truncate mg-data-column">
            {{col}}
          </td>
        </tr>
      </tbody>

    </table>
  </div>

  <nav aria-label="Page navigation example">
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
    enableRowSelect: {
      type: Boolean,
      default: () => true
    },
    enableRowDetail: {
      type: Boolean,
      default: () => true
    },
    enableEditActions: {
      type: Boolean,
      default: () => false
    },
    enableColumnActions: {
      type: Boolean,
      default: () => false
    }
  },
  computed: {}
}
</script>

<style scoped>

  .scrollme {
      overflow-x: auto;
  }

  .mg-data-table {
    max-height: 40rem;
    overflow-y: auto;
  }

  .mg-data-column {
    max-width: 8rem;
    overflow: hidden;
    /* text-overflow: ellipsis; */
  }

  .col-header-action {
    color: #767676;
  }

  .checkbox-cell {
    text-align: center;
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
const enableRowSelect = true // toggle row selection on/off
const enableRowDetail = true // toglge row detail btn on/off
const enableEditActions = false // toglge row detail btn on/off
const enableColumnActions = false

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
  v-bind:enableRowSelect="enableRowSelect"
  v-bind:enableRowDetail="enableRowDetail"
  v-bind:enableEditActions="enableEditActions"
  v-bind:enableColumnActions="enableColumnActions">
</EntityTable>
```
</docs>
