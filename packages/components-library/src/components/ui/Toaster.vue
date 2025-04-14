<template>
  <div class="c-toaster" :class="{[position]: true}">
    <div
      v-for="(toast, index) in toasts" :key="index"
      class="mg-toast alert alert-dismissible fade show shadow-sm"
      :class="{[`alert-${toast.type}`]: true}"
    >
      <div class="mg-toast-message" v-html="toast.message" />

      <button type="button" class="close" @click="clearToast(toast)">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>
<script>
const defaultTimeout = 3000

export default {
  name: 'Toaster',
  props: {
    /**
     * List of toasts to show (see types/Toast.ts)
     * @model
     */
    value: {
      type: Array,
      required: true
    },
    /**
     * Position of toast in window
     * Fixed positioning: 'top-left', 'bottom-left', 'top-right', 'bottom-right'
     * Or Inline using: 'inline'
     */
    position: {
      type: String,
      default: () => 'bottom-right'
    }
  },
  data: function () {
    return {
      toasts: [...this.value]
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

          if (!toast.timeout) {
            toast.timeout = defaultTimeout
          }

          setTimeout(() => {
            this.clearToast(toast)
          }, toast.timeout)

          toast.timeout = -1
        }
      },
      immediate: true
    }
  },
  methods: {
    clearToast (toast) {
      this.toasts.splice(this.toasts.indexOf(toast), 1)
      /**
      * v-model return value
      * @event input
      * @property {Object[]} Toasts array with toast removed
      */
      this.$emit('input', [...this.toasts])
    }
  }
}
</script>

<style lang="scss">
$spacer: 0.5rem;

.c-toaster {
  &.top-left,
  &.top-right {
    position: fixed;
    top: $spacer;
  }

  &.bottom-left,
  &.bottom-right {
    bottom: $spacer;
    position: fixed;
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
    width: 350px; // To match bootstrap's toast size ( in case the shopping cart is under the toasts )
    z-index: 1060;  // Bootstrap popover z-index

    @media (max-width: 576px) {
      padding: 0 $spacer;
      width: 100%;

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
  let model = []
  const addToast = (message, type, timeout) => model.push({message, type, timeout})
  const mockVuex = (e) => model = e

  <Toaster v-model="model" v-on:input="mockVuex"></Toaster>
  <button class="btn btn-primary" v-on:click="addToast('new message', 'success', 0)">Add toast</button>
  <button class="btn btn-primary" v-on:click="addToast('timeout message', 'danger', 1500)">Add toast (timeout)</button>
  <div>{{model}}</div>
  ```
</docs>
