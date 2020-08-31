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
    head () {
      return this.breadcrumbs[this.breadcrumbs.length - 1]
    },
    tail () {
      return this.breadcrumbs.slice(0, this.breadcrumbs.length - 1)
    }
  }
}
</script>
