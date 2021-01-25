import { Breadcrumb } from '@/types/Breadcrumb'

export default {
  setPackageTables (state:any, packageTables:any) {
    state.packageTables = packageTables
  },
  clearBreadcrumbs (state:any) {
    state.breadcrumbs.splice(0) // Clear array while keeping reactive reference
  },
  addBreadcrumb (state:any, breadcrumb:Breadcrumb) {
    if (!state.breadcrumbs.find(bc => bc.id === breadcrumb.id)) {
      state.breadcrumbs.push(breadcrumb)
    }
  }
}
