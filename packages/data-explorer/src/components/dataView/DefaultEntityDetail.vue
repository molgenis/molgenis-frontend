<template>
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
</template>

<script>
export default {
  name: 'DefaultEntityDetail',
  props: {
    record: {
      type: Object,
      required: true
    },
    metaData: {
      type: Object,
      required: true
    }
  }
}
</script>
