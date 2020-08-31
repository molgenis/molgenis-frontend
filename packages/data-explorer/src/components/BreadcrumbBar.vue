<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li v-for="crumb in tail" :key="crumb.id" class="breadcrumb-item">
        <a v-if=crumb.link :href="crumb.link">{{crumb.label}}</a>
        <template v-else>{{crumb.label}}</template>
      </li>
      <li v-if="head" class="breadcrumb-item active" aria-current="page">{{head.label}}</li>
    </ol>
  </nav>
</template>

<script>
export default {
  name: 'BreadcrumbBar',
  props: {
    breadcrumbs: {
      type: Array,
      required: true
    }
  },
  computed: {
    head: (vm) => vm.breadcrumbs[0],
    tail: (vm) => vm.breadcrumbs.slice(1, vm.breadcrumbs.length).reverse()
  }
}
</script>
