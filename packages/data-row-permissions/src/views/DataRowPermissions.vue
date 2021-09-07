<template>
  <div class="w-75 mx-auto my-5">
    <div class="d-flex justify-content-between">
      <h3 class="mb-4">
        Permission(s) of {{ permissionObjects.label }}
      </h3>
      <router-link
        :to="{ name: 'SelectEntitityObject', params: { entityId }}"
        class="mb-4 px-4 btn btn-secondary align-self-center">
        Back
      </router-link>
    </div>
    <server-status :code="status" />
    <div>
      <div class="mt-5">
        <div class="mb-3">
          <button
            class="btn mr-3"
            :class="addMode ? 'btn-danger px-3' : 'btn-primary px-4'"
            :disabled="editMode"
            @click="toggleAddMode()">
            {{ addMode ? 'Cancel' : 'Add' }}
          </button>
          <button
            class="btn mr-3"
            :class="editMode ? 'btn-danger px-3' : 'btn-outline-primary px-4'"
            :disabled="addMode"
            @click="toggleEditMode()">
            {{ editMode ? 'Cancel' : 'Edit' }}
          </button>
          <b-form-input
            v-model="search"
            class="filter-height w-25 d-inline"
            type="text"
            placeholder="Type to filter" />
        </div>
        <table
          v-if="permissions && permissions.length"
          class="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th class="text-middle">
                Permission
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="addMode">
              <td class="pl-0">
                <b-form-input
                  v-model="newPermissionObject.role" />
              </td>
              <td class="pl-0">
                <b-form-select
                  :value="newPermissionObject.type"
                  class="w-auto m-0 pl-2"
                  :options="available_types"
                  @change="(value) => addPermissionChange(index, value)" />
              </td>
              <td class="text-middle pl-0">
                <b-form-select
                  :value="newPermissionObject.permission"
                  class="w-auto ml-1 pl-1 mr-3"
                  :options="available_permissions"
                  @change="(value) => addPermissionChange(index, value)" />
                <button
                  class="btn btn-success px-4"
                  :disabled="!hasChanges">
                  Save
                </button>
              </td>
            </tr>
            <tr
              v-for="(permission, index) of permissions"
              :key="permission.id">
              <td class="align-middle">
                {{ permission.user || permission.role }}
              </td>
              <td class="align-middle w-25">
                {{ permission.role ? 'Role' : 'User' }}
              </td>
              <td
                v-if="!editMode"
                class="align-middle text-middle w-25">
                {{ permission.permission }}
              </td>
              <td
                v-else
                class="align-middle text-middle p-0 w-25">
                <b-form-select
                  :value="permissions[index].permission"
                  class="w-auto"
                  :options="available_permissions"
                  @change="(value) => addPermissionChange(index, value)" />
              </td>
            </tr>
          </tbody>
        </table>
        <div
          v-if="editMode"
          class="mt-3">
          <button
            class="btn btn-success px-4"
            :disabled="!hasChanges"
            @click="updatePermissions">
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// TODO: Break this down in to smaller pieces, use VUEX as well.
import api from '@molgenis/molgenis-api-client'
import ServerStatus from '../components/ServerStatus.vue'

export default {
  components: { ServerStatus },
  props: {
    entityId: {
      type: String,
      required: true
    },
    objectId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      status: 0,
      search: '',
      addMode: false,
      editMode: false,
      available_roles: [],
      permissionObjects: {},
      newPermissionObject: {
        type: ''
      },
      available_permissions: [],
      addedPermissionObjects: [],
      changedPermissionObjects: [],
      available_types: [{ text: 'Select a type', value: '' }, { text: 'Role', value: 'role' }, { text: 'User', value: 'user' }]
    }
  },
  computed: {
    unauthorized () {
      return this.status === 401
    },
    names () {
      return this.permissionObjects.permissions.map(permission => permission.role || permission.user)
    },
    permissions () {
      if (this.search && this.search) {
        const ciSearch = this.search.toLowerCase()
        return this.permissionObjects.permissions.filter(permission => {
          return (permission.role && ('role'.includes(ciSearch) || permission.role.toLowerCase().includes(ciSearch))) ||
          (permission.user && ('user'.includes(ciSearch) || permission.user.toLowerCase().includes(ciSearch))) ||
          permission.permission.toLowerCase().includes(ciSearch)
        })
      }
      return this.permissionObjects.permissions
    },
    hasChanges () {
      return this.changedPermissionObjects.length
    }
  },
  beforeMount () {
    this.getPermissionsForObject()
    this.getAllRoles()
    api.get(`/api/permissions/types/permissions/${this.entityId}`).then((response) => {
      this.available_permissions = response.data
    })
  },
  methods: {
    toggleEditMode () {
      // if true, it means we are going to cancel.
      if (this.editMode) {
        this.changedPermissionObjects = []
      }
      this.editMode = !this.editMode
    },
    toggleAddMode () {
      if (this.addMode) {
        // this.changedPermissionObjects = []
      }
      this.addMode = !this.addMode
    },
    updatePermissions () {
      this.editMode = false
      // TODO upgrade api-client
      fetch(`/api/permissions/${this.entityId}/${this.objectId}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        credentials: 'same-origin',
        method: 'PATCH',
        body: JSON.stringify({
          permissions: this.changedPermissionObjects
        })
      }).then(() => {
        // reset
        this.getPermissionsForObject()
      })
    },
    addPermissionChange (index, value) {
      const permissionItem = this.permissions[index]

      if (permissionItem.permission === value) {
        const hasBeenchangedBack = this.changedPermissionObjects.find(cpo => cpo.user === permissionItem.user)
        if (hasBeenchangedBack) {
          this.changedPermissionObjects.splice(hasBeenchangedBack, 1)
        }
        return
      }
      // make a hard copy
      const permissionBase = JSON.parse(JSON.stringify(this.permissions[index]))
      permissionBase.permission = value
      this.changedPermissionObjects.push(permissionBase)
    },
    getPermissionsForObject () {
      this.changedPermissionObjects = []
      this.addedPermissionObjects = []
      this.status = 0
      api.get(`/api/permissions/${this.entityId}/${this.objectId}`).then((response) => {
        this.permissionObjects = response.data
        this.status = response.status
      }).catch(e => {
        this.status = e.status
      })
    },
    getAllRoles () {
      api.get('/api/data/sys_sec_Role').then((response) => {
        this.available_roles = response.items.map(item => ({ value: item.data.name, text: item.data.label }))
      })
    }
  }
}
</script>
<style scoped>
.filter-height {
  padding: 0.3rem;
  position: relative;
  top: 2px;
}
</style>
