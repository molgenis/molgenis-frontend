import client from '@/lib/client'
import { DataApiResponse, isDataApiResponseItem } from '@/types/ApiResponse'

const getBreadCrumbPath = async (parentUrl: string, addBreadcrumb: Function, buildLink: Function): Promise<any> => {
  const packageName = parentUrl.split('/').pop()
  const query = `q=id==${packageName}`
  const resp = await client.get<DataApiResponse>(`/api/data/sys_md_Package?${query}`)
  const data = resp.data.items[0].data
  if (data === undefined) {
    throw new Error(`Expected package data could not be fetched for package: ${packageName}`)
  }

  // add the new crumb to the store
  addBreadcrumb({
    id: data.id,
    label: data.label,
    link: buildLink(data.id)
  })

  if (data.parent && isDataApiResponseItem(data.parent)) {
    return getBreadCrumbPath(data.parent.links.self, addBreadcrumb, buildLink)
  } else {
    Promise.resolve() // no more parents signal we are done
  }
}

export default {
  getGroupTabels: async ({ commit }: { commit: any }, payload: { package: string }) => {
    const packageName = payload.package.split('/').pop()
    const query = `q=package==${packageName}`
    const filter = 'filter=id,label,package'
    const expand = 'expand=package'
    const resp = await client.get<DataApiResponse>(`/api/data/sys_md_EntityType?${expand}&${filter}&${query}`)
    const packageTables = resp.data.items.map((i:any) => {
      return {
        id: i.data.id,
        label: i.data.label
      }
    })
    commit('setPackageTables', packageTables)
    return packageTables
  },

  fetchBreadcrumbs: async ({ commit, getters, rootState }: { commit: any, getters: any, rootState: any }) => {
    commit('clearBreadcrumbs')
    const location = getters.navigatorLocation
    if (!rootState.tableMeta || !location) {
      return
    }

    const buildLink = (id: string) => {
      return `${location}/${id}`
    }

    commit('addBreadcrumb', {
      id: rootState.tableMeta.id,
      label: rootState.tableMeta.label,
      link: buildLink(rootState.tableMeta.id)
    })
    return getBreadCrumbPath(rootState.tableMeta.package, (crumb: any) => { commit('addBreadcrumb', crumb) }, buildLink)
  }
}
