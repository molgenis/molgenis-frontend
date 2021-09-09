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
            :disabled="editMode || deleteMode"
            @click="toggleAddMode()">
            {{ addMode ? 'Cancel' : 'Add' }}
          </button>
          <button
            class="btn mr-3"
            :class="editMode ? 'btn-danger px-3' : 'btn-outline-primary px-4'"
            :disabled="addMode || deleteMode"
            @click="toggleEditMode()">
            {{ editMode ? 'Cancel' : 'Edit' }}
          </button>
          <button
            class="btn mr-3"
            :class="deleteMode ? 'btn-danger px-3' : 'btn-outline-danger px-4'"
            :disabled="addMode || editMode"
            @click="deleteMode = !deleteMode">
            {{ deleteMode ? 'Cancel' : 'Delete' }}
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
                <b-form-select
                  v-if="selectedNewPermissionType === 'role'"
                  v-model="newPermissionObject.role"
                  :options="selectableRoles" />
                <b-form-select
                  v-else
                  v-model="newPermissionObject.user"
                  :options="selectableUsers"
                  :disabled="selectedNewPermissionType !== 'user'" />
              </td>
              <td class="pl-0">
                <b-form-select
                  v-model="newPermissionType"
                  class="w-auto m-0 pl-2"
                  :options="available_types"
                  @change="resetNewPermissionObject" />
              </td>
              <td class="text-middle px-0 d-flex">
                <b-form-select
                  v-model="newPermissionObject.permission"
                  class="w-auto ml-1 pl-1 mr-3"
                  :options="available_permissions" />
                <button
                  class="btn btn-success px-4 ml-auto"
                  :disabled="!canAddPermission"
                  @click="addPermission">
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
                class="align-middle text-middle  w-25">
                <div class="d-flex align-items-center">
                  {{ permission.permission }}
                  <button
                    v-if="deleteMode"
                    class="btn btn-danger ml-auto py-1 px-2"
                    @click="removePermission(index)">
                    <font-awesome-icon
                      icon="trash-alt" />
                  </button>
                </div>
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
      deleteMode: false,
      available_roles: [],
      available_users: [],
      permissionObjects: {},
      newPermissionType: '',
      newPermissionObject: {},
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
    canAddPermission () {
      return (this.newPermissionObject.role || this.newPermissionObject.user) && this.newPermissionObject.permission
    },
    hasChanges () {
      return this.changedPermissionObjects.length
    },
    selectedNewPermissionType () {
      return this.newPermissionType
    },
    selectableUsers () {
      let assignedUsers = ['admin'] // assigning admin is not necessary
      assignedUsers = assignedUsers.concat(this.permissionObjects.permissions.map(item => item.user))
      return this.available_users.filter(f => !assignedUsers.includes(f.value))
    },
    selectableRoles () {
      let assignedRoles = ['SU'] // assigning SU is not necessary
      assignedRoles = assignedRoles.concat(this.permissionObjects.permissions.map(item => item.role))
      return this.available_roles.filter(f => !assignedRoles.includes(f.value))
    }
  },
  beforeMount () {
    this.getPermissionsForObject()
    this.getAllRoles()
    this.getAllUsers()
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
    addPermission () {
      this.addMode = false
      api.post(`/api/permissions/${this.entityId}/${this.objectId}`, { body: JSON.stringify({ permissions: [this.newPermissionObject] }) }).then(() => {
        this.getPermissionsForObject()
      }).catch(async (e) => {
        const response = await e.json()
        this.error(response.detail)
      })

      this.newPermissionObject = {}
    },
    removePermission (index) {
      const permissionToDelete = JSON.parse(JSON.stringify(this.permissions[index]))
      delete permissionToDelete.permission
      api.delete_(`/api/permissions/${this.entityId}/${this.objectId}`, { body: JSON.stringify(permissionToDelete) }).then(() => {
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
        this.available_roles = response.items.map(item => ({ value: item.data.name, text: `${item.data.label} (${item.data.name})` }))
      })
    },
    getAllUsers () {
      api.get('/api/identities/user').then((response) => {
        this.available_users = response.map(user => ({ text: user.username, value: user.username }))
      })
    },
    // if you switch type, reset the object
    resetNewPermissionObject () {
      delete this.newPermissionObject.role
      delete this.newPermissionObject.user
    },
    error (mssg) {
      this.$bvToast.toast(mssg, {
        title: 'Error occurred',
        toaster: 'b-toaster-bottom-right',
        solid: true,
        variant: 'danger',
        appendToast: true,
        autoHideDelay: 6000
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
