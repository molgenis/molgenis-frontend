import Vue from 'vue'
import { SecurityModel } from '@/types/SecurityModel'
import { Group } from '@/types/Group'
import { User } from '@/types/User'
import { Toast } from '@/types/Toast'
import { GroupMember } from '@/types/GroupMember'
import { GroupRole } from '@/types/GroupRole'
import { GroupRollSubSelection } from '@/types/GroupRollSubSelection'
import { VOGroup } from '@/types/VOGroup'
import { VOGroupMember } from '@/types/VOGroupMember'

const mutations = {
  setGroups (state: SecurityModel, groups: Array<Group>) {
    state.groups = groups
  },
  setUsers (state: SecurityModel, users: Array<User>) {
    state.users = users
  },
  setVOGroups (state: SecurityModel, voGroups: Array<VOGroup>) {
    state.voGroups = voGroups
  },
  setGroupMembers (state: SecurityModel, { groupName, groupMembers }: {groupName: string; groupMembers: GroupMember[]}) {
    Vue.set(state.groupMembers, groupName, groupMembers)
  },
  setVOGroupMembers (state: SecurityModel, { groupName, voGroupMembers }: {groupName: string; voGroupMembers: VOGroupMember[]}) {
    Vue.set(state.voGroupMembers, groupName, voGroupMembers)
  },
  setGroupRoles (state: SecurityModel, { groupName, groupRoles }: {groupName: string; groupRoles: GroupRole[]}) {
    Vue.set(state.groupRoles, groupName, groupRoles)
  },
  setGroupPermissions (state: SecurityModel, { groupName, groupPermissions }: {groupName: string; groupPermissions: string[]}) {
    Vue.set(state.groupPermissions, groupName, groupPermissions)
  },
  setGroupRights (state: SecurityModel, { groupName, groupRights }: {groupName: string; groupRights: GroupRollSubSelection }) {
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
