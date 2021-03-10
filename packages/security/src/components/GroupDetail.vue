<template>
  <div class="container">

    <toast></toast>

    <div class="row mb-3">
      <div class="col">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link :to="{ name: 'groupOverView' }">{{ 'security-ui-breadcrumb-groups' | i18n
                }}
              </router-link>
            </li>
            <li class="breadcrumb-item active text-capitalize" aria-current="page">{{name}}</li>
          </ol>
        </nav>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col">
        <h1>{{ 'security-ui-members-page-title' | i18n }} {{name}}</h1>
        <b-button id="delete-group-btn" variant="danger" v-if="hasSuperUserRights"
                  v-b-modal.deleteModal>
          <i :class="['fa', 'fa-trash', 'fa-lg', 'fa-enabled']"></i></b-button>
      </div>
    </div>

    <div class="row mt-2">
      <div class="col-md-6" v-if="voGroups && voGroups.length">
        <span class="float-right">
          <button id="add-vo-group-member-btn" v-if="canAddMember" @click="addVOGroupMember" type="button"
                  class="btn btn-primary"><i class="fa fa-plus" aria-hidden="true"></i> {{'security-ui-add-vo-group' | i18n}}
          </button>
        </span>
        <h3 class="mt-2">{{'security-ui-vo-groups-header' | i18n}}</h3>
        <p>{{'security-ui-vo-group-explanation' | i18n}}</p>

        <div class="groups-listing mt-1">
          <router-link
            v-for="voGroup in myVOGroupMembers"
            :key="voGroup.groupName"
            :to="{ name: 'memberDetail', params: { groupName: name, type: 'vo-group', memberName: voGroup.groupName } }"
            class="list-group-item list-group-item-action">
            <div>
              <span class="font-weight-bold">{{voGroup.groupName}}
                <small class="font-weight-light text-uppercase"> ({{voGroup.roleLabel}})</small>
              </span>
            </div>
          </router-link>
        </div>
      </div>
      <div class="col-md-6">
        <span class="float-right">
          <button id="add-member-btn" v-if="canAddMember" @click="addMember" type="button"
                  class="btn btn-primary"><i class="fa fa-plus"></i> {{'security-ui-add-member' | i18n}}
          </button>
        </span>
        <h3 class="mt-2">{{'security-ui-members-header' | i18n}}</h3>
        <p>{{'security-ui-member-explanation' | i18n}}</p>
        <div class="groups-listing mt-1">
          <router-link
            v-for="member in sortedMembers"
            :key="member.username"
            :to="{ name: 'memberDetail', params: { groupName: name, type: 'member', memberName: member.username } }"
            class="list-group-item list-group-item-action">
            <div>
              <span class="text-capitalize font-weight-bold">{{member.username}}
                <small class="font-weight-light text-uppercase"> ({{member.roleLabel}})</small>
              </span>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div v-if="hasSuperUserRights">
      <div class="row">
        <div class="col">
          <h3 class="mt-4">{{ 'security-ui-permissions-label-anonymous' | i18n }}</h3>
        </div>
      </div>

      <div class="row groups-listing">
        <div class="col">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="anonymous-view" v-model="anonymousViewerPermission" :disabled="isSaving">
            <label class="form-check-label" for="anonymous-view">
              {{ 'security-ui-anonymous-can-view' | i18n }}
            </label>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <h3 class="mt-4">{{ 'security-ui-permissions-label-user' | i18n }}</h3>
        </div>
      </div>

      <div class="row groups-listing">
        <div class="col">
          <div class="form-check" role="button">
            <input class="form-check-input" type="radio" id="registered-none" name="RegisteredUser" value="" v-model="registeredUserPermission" :disabled="isSaving">
            <label class="form-check-label" for="registered-none">
              {{ 'security-ui-user-can-not-view' | i18n }}
            </label>
          </div>
          <div class="form-check" role="button">
            <input class="form-check-input" type="radio" id="registered-view" name="RegisteredUser" value="Viewer" v-model="registeredUserPermission" :disabled="isSaving">
            <label class="form-check-label" for="registered-view">
              {{ 'security-ui-user-can-view' | i18n }}
            </label>
          </div>
          <div class="form-check" role="button">
            <input class="form-check-input" type="radio" id="registered-edit" name="RegisteredUser" value="Editor" v-model="registeredUserPermission" :disabled="isSaving">
            <label class="form-check-label" for="registered-edit">
              {{ 'security-ui-user-can-edit' | i18n }}
            </label>
          </div>
        </div>
      </div>

      <div class="row mt-3">
        <div class="col">
          <span class="">
            <button id="save-permissions-btn" @click="savePermissions" type="button" class="btn btn-primary" :disabled="isSaving">
              <i :class="['fa', 'fa-save']"></i> {{ 'security-ui-save-permissions' | i18n }} <i v-if="isSaving" class="fa fa-spinner fa-spin "></i>
            </button>
          </span>
        </div>
      </div>
    </div>
    <b-modal id="deleteModal" ok-variant="danger" cancel-variant="secondary"
             :title="$t('security-ui-delete-confirmation-title')"
             :ok-title="$t('security-ui-delete-confirmation-ok-text')"
             :cancel-title="$t('security-ui-delete-confirmation-cancel-text')" @ok="deleteGroupHandler">
      {{ 'security-ui-delete-confirmation-text' | i18n }}
    </b-modal>
  </div>
</template>

<script>
import Toast from './Toast'
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'GroupDetail',
  props: {
    name: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      anonymousViewerPermission: false,
      registeredUserPermission: '',
      isSaving: true
    }
  },
  computed: {
    ...mapState(['voGroupMembers', 'voGroups']),
    ...mapGetters([
      'groupMembers',
      'groupPermissions',
      'getAnonymousGroupRightsBool',
      'getUserGroupRightsString',
      'hasSuperUserRights'
    ]),
    sortedMembers () {
      const members = this.groupMembers[this.name] || []
      return [...members].sort((a, b) => a.username.localeCompare(b.username))
    },
    myVOGroupMembers () {
      return this.voGroupMembers[this.name] || []
    },
    canAddMember () {
      const groupPermissions = this.groupPermissions[this.name] || []
      return groupPermissions.includes('ADD_MEMBERSHIP')
    }
  },
  methods: {
    ...mapMutations([
      'clearToast'
    ]),
    ...mapActions([
      'tempFetchVOGroups',
      'fetchGroupMembers',
      'fetchVOGroupMembers',
      'fetchGroupPermissions',
      'fetchGroupRights',
      'setGroupRight',
      'deleteGroup'
    ]),
    async savePermissions () {
      this.isSaving = true
      await Promise.all([
        this.setGroupRight({ name: this.name, role: 'ANONYMOUS', right: this.anonymousViewerPermission ? 'Viewer' : '' }),
        this.setGroupRight({ name: this.name, role: 'USER', right: this.registeredUserPermission })
      ])
      await this.fetchGroupRights(this.name)
      this.isSaving = false
    },
    addMember () {
      this.clearToast()
      this.$router.push({ name: 'addMember', params: { groupName: this.name } })
    },
    addVOGroupMember () {
      this.clearToast()
      this.$router.push({ name: 'addVOGroupMember', params: { groupName: this.name } })
    },
    deleteGroupHandler () {
      this.deleteGroup({ groupName: this.name }).then(() => {
        this.$router.push({ name: 'groupOverView' })
      })
    },
    loadGroupRights () {
      this.fetchGroupRights(this.name).then(() => {
        this.anonymousViewerPermission = this.getAnonymousGroupRightsBool(this.name, 'Viewer')
        this.registeredUserPermission = this.getUserGroupRightsString(this.name)
        this.isSaving = false
      })
    }
  },
  created () {
    this.tempFetchVOGroups()
    this.fetchGroupMembers(this.name)
    this.fetchGroupPermissions(this.name)
    this.fetchVOGroupMembers(this.name)
    if (this.hasSuperUserRights) {
      this.loadGroupRights()
    } else {
      this.isSaving = false
    }
  },
  watch: {
    hasSuperUserRights (newValue) {
      if (newValue === true) {
        this.loadGroupRights()
      }
    }
  },
  components: {
    Toast
  }
}
</script>
