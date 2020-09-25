<template>
  <b-input-group>
    <b-form-input
      v-model="model"
      :name="name"
      :placeholder="placeholder"
      trim
    />
    <b-input-group-append>
      <b-button
        variant="outline-secondary"
        @click.prevent="model=''"
      >
        <font-awesome-icon icon="times" />
      </b-button>
    </b-input-group-append>
  </b-input-group>
</template>

<script>
import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faTimes)
export default Vue.extend({
  name: 'StringFilter',
  components: { FontAwesomeIcon },
  props: {
    /**
     * The HTML input element name.
     */
    name: {
      type: String,
      required: true
    },
    /**
     * The HTML input element placeholder.
     */
    placeholder: {
      type: String,
      required: false,
      default: () => ''
    },
    /**
     * The StringFilter model value.
     * @model
     */
    value: {
      type: String,
      default: () => ''
    }
  },
  computed: {
    model: {
      get () {
        return this.value || ''
      },
      set (value) {
        this.$emit('input', value === '' ? undefined : value)
      }
    }
  }
})
</script>
<docs>
Browser input filter with additional options.
### Usage
```jsx
const model = 'bla'
<StringFilter
  v-model="model"
  placeholder="Input placeholder"
  name="my-string-filter">
</StringFilter>
<div>{{model}}</div>
```
