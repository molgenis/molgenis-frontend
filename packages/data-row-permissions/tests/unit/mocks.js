import { state } from '../../src/store/state'
import { actions } from '../../src/store/actions'
import { getters } from '../../src/store/getters'
import { mutations } from '../../src/store/mutations'

export const mockState = JSON.parse(JSON.stringify(state))
export const mockActions = actions
export const mockGetters = getters
export const mockMutations = mutations
