<template>
  <div>
    <div v-for="(value, propertyName, index) in object" :key="index">
      <template v-if="(typeof value !== 'object')">
        {{ propertyName }}: {{ value }}
      </template>
      <template v-else-if="Array.isArray(value)">
        {{ propertyName }}: {{ value.map(v => v.label).join(', ') }}
      </template>
      <template v-else>
        {{ propertyName }}:
        <div v-for="(refValue, refPropertyName, refIndex) in value" :key="refIndex" class="pl-3">
          {{ refPropertyName }}: {{ refValue }}
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PropRender',
  props: {
    object: {
      type: Object,
      required: true
    }
  }
}
</script>
