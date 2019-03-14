<template>
  <div class="container">
    <div class="navigator-actions">
      <b-button class="mb-3" size="sm" variant="primary" @click="createNewScript" v-b-tooltip.hover title="Add new script"><font-awesome-icon icon="plus" size="lg" /> New script</b-button>
    </div>
    <b-modal v-model="showRemoveModal"
             id="removeScriptModal"
             title="Confirm Deletion"
             ok-title="Delete"
             ok-variant="danger"
             @ok="confirmedRemove">
      <p class="my-4">Are you sure you want to remove this script?</p>
    </b-modal>
    <b-table
      :hover="true"
      :items="scripts.items"
      :fields="fields"
      :filter="filter"
      class="text-left"
      @row-clicked="editScript"
      show-empty>
      <template
        slot="edit"
        slot-scope="data">
        <b-button :name="data.item.name" size="sm" variant="primary" @click="editScript({name: data.item.name})" v-b-tooltip.hover title="Edit script">
          <font-awesome-icon icon="edit" size="lg" />
        </b-button>
      </template>
      <template
        slot="remove"
        slot-scope="data">
        <b-button class="removeButton" size="sm" variant="danger" @click="doOpenModal(data.item.name)" v-b-tooltip.hover title="Delete script">
          <font-awesome-icon icon="trash" size="lg" />
        </b-button>
      </template>
      <template
        slot="name"
        slot-scope="data">
        {{ data.item.name }} <b-badge>{{ data.item.type.name }} </b-badge>
      </template>
      <template
        slot="parameters"
        slot-scope="data">
        <span v-for="(parameter, key) in data.item.parameters" :key="`parameter-${key}`"><span v-if="key!=0">,</span> {{ parameter.name }}</span>
      </template>
      <template
        slot="execute"
        slot-scope="data">
        <ExecuteButton v-if="loaded" size="sm" :parameters="simpleParameters(data.item.parameters)" :name="data.item.name" v-b-tooltip.hover title="Run script">Run</ExecuteButton>
      </template>
    </b-table>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import { ReadyState } from '@/types/state'
import ExecuteButton from '../components/ExecuteButton'

export default Vue.extend({
  name: 'ScriptList',
  data () {
    return {
      fields: {
        edit: {
          label: '',
          'class': 'compact align-middle'
        },
        remove: {
          label: '',
          'class': 'compact align-middle'
        },
        name: {
          label: 'Name',
          sortable: true,
          'class': 'align-middle'
        },
        parameters: {
          label: 'Parameters',
          sortable: false,
          'class': 'align-middle'
        },
        resultFileExtension: {
          label: 'Result file extension',
          sortable: false,
          'class': 'compact align-middle'
        },
        execute: {
          label: '',
          sortable: false,
          'class': 'compact'
        }
      },
      hover: true,
      showRemoveModal: false,
      confirmedToRemove: '',
      filter: null
    }
  },
  computed: {
    ...mapState(['scripts', 'loaded'])
  },
  components: { ExecuteButton },
  methods: {
    editScript (record) {
      this.$router.push({ name: 'editscript', params: { id: record.name } })
    },
    simpleParameters (parameters) {
      return parameters.map((parameter) => {
        return parameter.name
      })
    },
    doOpenModal (toRemove) {
      this.confirmedToRemove = toRemove
      this.showRemoveModal = !this.showRemoveModal
    },
    confirmedRemove () {
      this.$store.dispatch('removeScript', this.confirmedToRemove)
      this.confirmedToRemove = ''
    },
    createNewScript () {
      this.$router.push({ name: 'newscript' })
    }
  }
})
</script>

<style scoped>
  >>> .compact {
    width: 1px;
    white-space: nowrap;
  }
  >>> tr {
    cursor: pointer;
  }
  >>> .badge{
    bottom: 1px;
    position: relative;
  }
</style>
