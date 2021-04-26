<template>
  <div>
    <h1>Patient ID</h1>
    <validation-observer v-slot="formValidationContext">
      <b-form>
        <validation-provider
          name="Patient ID"
          rules="required"
          v-slot="validationContext">
          <b-form-group
            label="Patient ID:"
            label-for="pid"
          >
            <b-form-input
              id="pid"
              v-model="pid"
              :state = getValidationState(validationContext)
            ></b-form-input>
            <b-form-invalid-feedback>
              {{ validationContext.errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>
        <validation-provider
          name="First name"
          rules="required"
          v-slot="validationContext">
          <b-form-group
            label="First name:"
            label-for="first"
          >
            <b-form-input
              id="first"
              v-model="first"
              :state = getValidationState(validationContext)
            ></b-form-input>
            <b-form-invalid-feedback>
              {{ validationContext.errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>
        <validation-provider
          name="Last name"
          rules="required"
          v-slot="validationContext">
          <b-form-group
            label="Last name:"
            label-for="last"
          >
            <b-form-input
              id="last"
              v-model="last"
              :state = getValidationState(validationContext)
            ></b-form-input>
            <b-form-invalid-feedback>
              {{ validationContext.errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>
        <validation-provider
          name="Date of birth"
          rules="required|past"
          v-slot="validationContext">
          <b-form-group
            label="Date of birth:"
            label-for="dob"
          >
            <b-form-input
              v-model="dob"
              placeholder="yyyy-mm-dd"
              :state = getValidationState(validationContext)
            ></b-form-input>
            <b-form-invalid-feedback>
              {{ validationContext.errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>
      </b-form>   
      <pre v-if="getValidationState(formValidationContext)">
        phonetic: {{ JSON.stringify(phonetic) }}
        PSN: {{ psn }}
      </pre>
    </validation-observer>
  </div>
</template>

<script>
import {
  ValidationObserver,
  ValidationProvider,
  extend
} from "vee-validate"
import {LocalDate} from 'js-joda'
import {required} from 'vee-validate/dist/rules'
import eudex from 'talisman/phonetics/eudex'
import crc32 from 'talisman/hash/crc32'
import hmacSHA512 from 'crypto-js/hmac-sha512'
import Hex from 'crypto-js/enc-hex'

function isEmpty(value) {
  if (value === null || value === undefined || value === '') {
    return true;
  }
  if (Array.isArray(value) && value.length === 0) {
    return true;
  }
  return false;
}

extend('required', {
  ...required,
  message: '{_field_} is required'
})

extend('past', (value) => {
  if (isEmpty(value)) {
    return true
  }
  try {
    const dateValue = LocalDate.parse(value)
    if (dateValue.isAfter(LocalDate.now())) {
      return '{_field_} must be in the past'
    }
    return true
  } catch (ignore) {
    return '{_field_} must be a valid date of type yyyy-mm-dd'
  }
})

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  props: {
    context: String
  },
  data() {
    return {
      pid: null,
      first: null,
      last: null,
      dob: null
    }
  },
  computed: {
    psn () {
      return this.pid && hmacSHA512(this.context, this.pid).toString(Hex).substring(0, 8).toUpperCase()
    },
    phonetic () {
      return {
        first: this.first && eudex(this.first),
        last: this.last && eudex(this.last),
        dob: this.dob && crc32(this.dob)
      }
    }
  },
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    },
  }
}
</script>

<style>

</style>

<docs>
Generation of Patient ID based on patient details

### Usage
```vue
<PID context="secret"></PID>
```
</docs>