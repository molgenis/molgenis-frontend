<template>

  <div v-if="!loading" id="entity-detail-container" class="container">

    <h1>{{metaData.label}}: {{record[metaData.idAttribute.name]}}</h1>
    <p v-if="metaData.description">{{metaData.description}}</p>

    <!-- <div id="entity-actions">
      <router-link v-if="isEditable && dataId" class="btn btn-link" role="button"
        :to="{ name: 'de-edit', params: { entity: dataTable, dataRowId: dataId}, query: {}}">
        <font-awesome-icon icon="edit"></font-awesome-icon>
      </router-link>
      <button v-if="isEditable" class="btn btn-link" role="button" @click="$eventBus.$emit('delete-item', dataId)">
          <font-awesome-icon icon="trash"></font-awesome-icon>
      </button>
        <slot name="shopping-button"></slot>
    </div>
 -->

    <ul class="list-group list-group-flush">
      <li class="list-group-item" v-for="(value, propertyName, index) in record" :key="index">
        <h5>{{propertyName}}</h5>
        <template v-if="typeof value !== 'object'">
           <p>{{value}}</p>
        </template>
        <template v-else-if="Array.isArray(value)">
          {{value.map(v => v.label).join(', ')}}
        </template>
        <template v-else>
          <ul class="list-group list-group-flush">
            <li class="list-group-item" v-for="(value, propertyName, refIndex) in value" :key="refIndex">
              <h5>{{propertyName}}</h5>
              <p>{{value}}</p>
            </li>
          </ul>
        </template>
      </li>
    </ul>

    <!-- <div>
      {{JSON.stringify(metaData, null, 2)}}
    </div>

    <div>
      {{JSON.stringify(record, null, 2)}}
    </div> -->

  </div>

</template>

<script>
import { fetchMetaDataById } from '@/repository/metaDataRepository'
import { getRowDataWithReferenceLabels } from '@/repository/dataRepository'
export default {
  name: 'EntityDetail',
  props: ['entityType', 'entity'],
  data () {
    return {
      loading: true,
      metaData: null,
      record: null
    }
  },
  async mounted () {
    this.metaData = await fetchMetaDataById(this.entityType)
    this.record = await getRowDataWithReferenceLabels(this.entityType, this.entity, this.metaData)
    this.loading = false
  }
}
</script>

<style scoped>
  .list-group .list-group-item {
    color: #495057;
  }
</style>
