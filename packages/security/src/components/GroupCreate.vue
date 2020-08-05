<template>
  <div class="container">

    <toast></toast>

    <div class="row mb-3  ">
      <div class="col">
        <h1>{{ 'security-ui-add-group-title' | i18n }}</h1>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <form>

          <div class="form-group">
            <label for="groupNameInput">{{'security-ui-group-attribute-label-name' | i18n}}</label>
            <input v-model="groupName" type="text" class="form-control" id="groupNameInput" aria-describedby="groupName"
                   :placeholder="'security-ui-group-attribute-label-placeholder' | i18n">
            <small id="groupNameHelp" class="form-text text-muted">
              {{'security-ui-group-attribute-label-description' |
              i18n}}
            </small>
          </div>

          <div class="form-group">
            <label for="groupIdentifierInput">{{'security-ui-group-attribute-name-name' | i18n}}</label>
            <input v-model="groupIdentifier" type="text" class="form-control" id="groupIdentifierInput"
                   :placeholder="'security-ui-group-attribute-name-placeholder'|i18n">
            <small v-if="groupIdentifierTaken" class="form-text text-danger" id="duplicateGroupIdentifierMessage">
              {{'security-ui-group-attribute-name-taken-message' | i18n}}
            </small>
            <small v-else-if="invalidGroupIdentifier" class="form-text text-danger" id="invalidGroupIdentifierMessage">
              {{'security-ui-group-attribute-name-valid-message' | i18n}}
            </small>
            <small v-else id="groupIdentifierHelp" class="form-text text-muted">
              {{'security-ui-group-attribute-name-description' | i18n}}
            </small>
          </div>

          <router-link to="/">
            <a href="#" class="btn btn-secondary" role="button">{{'security-ui-btn-cancel' | i18n}}</a>
          </router-link>

          <button
            v-if="!isCreating"
            id="create-btn"
            class="btn btn-success"
            type="submit"
            @click.prevent="onSubmit"
            :disabled="!canSubmit">
            {{'security-ui-group-btn-create-group' | i18n}}
          </button>

          <button
            v-else
            id="save-btn-saving"
            class="btn btn-primary"
            type="button"
            disabled="disabled">
            {{'security-ui-group-btn-creating-group' | i18n}} <i class="fa fa-spinner fa-spin "></i>
          </button>

        </form>
      </div>
    </div>

  </div>
</template>

<script>
import Toast from '@/components/Toast.vue'
import slugService from '@/service/slugService.ts'
import _ from 'lodash'

export default {
  name: 'GroupCreate',
  data () {
    return {
      groupName: '',
      groupIdentifier: '',
      isCreating: false,
      groupIdentifierTaken: null
    }
  },
  computed: {
    groupIdentifierSlug () {
      return slugService.slugify(this.groupName)
    },
    invalidGroupIdentifier () {
      // See https://regex101.com/r/rpnoM1/3 for the regex
      return this.groupIdentifier && !this.groupIdentifier.match(/^[\w-]+$/)
    },
    canSubmit () {
      return this.groupIdentifier.trim().length &&
          this.groupName.trim().length &&
          !this.invalidGroupIdentifier &&
          this.groupIdentifierTaken === false
    }
  },
  watch: {
    groupName () {
      this.groupIdentifier = this.groupIdentifierSlug
    },
    groupIdentifier (newVal) {
      this.groupIdentifierTaken = null
      if (newVal && !this.invalidGroupIdentifier) {
        this.groupIdentifierTaken = null
        this.checkRootPackageExists()
      }
    }
  },
  methods: {
    onSubmit () {
      this.isCreating = !this.isCreating
      const createGroupCommand = { groupIdentifier: this.groupIdentifier, name: this.groupName }
      this.$store.dispatch('createGroup', createGroupCommand)
        .then(() => {
          this.$router.push({ name: 'groupOverView' })
        }, () => {
          this.isCreating = !this.isCreating
        })
    },
    checkRootPackageExists: _.debounce(function () {
      const groupIdentifier = this.groupIdentifier
      this.$store.dispatch('checkRootPackageExists', groupIdentifier).then((exists) => {
        if (this.groupIdentifier === groupIdentifier) {
          this.groupIdentifierTaken = exists
        }
      })
    }, 300)
  },
  components: {
    Toast
  }
}
</script>
