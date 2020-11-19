<template>
  <transition name="slide">
    <div id="alert-message" :class="'alert alert-' + toast.type" role="alert">
      <button @click="$emit('toastCloseBtnClicked')" type="button" class="close">
        <span aria-hidden="true">&times;</span>
      </button>
      <span id="message-span" v-if="toast.message">{{ toast.message }}</span>
      <a :href="toast.link.href" v-if="toast.link">{{toast.link.title}}</a>
    </div>
  </transition>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'ToastComponent',
  props: {
    toast: {
      type: Object,
      required: true
    }
  }
})
</script>

<style>
  .slide-enter-active, .slide-leave-active {
    transition: transform 500ms ease-in-out, opacity 500ms ease-in-out;
    opacity: 1;
  }
  .slide-enter, .slide-leave-to {
    transform: translateY(-100%);
    opacity: 0;
  }
  .slide-enter-to, .slide-leave {
    transform: translateY(0);
    opacity: 1;
  }
</style>
