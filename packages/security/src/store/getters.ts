import { SecurityModel } from '@/types/SecurityModel'
import { LoginUser } from '@/types/LoginUser'
import { Group } from '@/types/Group'
import { GroupMember } from '@/types/GroupMember'
import { GroupRole } from '@/types/GroupRole'
import { User } from '@/types/User'
import { Toast } from '@/types/Toast'

const getters = {
  getLoginUser: (state: SecurityModel): LoginUser | {} => {
    return state.loginUser
  },
  groups: (state: SecurityModel): Array<Group> => {
    return state.groups
  },
  groupMembers: (state: SecurityModel): GroupMember[] | {} => {
    return state.groupMembers
  },
  groupRoles: (state: SecurityModel): GroupRole[] | {} => {
    return state.groupRoles
  },
  groupPermissions: (state: SecurityModel): string[] | {} => {
    return state.groupPermissions
  },
  users: (state: SecurityModel): Array<User> => {
    return state.users
  },
  toast: (state: SecurityModel): Toast | null => {
    return state.toast
  },
  getAnonymousGroupRightsBool: (state: SecurityModel) => (groupID: string, rightID: string) => {
    // Fix for a missing identities api call to match groups with permission ( GET /api/identities/group/{groupName}/role/{roleName} )
    if (state.groupRights.anonymous && state.groupRights.anonymous.includes) {
      return state.groupRights.anonymous.includes.items.filter(item => item.data.name.toUpperCase() === `${groupID}_${rightID}`.toUpperCase()).length > 0
    }
    return false
  },
  getUserGroupRightsString: (state: SecurityModel) => (groupID: string) => {
    // Fix for a missing identities api call to match groups with permission ( GET /api/identities/group/{groupName}/role/{roleName} )
    if (state.groupRights && state.groupRights.user && state.groupRights.user.includes) {
      const found = state.groupRights.user.includes.items.find(item => item.data.name.toUpperCase() === `${groupID}_Viewer`.toUpperCase() || item.data.name.toUpperCase() === `${groupID}_Editor`.toUpperCase())
      if (found) {
        return found.data.label
      } else {
        return ''
      }
    }
    return ''
  }
}
export default getters
