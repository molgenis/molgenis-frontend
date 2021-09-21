import { state } from '../../src/store/state'
import { actions } from '../../src/store/actions'
import { getters } from '../../src/store/getters'
import { mutations } from '../../src/store/mutations'

export const mockState = JSON.parse(JSON.stringify(state))
export const mockActions = JSON.parse(JSON.stringify(actions))
export const mockGetters = JSON.parse(JSON.stringify(getters))
export const mockMutations = JSON.parse(JSON.stringify(mutations))
