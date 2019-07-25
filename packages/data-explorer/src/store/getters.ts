import ApplicationState from '@/types/ApplicationState'

export default {
  activeEntityData: (state: ApplicationState): object =>
    state.entityData

}
