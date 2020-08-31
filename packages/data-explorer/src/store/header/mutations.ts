import { Breadcrumb } from '@/types/BreadCrumb'

export default {
  setPackageTables (state:any, packageTables:any) {
    state.packageTables = packageTables
  },
  clearBreadcrumbs (state:any) {
    state.breadcrumbs.splice(0) // Clear array while keeping reactive reference
  },
  addBreadcrumb (state:any, breadcrumb:Breadcrumb) {
    state.breadcrumbs.unshift(breadcrumb)
  }
}
