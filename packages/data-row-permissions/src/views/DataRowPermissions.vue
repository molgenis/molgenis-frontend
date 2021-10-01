<template>
  <div
    class="w-75 mx-auto my-5">
    <div class="d-flex justify-content-between">
      <h3 class="mb-4">
        {{ $t('data-row-permissions-rls-permissions-of') }} {{ permissionObject.label }}
      </h3>
      <back-button
        route="SelectEntitityObject"
        :params="{ entityId }" />
    </div>
    <server-status :code="responseStatus" />
    <div>
      <div class="mt-5">
        <div class="mb-3 d-flex">
          <button
            id="add-button"
            class="btn mr-3"
            :class="addMode ? 'btn-danger px-3' : 'btn-primary px-4'"
            :disabled="editMode || deleteMode"
            @click="addMode = !addMode">
            {{ addMode ? $t('data-row-permissions-cancel') : $t('data-row-permissions-add') }}
          </button>
          <button
            id="edit-button"
            class="btn mr-3"
            :class="editMode ? 'btn-danger px-3' : 'btn-outline-primary px-4'"
            :disabled="addMode || deleteMode"
            @click="toggleEditMode()">
            {{ editMode ? $t('data-row-permissions-cancel') : $t('data-row-permissions-edit') }}
          </button>
          <button
            v-if="canChangeOwnerShip"
            id="change-owner-button"
            class="btn mr-3 btn-outline-primary px-4"
            :disabled="addMode || editMode || deleteMode"
            @click="changeOwner = !changeOwner">
            <span>{{ $t('data-row-permissions-change-owner') }}</span>
          </button>
          <button
            id="delete-button"
            class="btn mr-3"
            :class="deleteMode ? 'btn-danger px-3' : 'btn-outline-danger px-4'"
            :disabled="addMode || editMode"
            @click="deleteMode = !deleteMode">
            {{ deleteMode ? $t('data-row-permissions-cancel') : $t('data-row-permissions-delete') }}
          </button>
          <b-form-input
            v-model="search"
            class="filter-height w-25 d-inline"
            type="text"
            :placeholder="$t('data-row-permissions-filter-placeholder')" />
          <div class="ml-auto">
            <span class="font-weight-bold mr-3">{{ $t('data-row-permissions-owned-by') }}:</span>
            <span>{{ permissionObject.ownedByUser || permissionObject.ownedByRole }}</span>
          </div>
        </div>
        <table
          class="table">
          <thead>
            <tr>
              <th>{{ $t('data-row-permissions-name') }}</th>
              <th>{{ $t('data-row-permissions-type') }}</th>
              <th class="text-middle">
                {{ $t('data-row-permissions-permission') }}
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
                  id="add-save-button"
                  class="btn btn-success px-4 ml-auto"
                  :disabled="!canAddPermission"
                  @click="add">
                  {{ $t('data-row-permissions-add') }}
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
                {{ permission.role ? $t('data-row-permissions-role') : $t('data-row-permissions-user') }}
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
            {{ $t('data-row-permissions-save') }}
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
import BackButton from '../components/BackButton.vue'
import { filterObjectOnStringProperties } from '../logic/filter'

export default {
  components: { ServerStatus, ChangeOwnership, BackButton },
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
      available_types: [{ text: this.$t('data-row-permissions-select'), value: '' },
        { text: this.$t('data-row-permissions-role'), value: 'role' },
        { text: this.$t('data-row-permissions-user'), value: 'user' }]
    }
  },
  computed: {
    ...mapGetters(['isSU']),
    ...mapState(['userOptions', 'roleOptions', 'permissionObject',
      'responseStatus', 'startInAddMode', 'availablePermissions', 'route']),
    permissions () {
      return filterObjectOnStringProperties(this.permissionObject.permissions, ['role', 'user', 'permission'], this.search, ['role', 'user'])
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
      const assignedUsers = this.permissionObject.permissions.filter(f => f.user).map(item => item.user)
      return this.userOptions.filter(f => !assignedUsers.includes(f.value) && !f.superuser)
    },
    selectableRoles () {
      let assignedRoles = ['SU'] // assigning SU is not necessary
      assignedRoles = assignedRoles.concat(this.permissionObject.permissions.filter(f => f.role).map(item => item.role))
      return this.roleOptions.filter(f => !assignedRoles.includes(f.value))
    }
  },
  watch: {
    'route.params.objectId' () {
      this.init()
    },
    startInAddMode (startWithAdd) {
      if (startWithAdd) {
        this.addMode = true
      }
    }
  },
  beforeMount () {
    this.init()
  },
  methods: {
    ...mapActions(['getAllRoles', 'getPermissionsForObject',
      'addPermission', 'removePermission', 'updatePermissions',
      'getPermissionsByEntityId']),
    init () {
      this.getPermissionsForObject()
      this.getAllRoles()
      this.getPermissionsByEntityId(this.entityId)
    },
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
