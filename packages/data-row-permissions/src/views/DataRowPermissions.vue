<template>
  <div class="w-75 mx-auto my-5">
    <div class="d-flex justify-content-between">
      <h3 class="mb-4">
        Permission(s) of {{ permissionObject.label }}
      </h3>
      <router-link
        :to="{ name: 'SelectEntitityObject', params: { entityId }}"
        class="mb-4 px-4 btn btn-secondary align-self-center">
        Back
      </router-link>
    </div>
    <server-status :code="responseStatus" />
    <div>
      <div class="mt-5">
        <div class="mb-3 d-flex">
          <button
            class="btn mr-3"
            :class="addMode ? 'btn-danger px-3' : 'btn-primary px-4'"
            :disabled="editMode || deleteMode"
            @click="addMode = !addMode">
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
            v-if="canChangeOwnerShip"
            class="btn mr-3 btn-outline-primary px-4"
            :disabled="addMode || editMode || deleteMode"
            @click="changeOwner = !changeOwner">
            <span>Change owner</span>
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
          <div class="ml-auto">
            <span class="font-weight-bold mr-3">Owned by:</span>
            <span>{{ permissionObject.ownedByUser || permissionObject.ownedByRole }}</span>
          </div>
        </div>
        <table
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
                  :options="availablePermissions" />
                <button
                  class="btn btn-success px-4 ml-auto"
                  :disabled="!canAddPermission"
                  @click="add">
                  Add
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
                    @click="remove(index)">
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
                  :options="availablePermissions"
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
            @click="update">
            Save
          </button>
        </div>
      </div>
    </div>
    <change-ownership
      v-model="changeOwner" />
  </div>
</template>

<script>
import ServerStatus from '../components/ServerStatus.vue'
import { mapActions, mapGetters, mapState } from 'vuex'

import ChangeOwnership from '../components/ChangeOwnership.vue'

export default {
  components: { ServerStatus, ChangeOwnership },
  props: {
    entityId:
    {
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
      search: '',
      addMode: false,
      editMode: false,
      deleteMode: false,
      changeOwner: false,
      newPermissionType: '',
      newPermissionObject: {},
      changedPermissionObjects: [],
      available_types: [{ text: 'Select a type', value: '' }, { text: 'Role', value: 'role' }, { text: 'User', value: 'user' }]
    }
  },
  computed: {
    ...mapGetters(['isSU']),
    ...mapState(['userOptions', 'roleOptions', 'permissionObject',
      'responseStatus', 'startInAddMode', 'availablePermissions']),
    names () {
      return this.permissionObject.permissions.map(permission => permission.role || permission.user)
    },
    permissions () {
      if (this.search && this.search) {
        const ciSearch = this.search.toLowerCase()
        return this.permissionObject.permissions.filter(permission => {
          return (permission.role && ('role'.includes(ciSearch) || permission.role.toLowerCase().includes(ciSearch))) ||
          (permission.user && ('user'.includes(ciSearch) || permission.user.toLowerCase().includes(ciSearch))) ||
          permission.permission.toLowerCase().includes(ciSearch)
        })
      }
      return this.permissionObject.permissions
    },
    canAddPermission () {
      return (this.newPermissionObject.role || this.newPermissionObject.user) && this.newPermissionObject.permission
    },
    hasChanges () {
      return this.changedPermissionObjects.length > 0
    },
    selectedNewPermissionType () {
      return this.newPermissionType
    },
    canChangeOwnerShip () {
      return this.permissionObject.yours === true || this.isSU === true
    },
    selectableUsers () {
      const assignedUsers = this.permissionObject.permissions.map(item => item.user)
      return this.userOptions.filter(f => !assignedUsers.includes(f.value) && !f.superuser)
    },
    selectableRoles () {
      let assignedRoles = ['SU'] // assigning SU is not necessary
      assignedRoles = assignedRoles.concat(this.permissionObject.permissions.map(item => item.role))
      return this.roleOptions.filter(f => !assignedRoles.includes(f.value))
    }
  },
  watch: {
    startInAddMode (startWithAdd) {
      if (startWithAdd) {
        this.addMode = true
      }
    }
  },
  beforeMount () {
    this.getPermissionsForObject()
    this.getAllRoles()
    this.getPermissionsByEntityId(this.entityId)
  },
  methods: {
    ...mapActions(['getAllRoles', 'getPermissionsForObject',
      'addPermission', 'removePermission', 'updatePermissions',
      'getPermissionsByEntityId']),
    toggleEditMode () {
      // if true, it means we are going to cancel.
      if (this.editMode) {
        this.changedPermissionObjects = []
      }
      this.editMode = !this.editMode
    },
    add () {
      this.addMode = false
      this.addPermission(this.newPermissionObject)
      this.newPermissionObject = {}
    },
    update () {
      this.editMode = false
      this.updatePermissions({ permissions: this.changedPermissionObjects })
      this.changedPermissionObjects = []
    },
    remove (index) {
      const permissionToRemove = JSON.parse(JSON.stringify(this.permissions[index]))
      this.removePermission(permissionToRemove)
    },
    addPermissionChange (index, value) {
      const permissionItem = this.permissions[index]

      if (permissionItem.permission === value) {
        const hasBeenchangedBack = this.changedPermissionObjects.findIndex(cpo => cpo.user === permissionItem.user)
        if (hasBeenchangedBack >= 0) {
          this.changedPermissionObjects.splice(hasBeenchangedBack, 1)
        }
        return
      }
      // make a hard copy
      const permissionBase = JSON.parse(JSON.stringify(this.permissions[index]))
      permissionBase.permission = value
      this.changedPermissionObjects.push(permissionBase)
    },
    // if you switch type, reset the object
    resetNewPermissionObject () {
      delete this.newPermissionObject.role
      delete this.newPermissionObject.user
    }
  }
}
</script>