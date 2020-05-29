<template>
    <b-nav class="bread-crumb-dropdown">
      <b-nav-item-dropdown
          :id="label"
          :text="label"
          toggle-class="bread-crumb-item-dropdown"
          dropup
          no-caret
      >
      <template v-slot:button-content>
        <span class="bread-crumb-select">
          <h1>
            {{label}}
          </h1>
          <svg data-v-041edcbe=""
            class="chevron mr-2 svg-inline--fa fa-caret-right fa-w-6"
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="caret-right"
            role="img" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 192 512"
            style="transform: rotate(90deg); transition: transform 0.2s ease 0s;">
            <path
            data-v-041edcbe=""
            fill="currentColor"
            d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"
            class="">
            </path>
          </svg>
        </span>
      </template>
        <template v-for="table in packageTables">
            <b-dropdown-item :key="table.id" :to="table.id">{{table.label}}</b-dropdown-item>
        </template>
      </b-nav-item-dropdown>
    </b-nav>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'TableSelect',
  props: {
    label: {
      type: String,
      required: true
    },
    packageTables: {
      type: Array,
      required: true
    }
  }
})
</script>

<style scoped>
.bread-crumb-select {
  color: black;
  padding-right: 2rem;
}
.bread-crumb-select > h1 {
  display: inline;
}
.bread-crumb-select > svg {
  display: none;
  vertical-align: 0.2rem;
}
.bread-crumb-select:hover > svg {
  display: inline;
}
.bread-crumb-dropdown >>> .bread-crumb-item-dropdown {
  padding-left: 0;
  padding-bottom: 0;
}
</style>
