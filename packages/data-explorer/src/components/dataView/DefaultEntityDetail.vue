<template>
  <ul class="list-group list-group-flush">
    <li v-for="(value, propertyName, index) in record" :key="index" class="list-group-item">
      <h5>{{ propertyName }}</h5>
      <template v-if="typeof value !== 'object'">
        <p>{{ value }}</p>
      </template>
      <template v-else-if="Array.isArray(value)">
        {{ value.map(v => v.label).join(', ') }}
      </template>
      <template v-else>
        <ul class="list-group list-group-flush">
          <li v-for="(refValue, refPropertyName, refIndex) in value" :key="refIndex" class="list-group-item">
            <h5>{{ refPropertyName }}</h5>
            <p>{{ refValue }}</p>
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
