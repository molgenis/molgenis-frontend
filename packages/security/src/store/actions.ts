// @ts-ignore
import api from '@molgenis/molgenis-api-client'
import asyncUtilService from '../service/asyncUtilService'
import { GroupMember } from '@/types/GroupMember'
import { CreateGroupCommand } from '@/types/CreateGroupCommand'
import { UpdateMemberCommand } from '@/types/UpdateMemberCommand'
import { AddMemberCommand } from '@/types/AddMemberCommand'
import { VOGroupMember } from '@/types/VOGroupMember'
import { AddVOGroupMemberCommand } from '@/types/AddVOGroupMemberCommand'
import { getVOGroupID } from './helpers'
import { VOGroup } from '@/types/VOGroup'
import { SecurityModel } from '@/types/SecurityModel'
import { Member } from '@/types/Member'
import { GroupRole } from '@/types/GroupRole'
import { User } from '@/types/User'

const SECURITY_API_ROUTE = '/api/identities'
const SECURITY_API_VERSION = ''
const GROUP_ENDPOINT = SECURITY_API_ROUTE + SECURITY_API_VERSION + '/group'
const TEMP_USER_ENDPOINT = SECURITY_API_ROUTE + SECURITY_API_VERSION + '/user'
const TEMP_VO_GROUP_ENDPOINT = SECURITY_API_ROUTE + SECURITY_API_VERSION + '/vo-group'

const toGroupMember = (response: { user: User; role: GroupRole }): GroupMember => {
  return {
    userId: response.user.id,
    username: response.user.username,
    roleName: response.role.roleName,
    roleLabel: response.role.roleLabel
  }
}

const toVOGroupMember = (response: { VOGroup: VOGroup; role: GroupRole }): VOGroupMember => {
  return {
    groupId: response.VOGroup.id,
    groupName: response.VOGroup.name,
    roleName: response.role.roleName,
    roleLabel: response.role.roleLabel
  }
}

const buildErrorMessage = (response: { errors: any[] }) => {
  if (response.errors) {
    return response.errors.map((error) => {
      return error.message + ' (' + error.code + ')'
    }).join(', ')
  } else {
    // fallback if error is not in expected format
    return 'An error has occurred.'
  }
}

const handleSuccess = (commit: Function, message: string) => {
  commit('setToast', { type: 'success', message })
  asyncUtilService.callAfter(() => {
    commit('clearToast')
  }, 3000)
}

const actions = {
  'fetchGroups' ({ commit }: { commit: Function }) {
    return api.get(GROUP_ENDPOINT).then((response: any) => {
      commit('setGroups', response)
    }, (response: { errors: any[] }) => {
      commit('setToast', { type: 'danger', message: buildErrorMessage(response) })
    })
  },

  'fetchGroupRoles' ({ commit }: { commit: Function }, groupName: string) {
    const url = GROUP_ENDPOINT + '/' + encodeURIComponent(groupName) + '/role'
    return api.get(url).then((response: any) => {
      commit('setGroupRoles', { groupName, groupRoles: response })
    }, (response: { errors: any[] }) => {
      commit('setToast', { type: 'danger', message: buildErrorMessage(response) })
    })
  },

  'tempFetchUsers' ({ commit }: { commit: Function }) {
    return api.get(TEMP_USER_ENDPOINT).then((response: any) => {
      commit('setUsers', response)
    }, (response: { errors: any[] }) => {
      commit('setToast', { type: 'danger', message: buildErrorMessage(response) })
    })
  },

  'tempFetchVOGroups' ({ commit, state }: { commit: Function; state: { voGroups: VOGroup[] | null }}) {
    if (state.voGroups != null) {
      return
    }
    return api.get(TEMP_VO_GROUP_ENDPOINT).then((response: any) => {
      commit('setVOGroups', response)
    }, (response: { errors: any[] }) => {
      commit('setToast', { type: 'danger', message: buildErrorMessage(response) })
    })
  },

  'fetchGroupMembers' ({ commit }: { commit: Function }, groupName: string) {
    const url = GROUP_ENDPOINT + '/' + encodeURIComponent(groupName) + '/member'
    return api.get(url).then((response: { user: User; role: GroupRole }[]) => {
      const groupMembers = response.map(toGroupMember)
      commit('setGroupMembers', { groupName, groupMembers })
    }, (response: { errors: any[] }) => {
      commit('setToast', { type: 'danger', message: buildErrorMessage(response) })
    })
  },

  'fetchVOGroupMembers' ({ commit }: { commit: Function }, groupName: string) {
    const url = GROUP_ENDPOINT + '/' + encodeURIComponent(groupName) + '/vo-group'
    return api.get(url).then((response: { VOGroup: VOGroup; role: GroupRole }[]) => {
      const voGroupMembers = response.map(toVOGroupMember).sort((a, b) => a.groupName.localeCompare(b.groupName))
      commit('setVOGroupMembers', { groupName, voGroupMembers })
    }, (response: { errors: any[] }) => {
      commit('setToast', { type: 'danger', message: buildErrorMessage(response) })
    })
  },

  'fetchGroupPermissions' ({ commit }: { commit: Function }, groupName: string) {
    const url = GROUP_ENDPOINT + '/' + encodeURIComponent(groupName) + '/permission'
    return api.get(url).then((groupPermissions: string[]) => {
      commit('setGroupPermissions', { groupName, groupPermissions })
    }, (response: { errors: any[] }) => {
      commit('setToast', { type: 'danger', message: buildErrorMessage(response) })
    })
  },

  'createGroup' ({ commit }: { commit: Function }, createGroupCmd: CreateGroupCommand) {
    const payload = {
      body: JSON.stringify({
        name: createGroupCmd.groupIdentifier,
        label: createGroupCmd.name
      })
    }
    return new Promise((resolve, reject) => {
      api.post(GROUP_ENDPOINT, payload).then((response: any) => {
        commit('setGroups', response)
        handleSuccess(commit, 'Created ' + createGroupCmd.name + ' group')
        resolve()
      }, (response: { errors: any[] }) => {
        commit('setToast', { type: 'danger', message: buildErrorMessage(response) })
        reject(response)
      })
    })
  },

  'addMember' ({ commit, state }: { commit: Function; state: { voGroups: VOGroup[] | null} }, { groupName, type, name, roleName }: Member) {
    let payload: {body: string}
    if (type === 'member') {
      const command: AddMemberCommand = {
        roleName,
        username: name
      }
      payload = { body: JSON.stringify(command) }
    } else if (type === 'vo-group') {
      const command: AddVOGroupMemberCommand = {
        roleName,
        VOGroupID: getVOGroupID(state.voGroups, name)
      }
      payload = { body: JSON.stringify(command) }
    }
    const url = `${GROUP_ENDPOINT}/${encodeURIComponent(groupName)}/${type}`

    return new Promise((resolve, reject) => {
      api.post(url, payload).then(() => {
        handleSuccess(commit, 'Added member')
        resolve()
      }, (response: { errors: any[] }) => {
        commit('setToast', { type: 'danger', message: buildErrorMessage(response) })
        reject(response)
      })
    })
  },

  'removeMember' ({ commit, state }: { commit: Function; state: { voGroups: VOGroup[] | null } },
    { groupName, memberName, type }: {groupName: string; memberName: string; type: 'member' | 'vo-group'}) {
    const member = type === 'member' ? memberName : getVOGroupID(state.voGroups, memberName)
    const url = `${GROUP_ENDPOINT}/${encodeURIComponent(groupName)}/${type}/${encodeURIComponent(member)}`

    return new Promise((resolve, reject) => {
      api.delete_(url).then(() => {
        handleSuccess(commit, 'Member removed from group')
        resolve()
      }, (response: { errors: any[] }) => {
        commit('setToast', { type: 'danger', message: buildErrorMessage(response) })
        reject(response)
      })
    })
  },

  'updateMember' ({ commit, state }: { commit: Function; state: { voGroups: VOGroup[] | null} },
    { groupName, memberName, updateMemberCommand, type }:
      { groupName: string; memberName: string; updateMemberCommand: UpdateMemberCommand; type: 'member' | 'VOGroup' }
  ) {
    const member = type === 'member' ? memberName : getVOGroupID(state.voGroups, memberName)
    const url = `${GROUP_ENDPOINT}/${encodeURIComponent(groupName)}/${type}/${encodeURIComponent(member)}`
    const payload = { body: JSON.stringify(updateMemberCommand) }

    return new Promise((resolve, reject) => {
      api.put(url, payload).then(() => {
        handleSuccess(commit, 'Member updated')
        resolve()
      }, (response: { errors: any[] }) => {
        commit('setToast', { type: 'danger', message: buildErrorMessage(response) })
        reject(response)
      })
    })
  },

  'checkRootPackageExists' ({ commit }: { commit: Function }, packageName: string) {
    const url = '/api/v2/sys_md_Package?&num=1&q=id==\'' + encodeURIComponent(packageName) + '\''

    return new Promise((resolve, reject) => {
      api.get(url).then((response: any) => {
        const exists = response.items.length > 0
        resolve(exists)
      }, (response: { errors: any[] }) => {
        commit('setToast', { type: 'danger', message: buildErrorMessage(response) })
        reject(response)
      })
    })
  },
  'deleteGroup' ({ commit }: { commit: Function }, { groupName }: {groupName: string}) {
    const url = GROUP_ENDPOINT + '/' + encodeURIComponent(groupName)

    return new Promise((resolve, reject) => {
      api.delete_(url).then(() => {
        handleSuccess(commit, 'Deleted Group')
        resolve()
      }, (response: { errors: any[] }) => {
        commit('setToast',
          { type: 'danger', message: buildErrorMessage(response) })
        reject(response)
      })
    })
  },
  async 'setGroupRight' ({ commit, state }: { commit: Function; state: SecurityModel }, data: { name: string; role: string; right: string }) {
    const url = `/api/identities/group/${data.name}/role/${data.role}`
    const role: { roleName: string } | undefined = state.groupRights.roles.find((item: any) => item.roleName.toUpperCase() === `${data.name}_${data.right}`.toUpperCase())
    // @ts-ignore
    const rolename: string|null = role ? role.roleName : null
    if (data.right === '') {
      const response = await api.delete_(url)
      if (response && response.status !== 204) {
        commit('setToast', { type: 'danger', message: buildErrorMessage(response) })
      }
      return response
    } else if (rolename) {
      const payload = { body: JSON.stringify({ role: rolename }) }
      const response = await api.put(url, payload)
      if (response && response.status !== 204) {
        commit('setToast', { type: 'danger', message: buildErrorMessage(response) })
      }
      return response
    }
  },
  'fetchGroupRights' ({ commit }: { commit: Function }, groupName: string) {
    commit('setGroupRights', { groupName: 'anonymous', groupRights: null })
    commit('setGroupRights', { groupName: 'user', groupRights: null })
    commit('setGroupRights', { groupName: 'roles', groupRights: [] })

    const groupUrl = '/api/data/sys_sec_Role?expand=includes&q=name==ANONYMOUS,name==USER'
    const rolesUrl = `/api/identities/group/${groupName}/role`
    return Promise.all([
      api.get(groupUrl).then((rights: any) => {
        commit('setGroupRights', { groupName: 'anonymous', groupRights: rights.items.find((item: any) => item.data.name === 'ANONYMOUS').data })
        commit('setGroupRights', { groupName: 'user', groupRights: rights.items.find((item: any) => item.data.name === 'USER').data })
      }, (response: any) => {
        commit('setToast', { type: 'danger', message: buildErrorMessage(response) })
      })
      // @ts-ignore
    ], [
      api.get(rolesUrl).then((rights: any) => {
        commit('setGroupRights', { groupName: 'roles', groupRights: rights })
      }, (response: any) => {
        commit('setToast', { type: 'danger', message: buildErrorMessage(response) })
      })
    ])
  }
}
export default actions
