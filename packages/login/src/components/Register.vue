<template>
  <b-container>
    <b-row>
      <b-col>
        <b-form>
          <h1 class="h1 pt-1">Register</h1>
          <b-form-group label="Username *">
            <b-input id="username" name="username" v-model="$v.username.$model"></b-input>
            <b-form-invalid-feedback v-if="!$v.username.required">Field is required</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group label="Password *">
            <b-input
              type="password"
              id="password"
              name="password"
              v-model="$v.password.$model"
              :class="{'is-invalid': $v.password.$dirty && $v.password.$error}"
            ></b-input>
            <b-form-invalid-feedback v-if="!$v.passwordConfirm.required">Field is required</b-form-invalid-feedback>
            <b-form-invalid-feedback
              v-if="!$v.passwordConfirm.minLength"
            >Password should be at least five characters long</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group label="Repeat password *">
            <b-input
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              v-model="$v.passwordConfirm.$model"
              :class="{'is-invalid': $v.passwordConfirm.$dirty && $v.passwordConfirm.$error}"
            ></b-input>
            <b-form-invalid-feedback v-if="!$v.passwordConfirm.required">Field is required</b-form-invalid-feedback>
            <b-form-invalid-feedback v-if="!$v.passwordConfirm.sameAsPassword">Passwords should match</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group label="Email address *">
            <b-input
              type="email"
              id="email"
              name="email"
              v-model="$v.email.$model"
              :class="{'is-invalid': $v.email.$dirty && $v.email.$error}"
            ></b-input>
            <b-form-invalid-feedback v-if="!$v.email.required">Field is required</b-form-invalid-feedback>
            <b-form-invalid-feedback v-if="!$v.email.email">Field should be an email address</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group label="First name">
            <b-input id="firstname" name="firstname" v-model="firstname"></b-input>
          </b-form-group>
          <b-form-group label="Last name">
            <b-input id="lastname" name="lastname" v-model="lastname"></b-input>
          </b-form-group>
          <div><b-button variant="primary" class="float-right" @click="register" :disabled="$v.$anyError">Register</b-button></div>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Vue from "vue";
import Vuelidate from "vuelidate";
import { required, minLength, sameAs, email } from "vuelidate/lib/validators";
import "@molgenis/molgenis-ui-form/dist/static/css/molgenis-ui-form.css";

Vue.use(Vuelidate);

export default Vue.extend({
  name: "Register",
  props: {},
  methods: {
    register() {}
  },
  validations: {
    username: {
      required
    },
    password: {
      required,
      minLength: minLength(5)
    },
    passwordConfirm: {
      required,
      sameAsPassword: sameAs("password")
    },
    email: {
      required,
      email
    }
  },
  data() {
    return {
      username: "",
      password: "",
      passwordConfirm: "",
      email: "",
      firstname: "",
      lastname: ""
    };
  }
});
</script>

<style scoped>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
</style>
