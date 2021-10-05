<template>
    <div class="card app-card-component">
      <div class="card-header">
        <div class="row">
          <div class="col">
            <h5>{{ app.label }}</h5>
          </div>
        </div>
        <div class="row">
          <div class="col">
              <span>
                <toggle-button
                class="mt-2"
                  :labels="{checked: ' Active', unchecked: ' Inactive'}"
                  :width="72" :value="app.isActive"
                  @change="toggleAppActiveState(app)" :sync="true"
                  title="toggle active status"></toggle-button>
            </span>
          </div>
          <div class="col">
            <div class="float-right">
              <upload-app :appId="app.id" update class="d-inline mr-3"/>
              <button :disabled="app.isActive" class="btn btn-danger btn-sm mx-1 "
                    @click="deleteApp(app)"
                    title="delete">
              <i class="fa fa-trash"></i>
            </button>
            </div>
          </div>
        </div>
      </div>

        <div class="card-body app-card-body">
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
      height: 15rem;
      margin-bottom: 1rem;
    }

    .app-card-component .card-body {
      overflow-y: auto;
    }
</style>

<script>
import Vue from 'vue'
import ToggleButton from 'vue-js-toggle-button'
import UploadApp from './UploadApp.vue'
Vue.use(ToggleButton)

export default {
  components: { UploadApp },
  name: 'AppCard',
  props: ['app'],
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
