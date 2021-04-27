<template>
  <div>
    <h1>Register Patient</h1>
    <validation-observer v-slot="formValidationContext">
      <b-form @submit.prevent="submit">
        <validation-provider
          v-if="contexts.length > 1"
          name="Context"
          rules="required"
          v-slot="validationContext">
          <b-form-group
            label="Context:"
            label-for="context"
          >
            <b-form-select
              v-model="contextIndex"
              :options="contextOptions"
              :state = getValidationState(validationContext)
              :disabled = "registration"
            ></b-form-select>
            <b-form-invalid-feedback>
              {{ validationContext.errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>
        <b-form-group
          v-else
          label="Context:"
          label-for="context"
        >
          <b-form-input
            plaintext
            :value="context.name"
          ></b-form-input>
        </b-form-group>
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
              :disabled = "registration"
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
              :disabled = "registration"
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
              :disabled = "registration"
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
              :disabled = "registration"
            ></b-form-input>
            <b-form-invalid-feedback>
              {{ validationContext.errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>
        <b-button
          type="submit"
          :disabled="registration || !getValidationState(formValidationContext)">
          Register
        </b-button>
      </b-form>
    </validation-observer>
    <b-card
      v-if="registration"
      class="mt-3"
      header-bg-variant="info"
      header-text-variant="white"
      :header="registration.psn">
      <b-card-text>
        Successfully registered pseudonym for context {{ registration.context }}.
      </b-card-text>
    </b-card>
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
import X25519PublicKey from 'sodium-plus/lib/keytypes/x25519pk'
import CryptographyKey from 'sodium-plus/lib/cryptography-key'
import SodiumUtil from 'sodium-plus/lib/util'
import backend from 'sodium-plus/lib/backend/libsodium-wrappers'
import SodiumPlus from 'sodium-plus/lib/sodiumplus'

function isEmpty(value) {
  if (value === null || value === undefined || value === '') {
    return true
  }
  if (Array.isArray(value) && value.length === 0) {
    return true
  }
  return false
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
    /**
     * The contexts the patient can be registered in.
     */
    contexts: {
      type: Array[{name: String, ttp: String, key: String}],
      validator: (contexts) => contexts.length > 0 
    }
  },
  data() {
    return {
      contextIndex: this.contexts.length == 1 ? 0 : null,
      sodium: null,
      pid: null,
      first: null,
      last: null,
      dob: null,
      registration: null
    }
  },
  computed: {
    contextOptions() {
      return this.contexts.map((context, index) => ({value: index, text: context.name}))
    },
    context() {
      return this.contextIndex == null ? null : this.contexts[this.contextIndex]
    },
  },
  methods: {
    async submit() {
      if (!this.sodium) {
        SodiumUtil.populateConstants(backend)
        this.sodium = new SodiumPlus(await backend.init())
      }
      const key = CryptographyKey.from(this.context.key, 'hex')
      const hashed = await this.sodium.crypto_shorthash(this.pid, key)
      const psn = hashed.toString('hex').substring(0,8).toUpperCase()
      const phonetic = {
        first: this.first && eudex(this.first),
        last: this.last && eudex(this.last),
        dob: this.dob && crc32(this.dob)
      }
      const registration = { psn, phonetic, context: this.context.name }
      if (this.context.ttp) {
        const publicKey = X25519PublicKey.from(this.context.ttp, 'hex')
        registration.crypted = {
          dob: await this.encrypt(this.dob, publicKey),
          first: await this.encrypt(this.first, publicKey),
          last: await this.encrypt(this.last, publicKey)
        }
      }
      this.registration = registration
      /**
       * Triggers when the patient has been registered
       *
       * @property {string} psn the pseudonym
       * @property {string} context the name of the context
       */
      this.$emit('input', registration.psn, registration.context)
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

<docs>
Registration of patient details and generated

### Usage
```vue
const contexts = [
  {
    name: "Ithaca", 
    key: "ccbb79d11efcbcab7a95e60914ae2749",
    ttp: "f1a70d54c453c22693767eb6e8e91229e00e833e5eff14dc32a699f258a8f62e"
  }, {
    name: "Skin",
    key: "8f28841f22a638135688d93ec6b6170d",
    ttp: "7b26cc4f22ac92c3b4a66efa39c401c24ba3554ace393e885db67fe33719d5b5"
  }
]
let registration = {}

<PID
  :contexts="contexts"
  @input="(psn, context) => { registration = {psn, context} }"></PID>

<pre>{{ registration }}</pre>
```
</docs>