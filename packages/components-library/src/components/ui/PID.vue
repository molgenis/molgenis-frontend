<template>
  <div>
    <h1>Patient ID</h1>
    <validation-observer v-slot="formValidationContext">
      <b-form @submit.prevent="submit">
        <validation-provider
          name="Patient ID"
          rules="required"
          v-slot="validationContext">
          <b-form-group
            label="Patient ID:"
            description="The PID that should be pseudonymized"
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
        <b-button
          type="submit"
          :enabled="getValidationState(formValidationContext)">
          Submit
        </b-button>
      </b-form>
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
import {
  SodiumPlus,
  SodiumUtil,
  getBackendObject,
  CryptographyKey,
  X25519PublicKey
} from 'sodium-plus'

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
    context: String,
    ttp: String
  },
  data() {
    return {
      sodium: null,
      pid: null,
      first: null,
      last: null,
      dob: null
    }
  },
  methods: {
    async submit() {
      if (!this.sodium) {
        const backend = getBackendObject('LibsodiumWrappers')
        SodiumUtil.populateConstants(backend)
        this.sodium = new SodiumPlus(await backend.init())
      }
      const key = CryptographyKey.from(this.context, 'hex')
      const hashed = await this.sodium.crypto_shorthash(this.pid, key)
      const psn = hashed.toString('hex').substring(0,8).toUpperCase()
      const phonetic = {
        first: this.first && eudex(this.first),
        last: this.last && eudex(this.last),
        dob: this.dob && crc32(this.dob)
      }
      const registration = { psn, phonetic }
      if (this.ttp) {
        const publicKey = X25519PublicKey.from(this.ttp, 'hex')
        registration.crypted = {
          dob: await this.encrypt(this.dob, publicKey),
          first: await this.encrypt(this.first, publicKey),
          last: await this.encrypt(this.last, publicKey)
        }
      }
      console.log(registration)
    },
    async encrypt (value, publicKey) {
      return (await this.sodium.crypto_box_seal(value, publicKey)).toString('hex')
    },
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
<PID
  context="204f32b28314c223a752e21435c8a0e4"
  ttp="204f32b28314c223a752e21435c8a0e4204f32b28314c223a752e21435c8a0e4"></PID>
```
</docs>