<template>
  <router-link
    v-add-class-hover="'bg-primary text-white'"
    class="list-group-item d-flex justify-content-between"
    :to="{ name, params }">
    <slot />
  </router-link>
</template>

<script>
export default {
  props: {
    params: {
      type: Object,
      required: false,
      default: () => {}
    },
    name: {
      type: String,
      required: true
    }
  }
}
</script>
