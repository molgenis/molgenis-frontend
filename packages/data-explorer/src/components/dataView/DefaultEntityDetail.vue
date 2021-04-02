<template>
  <div>
    <div class="d-flex m-2">
      <h2>{{ record.label || record.name }}</h2>
      <div v-if="isShop" class="ml-auto">
        <shopping-cart-button :id="record.id" />
      </div>
    </div>
    <ul class="list-group list-group-flush">
      <li v-for="(value, propertyName, index) in record" :key="index" class="list-group-item border-0">
        <h5>{{ propertyName }}</h5>
        <template v-if="!isObject(value)">
          <p>{{ value }}</p>
        </template>
        <template v-else-if="Array.isArray(value)">
          {{ value.map(v => v.label).join(', ') }}
        </template>
        <template v-else>
          <ul class="list-group list-group-flush">
            <li v-for="(refValue, refPropertyName, refIndex) in value" :key="refIndex" class="list-group-item border-0">
              <h5>{{ refPropertyName }}</h5>
              <p>{{ refValue }}</p>
            </li>
          </ul>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ShoppingCartButton from '../customViewComponents/ShoppingCartButton'

export default {
  name: 'DefaultEntityDetail',
  components: {
    ShoppingCartButton
  },
  props: {
    record: {
      type: Object,
      required: true
    },
    metaData: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState('explorer', {
      isShop: state => state.tableSettings.isShop
    }),
  },
  methods: {
    // doing this inline in the template breaks the vue code.
    isObject(value) {
      return typeof value === 'object'
    }
  }
}
</script>
