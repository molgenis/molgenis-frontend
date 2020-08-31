import ApplicationState from '@/types/ApplicationState'
import { findPath } from '@/service/menuService'

export default {
  navigatorLocation: (state: ApplicationState, getters: any, rootState:any): string | undefined => {
    return findPath('/menu', rootState.account.context.menu, 'navigator')
  }
}
