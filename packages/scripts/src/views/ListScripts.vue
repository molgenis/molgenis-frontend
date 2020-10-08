<template>
  <div class="container">
    <div class="navigator-actions">
      <b-button class="mb-3" size="sm" variant="primary" @click="createNewScript" :title="'scripts-add-new-script' | i18n"><font-awesome-icon icon="plus" size="lg" /> {{ 'scripts-new-script' | i18n }}</b-button>
    </div>
    <b-modal v-model="showRemoveModal"
             id="removeScriptModal"
             :title="'scripts-confirm-deletion' | i18n"
             :ok-title="'scripts-delete-label' | i18n"
             ok-variant="danger"
             @ok="confirmedRemove">
      <p class="my-4">{{ 'scripts-remove-script' | i18n }}</p>
    </b-modal>
    <b-table
      :hover="true"
      :items="scripts.items"
      :fields="fields"
      :filter="filter"
      class="text-left"
      @row-clicked="editScript"
      show-empty>
      <template v-slot:cell(edit)="data">
        <b-button :name="data.item.name" class="editButton" size="sm" variant="primary" @click="editScript({name: data.item.name})" :title="'scripts-edit-script' | i18n">
          <font-awesome-icon icon="edit" size="lg" />
        </b-button>
      </template>
      <template v-slot:cell(remove)="data">
        <b-button :name="data.item.name" class="removeButton" size="sm" variant="danger" @click="doOpenModal(data.item.name)" :title="'scripts-delete-script' | i18n">
          <font-awesome-icon icon="trash" size="lg" />
        </b-button>
      </template>
      <template v-slot:cell(name)="data">
        {{ data.item.name }} <b-badge>{{ data.item.type.name }} </b-badge>
      </template>
      <template v-slot:cell(parameters)="data">
        <span v-for="(parameter, key) in data.item.parameters" :key="`parameter-${key}`"><span v-if="key!=0">,</span> {{ parameter.name }}</span>
      </template>
      <template v-slot:cell(execute)="data">
        <ExecuteButton v-if="loaded" size="sm" :parameters="simpleParameters(data.item.parameters)" :name="data.item.name" :title="'scripts-run-script' | i18n">{{ 'scripts-run-label' | i18n }}</ExecuteButton>
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
      fields: [
        {
          key: 'edit',
          label: '',
          'class': 'compact align-middle'
        },
        {
          key: 'remove',
          label: '',
          'class': 'compact align-middle'
        },
        {
          key: 'name',
          label: 'scripts-name-label' | this.i18n,
          sortable: true,
          'class': 'align-middle'
        },
        {
          key: 'parameters',
          label: 'scripts-parameters-label' | this.i18n,
          sortable: false,
          'class': 'align-middle'
        },
        {
          key: 'resultFileExtension',
          label: 'scripts-result-file-extension' | this.i18n,
          sortable: false,
          'class': 'compact align-middle'
        },
        {
          key: 'execute',
          label: '',
          sortable: false,
          'class': 'compact'
        }
      ],
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
