import axios from 'axios'
import { DataApiResponse } from '@/types/ApiResponse'

export default {
  getGroupTabels: async ({ commit, state }: { commit: any, state: any }, payload: { tableName: string }) => {
    const query = 'q=package==root_hospital'
    const filter = 'filter=id,label,package'
    const expand = 'expand=package'
    const resp = await axios.get<DataApiResponse>(`/api/data/sys_md_EntityType?${expand}&${filter}&${query}`)
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
