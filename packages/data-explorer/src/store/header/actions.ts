import client from '@/lib/client'
import { DataApiResponse, isDataApiResponseItem } from '@/types/ApiResponse'
import { Breadcrumb } from '@/types/Breadcrumb'

const getPackageId = (url: string):string => {
  const packageId = url.split('/').pop()
  if (packageId === undefined) {
    throw new Error(`could not extract package id from url: ${url}`)
  }
  return packageId
}

const getBreadcrumbPath = async (parentUrl: string, addBreadcrumb: Function, buildLink: Function): Promise<any> => {
  const packageId = getPackageId(parentUrl)
  const query = `q=id==${encodeURIComponent(packageId)}`
  const resp = await client.get<DataApiResponse>(`/api/data/sys_md_Package?${query}`)
  const data = resp.data.items[0].data
  if (data === undefined) {
    throw new Error(`Expected package data could not be fetched for package: ${packageId}`)
  }

  // add the new crumb to the store
  addBreadcrumb({
    id: data.id,
    label: data.label,
    link: buildLink(data.id)
  })

  if (data.parent && isDataApiResponseItem(data.parent)) {
    return getBreadcrumbPath(data.parent.links.self, addBreadcrumb, buildLink)
  } else {
    Promise.resolve() // no more parents signal we are done
  }
}

const getPackageTables = async (packageId: string) => {
  const query = `q=package==${packageId}`
  const filter = 'filter=id,label,package'
  const expand = 'expand=package'
  const resp = await client.get<DataApiResponse>(`/api/data/sys_md_EntityType?${expand}&${filter}&${query}`)
  return resp.data.items.map((i:any) => {
    return {
      id: i.data.id,
      label: i.data.label
    }
  })
}

export default {
  fetchBreadcrumbs: async ({ commit, getters, rootState }: { commit: any, getters: any, rootState: any }) => {
    commit('clearBreadcrumbs')
    const location = getters.navigatorLocation
    if (!rootState.tableMeta) {
      return
    }

    const buildLink = (id: string) => {
      return location ? `${location}/${id}` : undefined
    }

    commit('addBreadcrumb', {
      id: rootState.tableMeta.id,
      label: rootState.tableMeta.label,
      link: buildLink(rootState.tableMeta.id)
    })
    return getBreadcrumbPath(rootState.tableMeta.package, (crumb: Breadcrumb) => { commit('addBreadcrumb', crumb) }, buildLink)
  },

  fetchPackageTables: async ({ commit }: { commit: any }, payload: { id: string, callback: Function }) => {
    const packageTables = await getPackageTables(payload.id)
    payload.callback(packageTables)
    Promise.resolve()
  }

}
