import state from '../../../src/store/state'

const mockState = () => JSON.parse(JSON.stringify(state))

export default mockState
