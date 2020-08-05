import Vue from 'vue'
import { SecurityModel } from '@/types/SecurityModel'
import { Group } from '@/types/Group'
import { User } from '@/types/User'
import { Toast } from '@/types/Toast'
import { LoginUser } from '@/types/LoginUser'
import { GroupMember } from '@/types/GroupMember'
import { GroupRole } from '@/types/GroupRole'

const mutations = {
  setLoginUser (state: SecurityModel, loginUser: LoginUser) {
    state.loginUser = loginUser
  },
  setGroups (state: SecurityModel, groups: Array<Group>) {
    state.groups = groups
  },
  setUsers (state: SecurityModel, users: Array<User>) {
    state.users = users
  },
  setGroupMembers (state: SecurityModel, { groupName, groupMembers }: {groupName: string; groupMembers: GroupMember[]}) {
    Vue.set(state.groupMembers, groupName, groupMembers)
  },
  setGroupRoles (state: SecurityModel, { groupName, groupRoles }: {groupName: string; groupRoles: GroupRole[]}) {
    Vue.set(state.groupRoles, groupName, groupRoles)
  },
  setGroupPermissions (state: SecurityModel, { groupName, groupPermissions }: {groupName: string; groupPermissions: string[]}) {
    Vue.set(state.groupPermissions, groupName, groupPermissions)
  },
  setGroupRights (state: SecurityModel, { groupName, groupRights }) {
    Vue.set(state.groupRights, groupName, groupRights)
  },
  clearToast (state: SecurityModel) {
    state.toast = null
  },
  setToast (state: SecurityModel, toast: Toast) {
    state.toast = toast
  }
}
export default mutations
