<template>
  <div class="container">

    <toast></toast>

    <div class="row mb-3  ">
      <div class="col">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link :to="{ name: 'groupOverView' }">{{ 'security-ui-breadcrumb-groups' | i18n
                }}
              </router-link>
            </li>
            <li class="breadcrumb-item active text-capitalize" aria-current="page">{{this.groupName}}</li>
          </ol>
        </nav>
      </div>
    </div>

    <div class="row mb-3  ">
      <div class="col">
        <h1>{{ 'security-ui-add-member-title' | i18n }}</h1>
        <h1 v-else>{{'security-ui-vo-group-title' | i18n }}</h1>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <form>

          <div class="form-group">
            <label for="memberSelect">{{ 'security-ui-membership-attribute-user' | i18n }}</label>
            <select id="memberSelect" v-model="name" class="form-control" :disabled="candidates.length === 0">
              <option v-if="candidates.length > 0" value="">- {{ emptyCandidateLabel }} -
              </option>
              <option v-else value="">{{ noCandidatesLabel }}</option>
              <option v-for="candidate in candidates" :value="candidate.name" :key="candidate.name">{{candidate.name}}</option>
            </select>
          </div>

          <div class="form-group">
            <label>{{ 'security-ui-membership-attribute-role' | i18n }}</label>
            <div v-for="role in sortedRoles" :key="role.roleName" class="form-check" >
              <input class="form-check-input" type="radio" name="roleRadio"
                     :id="role.roleName" :value="role.roleName" v-model="roleName" >
              <label class="form-check-label" :for="role.roleName">
                {{role.roleLabel}}
              </label>
            </div>

          </div>

          <router-link :to="{name: 'groupDetail', params: { name: groupName }}">
            <a href="#" class="btn btn-secondary mr-1" role="button">{{ 'security-ui-btn-cancel' | i18n }}</a>
          </router-link>

          <button
            v-if="!isAdding"
            id="create-btn"
            class="btn btn-success"
            type="submit"
            @click.prevent="onSubmit"
            :disabled="!name || !roleName">
            <span v-if="!isVOGroup">{{ 'security-ui-btn-add-member' | i18n }}</span>
            <span v-else>{{'security-ui-group-btn-add-group' | i18n}}</span>
          </button>

          <button
            v-else
            id="save-btn-saving"
            class="btn btn-primary"
            type="button"
            disabled="disabled">
            {{ 'security-ui-btn-adding-member' | i18n }} <i class="fa fa-spinner fa-spin "></i>
          </button>

        </form>
      </div>
    </div>

  </div>
</template>

<script>
import Toast from '@/components/Toast.vue'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'MemberAdd',
  props: {
    groupName: {
      type: String,
      required: false
    },
    type: {
      type: String,
      required: true,
      validator: (val) => ['member', 'vo-group'].includes(val)
    }
  },
  data () {
    return {
      name: '',
      roleName: '',
      isAdding: false
    }
  },
  computed: {
    ...mapState(['voGroupMembers', 'voGroups']),
    ...mapGetters([
      'groupRoles',
      'users',
      'groupMembers'
    ]),
    isVOGroup () {
      return this.type === 'vo-group'
    },
    noCandidatesLabel () {
      return this.type === 'member'
        ? this.$t('security-ui-no-available-users')
        : this.$t('security-ui-no-available-vo-groups')
    },
    emptyCandidateLabel () {
      return this.type === 'member'
        ? this.$t('security-ui-please-select-a-user')
        : this.$t('security-ui-please-select-a-vo-group')
    },
    sortedRoles () {
      const roles = this.groupRoles[this.groupName] || []
      return [...roles].sort((a, b) => a.roleLabel.localeCompare(b.roleLabel))
    },
    candidates () {
      return this.type === 'member'
        ? this.nonMemberUsers.map(user => ({ name: user.username }))
        : this.nonMemberVOGroups
    },
    nonMemberUsers () {
      const currentMembers = this.groupMembers[this.groupName] || []
      const currentMemberNames = currentMembers.map((cm) => cm.username)
      const nonMemberUsers = this.users.filter((u) => !currentMemberNames.includes(u.username))
      return [...nonMemberUsers].sort((a, b) => a.username.localeCompare(b.username))
    },
    nonMemberVOGroups () {
      const currentMembers = this.voGroupMembers[this.groupName] || []
      const currentMemberNames = currentMembers.map((cm) => cm.groupName)
      return (this.voGroups || []).filter((vog) => !currentMemberNames.includes(vog.name))
    }
  },
  methods: {
    onSubmit () {
      this.isAdding = !this.isAdding
      this.$store.dispatch('addMember', { groupName: this.groupName, roleName: this.roleName, name: this.name, type: this.type })
        .then(() => {
          this.$router.push({ name: 'groupDetail', params: { name: this.groupName } })
        }, () => {
          this.isAdding = !this.isAdding
        })
    }
  },
  created () {
    this.$store.dispatch('tempFetchUsers')
    this.$store.dispatch('tempFetchVOGroups')
    this.$store.dispatch('fetchGroupRoles', this.groupName)
  },
  components: {
    Toast
  }
}
</script>

<style scoped>
  select {
    max-width: 100%;
  }
</style>
