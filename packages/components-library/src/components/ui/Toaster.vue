<template>
  <div class="c-toaster" :class="{[format]: true}">
    <div v-for="(toast, index) in toasts" :key="index"
      class="alert alert-success alert-dismissible fade show"
      :class="{[`alert-${toast.type}`]: true}"
    >
    <div v-html="toast.message"></div>

    <button type="button" class="close" @click="clearToast(toast)">
      <span aria-hidden="true">&times;</span>
    </button>
    </div>
  </div>
</template>
<script>
const defaultTimeout = 3000

export default {
  data: function () {
    return {
      toasts: [...this.value],
      oldToastsAmount: this.value.length
    }
  },
  name: 'Toaster',
  methods: {
    clearToast (toast) {
      this.toasts.splice(this.toasts.indexOf(toast), 1)
      console.log(this.toasts)
      this.$emit('input', [...this.toasts])
    }
  },
  props: {
    format: {
      type: String,
      default: 'bottom-right'
    },
    value: {
      type: Array,
      required: true
    }
  },
  watch: {
    value: {
      handler: function (newValue, oldValue) {
        this.$set(this, 'toasts', [...newValue])

        // Only process timeout for new toasts. Old value is empty
        // when called on creation, due to immediately watch property.
        if (oldValue && newValue.length < oldValue.length) return

        for (const toast of newValue) {
          // Timeout already scheduled.
          if (toast.timeout === -1) continue
          // New toast has an explicitly disabled timeout.
          if (toast.timeout === 0) continue

          // if (!toast.timeout) {
          //   toast.timeout = defaultTimeout
          // }

          // console.log('setTimeout', toast.timeout)
          // setTimeout(() => {
          //   this.clearToast(toast)
          // }, toast.timeout)

          // toast.timeout = -1
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss">
$spacer: 1rem;

.c-toaster {
    &.top-left,
    &.top-right {
      position: fixed;
      top: $spacer;
    }

    &.bottom-left,
    &.bottom-right {
      position: fixed;
      bottom: $spacer;
    }

    &.bottom-left,
    &.top-left {
      left: $spacer;
    }

    &.bottom-right,
    &.top-right {
      right: $spacer;
    }

    &:not(.inline) {
        width: 20rem;
        z-index: 1060;  // Bootstrap popover z-index

        @media (max-width: 576px) {
          width: 100%;
          padding: 0 $spacer;

          &.bottom-left,
          &.top-left {
            left: 0;
          }

          &.bottom-right,
          &.top-right {
            right: 0;
          }

        }
    }
}
</style>

<docs>
  This is a notification component.

  ## Example

  ```jsx
  const model = [
    // {message: 'i am a danger toast with a timeout', type: 'danger', timeout: 1500},
    // {message: 'i am a warning toast with a default timeout', type: 'warning'},
    // {message: 'i am a success toast without timeout', type: 'success', timeout: 0}
  ]

  const addToast = function(message, type, timeout) {
    model.push({message, type, timeout})
  }

  <Toaster v-model="model"></Toaster>
  <button class="btn btn-primary" v-on:click="addToast('new message', 'success', 0)">Add toast</button>
  <button class="btn btn-primary" v-on:click="addToast('timeout message', 'danger', 1500)">Add toast (timeout)</button>
  <div>{{model}}</div>
  ```
</docs>
