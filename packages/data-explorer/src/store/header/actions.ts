import api from '@/lib/api'
import { DataApiResponse } from '@/types/ApiResponse'

export default {
  getGroupTabels: async ({ commit }: { commit: any }, payload: { package: string }) => {
    const packageName = payload.package.split('/').pop()
    const query = `q=package==${packageName}`
    const filter = 'filter=id,label,package'
    const expand = 'expand=package'
    const resp = await api.get<DataApiResponse>(`/api/data/sys_md_EntityType?${expand}&${filter}&${query}`)
    const packageTables = resp.data.items.map((i:any) => {
      return {
        id: i.data.id,
        label: i.data.label
      }
    })
    commit('setPackageTables', packageTables)
    return packageTables
  }
}
