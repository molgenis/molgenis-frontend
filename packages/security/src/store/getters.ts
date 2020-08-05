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
  }
}
export default getters
