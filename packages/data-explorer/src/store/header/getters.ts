import ApplicationState from '@/types/ApplicationState'
import { findPath } from '@/service/menuService'

export default {
  navigatorLocation: (state: ApplicationState, getters: any, rootState:any): string | undefined => {
    const relativePath = findPath('menu', rootState.account.context.menu, 'navigator')
    // Use absolute path as navigator my be served from different location
    return relativePath ? relativePath.substring(1) : undefined
  }
}
