<template>
  <transition name="slide">
    <div id="alert-message fade" v-if="message" :class="'alert alert-' + type" role="alert">
      <button @click="$emit('toastCloseBtnClicked')" type="button" class="close">
        <span aria-hidden="true">&times;</span>
      </button>
      <span id="message-span">{{ message }}</span>
    </div>
  </transition>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'ToastComponent',
  props: {
    type: {
      type: String,
      required: true
    },
    message: {
      type: String,
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
