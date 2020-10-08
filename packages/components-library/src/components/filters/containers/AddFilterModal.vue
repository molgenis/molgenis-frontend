<template>
  <div>
    <b-button
      v-b-modal.modal-add-filter
      variant="outline-secondary"
      class="w-100 mt-2 add-button"
    >
      Add a filter
      <font-awesome-icon
        class="ml-1"
        icon="plus"
      />
    </b-button>

    <b-modal
      id="modal-add-filter"
      title="Add filter"
      :static="true"
      @ok="addFilter"
      @show="resetModal"
    >
      <b-form-select
        v-model="selected"
        name="filter"
        :options="options"
      />
    </b-modal>
  </div>
</template>

<script>
import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faPlus)

export default Vue.extend({
  name: 'AddFilterModal',
  components: { FontAwesomeIcon },
  props: {
    filters: {
      type: Array,
      required: true
    },
    value: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      selected: null
    }
  },
  computed: {
    options () {
      return this.filters.map(it => ({
        value: it.name,
        text: it.label
      }))
    }
  },
  methods: {
    resetModal () {
      this.selected = this.filters[0].name
    },
    addFilter () {
      if (this.selected != null) {
        this.$emit('input', [...this.value, this.selected])
      }
    }
  }
})
</script>
