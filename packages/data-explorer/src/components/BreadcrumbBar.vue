<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li
        v-for="crumb in tail" :key="crumb.label"
        class="breadcrumb-item dropdown"
        @mouseover="showDropdown($event, crumb)"
        @mouseleave="hideDropdown($event, crumb)"
      >
        <a v-if="crumb.link" :href="crumb.link">{{ crumb.label }}</a>
        <template v-else>
          {{ crumb.label }}
        </template>
        <dropdown-list
          v-show="crumb.showDropdown"
          :list-id="crumb.id"
          :is-shown="crumb.showDropdown"
          v-on="$listeners"
        />
      </li>
      <li v-if="head" class="breadcrumb-item active" aria-current="page">
        <span id="headItemTooltipID">
          {{ head.label }}
        </span>
        <b-tooltip
          v-if="headItemTooltip" placement="bottom"
          target="headItemTooltipID"
          triggers="hover"
        >
          {{ headItemTooltip }}
        </b-tooltip>
      </li>
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
    },
    headItemTooltip: {
      type: String
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
