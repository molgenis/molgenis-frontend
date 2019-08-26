import ApplicationState from '@/types/ApplicationState'
import { DataApiResponse } from '@/types/ApiResponse'

export default {
  activeEntityData: (state: ApplicationState): DataApiResponse | null =>
    state.entityData
}
