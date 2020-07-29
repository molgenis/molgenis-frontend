// @flow
import type {Group, GroupMember, SecurityModel, Toast, LoginUser, User, GroupRole} from '../flow.type'

const getters = {
  getLoginUser: (state: SecurityModel): LoginUser => {
    return state.loginUser
  },
  groups: (state: SecurityModel): Array<Group> => {
    return state.groups
  },
  groupMembers: (state: SecurityModel): Array<GroupMember> => {
    return state.groupMembers
  },
  groupRoles: (state: SecurityModel): Array<GroupRole> => {
    return state.groupRoles
  },
  groupPermissions: (state: SecurityModel): Array<string> => {
    return state.groupPermissions
  },
  users: (state: SecurityModel): Array<User> => {
    return state.users
  },
  toast: (state: SecurityModel): Toast => {
    return state.toast
  },
  getAnonymousGroupRights: (state: SecurityModel) => (groupID: string, rightID: string) => {
    if (state.groupRights.anonymous && state.groupRights.anonymous.includes) {
      return state.groupRights.anonymous.includes.items.filter(item => item.data.description === `${groupID} {rightID}`).length > 0
    }
    return false
  },
  getUserGroupRights: (state: SecurityModel) => (groupID: string, rightID: string) => {
    if (state.groupRights && state.groupRights.user && state.groupRights.user.includes) {
      return state.groupRights.user.includes.items.filter(item => item.data.description === `${groupID} ${rightID}`).length > 0
    }
  }
}
export default getters
