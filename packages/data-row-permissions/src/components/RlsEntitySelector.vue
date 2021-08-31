<template>
  <table class="table">
    <tbody>
      <tr
        v-for="row in rls_data"
        :key="row.id">
        <!-- should become router link -->
        <td>{{ row.id }}</td>
        <td>{{ row.entityType }}</td>
        <td> {{ row.label }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import api from '@molgenis/molgenis-api-client'

export default {
  name: 'RlsEntitySelector',
  data () {
    return {
      // id is typeId
      // typeId's you can get by querying api/data/entityType (their id's)
      rls_data: []
    }
  },
  beforeMount () {
    api.get('/api/permissions/types').then((response) => {
      this.rls_data = response.data
    })
  }
}
</script>
