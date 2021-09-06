<template>
  <div class="w-75 mx-auto my-5">
    <div class="d-flex justify-content-between">
      <h3 class="mb-4">
        Permission of {{ objectId }}
      </h3>
      <router-link
        :to="{ name: 'SelectEntitityObject', params: { entityId }}"
        class="mb-4 px-4 btn btn-secondary align-self-center">
        Back
      </router-link>
    </div>
    <div
      v-if="unauthorized">
      <span>You might see more results if you <a href="/login">log in.</a></span>
    </div>
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
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th class="text-right">
              Permission
            </th>
          </tr>
        </thead>
        <tbody>
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
              class="align-middle text-right w-25">
              {{ permission.permission }}
            </td>
            <td
              v-else
              class="align-middle text-right p-0 w-25">
              <b-form-select
                :value="permissions[index].permission"
                class="w-auto"
                :options="available_permissions"
                @change="(value) => updatePermission(index, value)" />
            </td>
          </tr>
        </tbody>
      </table>
      <div
        v-if="editMode"
        class="mt-3">
        <button
          class="btn btn-success px-4"
          :disabled="!hasChanges">
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@molgenis/molgenis-api-client'

export default {
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
      editMode: false,
      addMode: false,
      permissionObjects: {},
      available_permissions: [],
      changedPermissionObjects: []
    }
  },
  computed: {
    unauthorized () {
      return this.status === 401
    },
    permissions () {
      return this.permissionObjects.permissions
    },
    hasChanges () {
      return this.changedPermissionObjects.length
    }
  },
  beforeMount () {
    this.getPermissionsForObject()

    api.get(`/api/permissions/types/permissions/${this.entityId}`).then((response) => {
      this.available_permissions = response.data
    })
  },
  methods: {
    save () {
      // send to server
      // patch updated
      // refetch from server
      this.permissionObjects = {}
      this.getPermissionsForObject()
    },
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
    updatePermission (index, value) {
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
      this.status = 0
      api.get(`/api/permissions/${this.entityId}/${this.objectId}`).then((response) => {
        this.permissionObjects = response.data
        this.status = response.status
      }).catch(e => {
        this.status = e.status
      })
    }
  }
}
</script>
