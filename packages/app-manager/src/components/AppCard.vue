<template>
    <div class="card app-card-component">
      <div class="card-header p-2" >
        <div class="d-flex mb-3">
            <h5>{{ app.label }} </h5>
            <a
              class="ml-auto pl-1"
              :href="appSettingsLink"
              title="Go to app settings">
              <span class="fa fa-cog fa-lg text-muted" aria-hidden="true"></span>
            </a>
        </div>
        <div class="row">
          <div class="col pl-3">
              <span>
                <toggle-button
                class="mt-2"
                  :labels="{checked: ' Active', unchecked: ' Inactive'}"
                  :width="72" :value="app.isActive"
                  @change="toggleAppActiveState(app)" :sync="true"
                  title="toggle active status"></toggle-button>
            </span>
          </div>
          <div class="col pr-2">
            <div class="float-right">
              <upload-app :appId="app.id"/>
              <button :disabled="app.isActive" class="btn btn-danger btn-sm mr-2"
                    @click="deleteApp(app)"
                    title="delete">
              <i class="fa fa-trash"></i>
            </button>
            </div>
          </div>
        </div>
      </div>

        <div class="card-body pt-3 pb-0">
              <dl>
                <dt>Version</dt>
                <dd class="text-muted">{{ app.version }}</dd>
                <dt>Description</dt>
                <dd class="text-muted">{{ app.description }}</dd>
            </dl>
        </div>
    </div>
</template>

<style scoped>
    .app-card-component {
      height: 20rem;
      margin-bottom: 1rem;
    }

    .app-card-component .card-body {
      overflow-y: auto;
    }
</style>

<script>
import Vue from 'vue'
import ToggleButton from 'vue-js-toggle-button'
import UploadApp from './UpdateApp.vue'
Vue.use(ToggleButton)

export default {
  components: { UploadApp },
  name: 'AppCard',
  props: ['app'],
  computed: {
    linkToAppSettings () {
      return `/plugin/data-row-edit/sys_App/${this.app.id}`
    }
  },
  methods: {
    deleteApp (app) {
      this.$store.dispatch('DELETE_APP', app.id)
    },

    toggleAppActiveState (app) {
      if (app.isActive) {
        this.$store.dispatch('DEACTIVATE_APP', app.id)
      } else {
        this.$store.dispatch('ACTIVATE_APP', app.id)
      }
    }
  }
}
</script>
