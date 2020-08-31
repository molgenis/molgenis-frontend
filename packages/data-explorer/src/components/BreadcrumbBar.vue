<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li v-for="crumb in tail" :key="crumb.label" class="breadcrumb-item dropdown"
        @mouseover="showDropDown($event, crumb)"
        @mouseleave="hideDropDown($event, crumb)"
      >
        <a v-if="crumb.link" :href="crumb.link">{{crumb.label}}</a>
        <template v-else>{{crumb.label}}</template>
        <drop-down-list
          v-show="crumb.showDropdown"
          :listId="crumb.label"
          :isShown="crumb.showDropdown"
          v-on="$listeners"
        ></drop-down-list>
      </li>
      <li v-if="head" class="breadcrumb-item active" aria-current="page">{{head.label}}</li>
    </ol>
  </nav>
</template>

<script>
import Vue from 'vue'
import DropDownList from '@/components/DropDownList'

export default {
  name: 'BreadcrumbBar',
  components: { DropDownList },
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
    showDropDown (e, crumb) {
      Vue.set(crumb, 'showDropdown', true)
    },
    hideDropDown (e, crumb) {
      Vue.set(crumb, 'showDropdown', false)
    }

  }
}
</script>
