<template>
  <form class="form-signin" id="login-form" method="POST" action="/login">
    <button v-if="showCloseButton" type="button" class="close pull-right"
            onclick="location.href='/'"><span
      aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
    <h1 class="h4 mb-3" id="form-signin-header">Sign in</h1>

    <div id="alert-container">
      <b-alert v-if="alert" show :variant="alert.variant" dismissible @dismissed="setAlert(null)">
        {{alert.message}}
      </b-alert>
    </div>

    <template v-if="oidcClients && oidcClients.length">
      <b-link v-for="client in oidcClients"
              :href="client.url"
              class="btn btn-primary btn-block"
              :key="client.name"
              role="button">With {{client.name}}</b-link>
      <div class="text-center">OR</div>
    </template>

    <b-form-input id="username-field"
                  name="username"
                  placeholder="Username"
                  required></b-form-input>

    <b-form-input id="password-field"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required></b-form-input>

    <p class="pull-right">
      <b-link to="reset">Forgot password?</b-link>
    </p>

    <button id="signin-button" type="submit" class="btn btn-success btn-block">Sign in</button>
    <div class="text-center" v-if="showRegister">Don't have an account? <b-link to="register">Sign up</b-link></div>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'

export default Vue.extend({
  name: 'Signin',
  computed: {
    ...mapState(['alert', 'showCloseButton', 'showRegister', 'oidcClients'])
  },
  methods: {
    ...mapMutations(['setAlert'])
  }
})
</script>

<style scoped>
  .form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
  }
  .form-signin .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
  }
  .form-signin .form-control:focus {
    z-index: 2;
  }

</style>
