<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li v-for="crumb in tail" :key="crumb.label" class="breadcrumb-item dropdown"
        @mouseover="showDropDown($event, crumb)"
        @mouseleave="hideDropDown($event, crumb)"
      >
        <a :href="crumb.link">{{crumb.label}}</a>
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
    head () {
      return this.breadcrumbs[this.breadcrumbs.length - 1]
    },
    tail () {
      return this.breadcrumbs.slice(0, this.breadcrumbs.length - 1)
    }
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
