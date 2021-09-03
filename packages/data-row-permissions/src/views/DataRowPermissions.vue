<template>
  <div class="card m-4">
    <div class="d-flex justify-content-between">
      <h3 class="mb-4">
        RLS objects of {{ entityId }}
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
    <div
      class="card-body">
      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Permission</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="permission of permissions"
            :key="permission.id">
            <td>{{ permission.user || permission.role }}</td>
            <td>{{ permission.role ? 'Role' : 'User' }}</td>
            <td>{{ permission.permission }}</td>
          </tr>
        </tbody>
      </table>
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
      permissionObjects: {}
    }
  },
  computed: {
    unauthorized () {
      return this.status === 401
    },
    permissions () {
      return this.permissionObjects.permissions
    }
  },
  beforeMount () {
    this.status = 0
    api.get(`/api/permissions/${this.entityId}/${this.objectId}`).then((response) => {
      this.permissionObjects = response.data
      this.status = response.status
    }).catch(e => {
      this.status = e.status
    })
  }
}
</script>
