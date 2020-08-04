export type Toast = {
  type: 'danger' | 'success',
  message: string
}

export type LoginUser = {
  name: string,
  isSuperUser: boolean
}

export type Group = {
  name: string,
  label: string
}

export type GroupMember = {
  userId: string,
  username: string,
  roleName: string,
  roleLabel: string
}

export type GroupRole = {
  roleName: string,
  roleLabel: string
}

export type User = {
  id: string,
  username: string
}

export type GroupRights = {
  user: any,
  anonymous: any,
  roles: Array
}

export type SecurityModel = {
  loginUser: LoginUser,
  groups: Array<Group>,
  groupMembers: { [string]: Array<GroupMember> },
  groupRoles: { [string]: Array<GroupRole> },
  groupPermissions: { [string]: Array<string> },
  users: Array<User>,
  toast: ?Toast,
  groupRights: GroupRights
}

export type CreateGroupCommand = {
  groupIdentifier: string,
  name: string
}
