<template>
  <router-view />
</template>

<script lang="ts">
import Vue from 'vue'
import Signin from '@/components/Signin.vue'
import Register from '@/components/Register.vue'

export default {
  name: 'app'
}
</script>

<style>
html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}
</style>
