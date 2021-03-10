import { Group } from './Group'
import { GroupMember } from './GroupMember'
import { GroupRole } from './GroupRole'
import { User } from './User'
import { GroupRollSubSelection } from './GroupRollSubSelection'
import { Toast } from './Toast'
import { VOGroupMember } from './VOGroupMember'
import { VOGroup } from './VOGroup'

export type SecurityModel = {
  groups: Array<Group>;
  voGroupMembers: { string: Array<VOGroupMember> } | {};
  groupMembers: { string: Array<GroupMember> } | {};
  groupRoles: { string: Array<GroupRole> } | {};
  groupPermissions: { string: Array<string> } | {};
  users: Array<User>;
  voGroups: Array<VOGroup> | null;
  toast: Toast | null;
  groupRights: { user: null | GroupRollSubSelection; anonymous: null | GroupRollSubSelection; roles: [] };
}
