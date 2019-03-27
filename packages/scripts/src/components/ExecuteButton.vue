<template>
  <span v-if="loaded" :name="name" >
    <b-button @click.stop="execute" :disabled="disabled" class="runButton"
              :size="size" variant="primary"><font-awesome-icon class='mr-2' icon="play" size="lg" /> <slot></slot></b-button>
    <RunModal v-model="showModal"
              :parameters="parameters"
              :name="name"
    />
  </span>
</template>

<script>
import { mapState } from 'vuex'
import RunModal from '../components/RunModal'

export default {
  name: 'ExecuteButton',
  props: {
    parameters: Array,
    name: String,
    form: Object,
    size: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    doSave: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showModal: false,
      save: false
    }
  },
  computed: {
    ...mapState(['loaded'])
  },
  components: { RunModal },
  methods: {
    execute () {
      if (this.doSave) {
        this.$store.dispatch('saveParametersAndScripts', this.form).then(() => {
          this.run()
        })
      } else {
        this.run()
      }
    },
    run () {
      if (this.parameters.length > 0) {
        this.showModal = true
      } else {
        window.open('/scripts/' + this.name + '/start', '_blank')
      }
    }
  }
}
</script>
