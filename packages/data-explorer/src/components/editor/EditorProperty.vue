<template>
<ul class="list-group">
  <li class="list-group-item" v-for="(propertyKey, index) in Object.keys(propertyData)" :key="index">

    <template>
      <span class="pl-2">
        <input type="checkbox" class="form-check-input" @change="onPropSelectionChange($event, propertyKey)">
      </span>
      {{propertyKey}}:<span v-if="typeof propertyData[propertyKey] !== 'object'"> {{propertyData[propertyKey]}}</span>
    </template>

    <template v-if="typeof propertyData[propertyKey] === 'object' && !Array.isArray(propertyData[propertyKey])">
      <editor-property :propertyData="propertyData[propertyKey]" :path="propertyPath(propertyKey)" v-on="$listeners"></editor-property>
    </template>

    <template v-if="typeof propertyData[propertyKey] === 'object' && Array.isArray(propertyData[propertyKey] )">
      <em>list item 1 of {{propertyData[propertyKey].length}}</em>
       <editor-property :propertyData="(propertyData[propertyKey][0])" :path="propertyPath(propertyKey)" v-on="$listeners" ></editor-property>
    </template>

  </li>
</ul>
</template>

<script>
export default {
  name: 'EditorProperty',
  props: {
    propertyData: {
      type: Object,
      required: true
    },
    path: {
      type: String,
      required: false,
      default: () => ''
    }
  },
  methods: {
    propertyPath (propertyKey) {
      return this.path ? `${this.path}.${propertyKey}` : `${propertyKey}`
    },
    onPropSelectionChange (event, propertyKey) {
      this.$emit('change', {
        isSelected: event.target.checked,
        property: this.propertyPath(propertyKey)
      })
    }
  }
}
</script>
