<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li v-for="crumb in tail" :key="crumb.label" class="breadcrumb-item dropdown"
        @mouseover="showDropdown($event, crumb)"
        @mouseleave="hideDropdown($event, crumb)"
      >
        <a v-if="crumb.link" :href="crumb.link">{{crumb.label}}</a>
        <template v-else>{{crumb.label}}</template>
        <dropdown-list
          v-show="crumb.showDropdown"
          :listId="crumb.label"
          :isShown="crumb.showDropdown"
          v-on="$listeners"
        ></dropdown-list>
      </li>
      <li v-if="head" class="breadcrumb-item active" aria-current="page">{{head.label}}</li>
    </ol>
  </nav>
</template>

<script>
import Vue from 'vue'
import DropdownList from '@/components/DropdownList'

export default {
  name: 'BreadcrumbBar',
  components: { DropdownList },
  props: {
    breadcrumbs: {
      type: Array,
      required: true
    }
  },
  computed: {
    head: (vm) => vm.breadcrumbs[0],
    tail: (vm) => vm.breadcrumbs.slice(1, vm.breadcrumbs.length).reverse()
  },
  methods: {
    showDropdown: (e, crumb) => Vue.set(crumb, 'showDropdown', true),
    hideDropdown: (e, crumb) => Vue.set(crumb, 'showDropdown', false)
  }
}
</script>
