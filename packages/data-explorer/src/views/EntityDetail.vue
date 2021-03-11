<template>

  <div v-if="!loading" id="entity-detail-container" class="mg-mainview">
    <div class="container-fluid">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item" aria-current="page">
            <router-link id="headItemTooltipID" :to="{ name: 'de-view', params: { entity: entityType} }">
            <b-tooltip v-if="metaData.description" placement="bottom" target="headItemTooltipID" triggers="hover">
              {{ metaData.description }}
            </b-tooltip>
            {{ metaData.label }}
            </router-link>
          </li>
          <li class="breadcrumb-item" aria-current="page">
            <span>
               {{record[metaData.idAttribute.name]}}
            </span>
          </li>
        </ol>
      </nav>
    </div>

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
  .mg-mainview {
    padding: 16px;
  }
  .list-group .list-group-item {
    color: #495057;
  }
</style>
