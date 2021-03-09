/**
 * A utility function to help you in testing Vuex actions
 *
 * @example <caption>Example of how to call the testAction function</caption>
 *
 *  ---------actions.js-----------
 *
 *  import api from 'whatever-you-use-as-api'
 *
 *  export const GET_A_NICE_RESPONSE = '__GET_A_NICE_RESPONSE__'
 *
 *  export default {
 *    [GET_A_NICE_RESPONSE] ({commit}, id) {
 *      api.get('/api/response/' + id).then(response => {
 *        commit(SET_RESPONSE, response)
 *      }
 *    }
 *  }
 *
 *  -------actions.spec.js--------
 *
 *  import td from 'testdouble'
 *  import api from 'whatever-you-use-as-api'
 *  import { testAction } from '@molgenis/molgenis-js-test-utils'
 *  import actions from 'store/actions'
 *
 *  it('call an api, and call a mutation with the response', done => {
 *     const response = 'got a nice response'
 *
 *     const get = td.function('api.get')
 *     td.when(get('/api/response/my_id')).thenResolve(response)
 *     td.replace(api, 'get', get)
 *
 *     const options = {
 *       payload: 'my_id',
 *       expectedMutations: [
 *         {type: SET_RESPONSE, payload: response}
 *       ]
 *     }
 *
 *     testAction(actions.__GET_NICE_RESPONSE__, options, done)
 *  })
 *
 * @param action the action you want to test
 *
 * @param options an options object containing parameters that can be used in testing this action
 * @param options.payload the payload included in the action dispatch
 * @param options.state the state used in this specific action
 * @param options.rootState rootState can be used by modules from the store, this option can be used if module actions uses rootState
 * @param options.expectedMutations an array of objects describing the mutations that are expected to be committed by this action
 * @param options.expectedActions an array of objects describing the actions that are expected to be dispatched by this action
 * @param options.getters an object of possible mocks for getter calls
 *
 * @param done used to call done() which closes the Promise from calling an asynchronous api
 */
const testAction = (action, options) => {
  return new Promise((resolve, reject) => {
    const payload = options.payload ? options.payload : null
    const state = options.state ? options.state : {}
    const rootState = options.rootState ? options.rootState : {}
    const expectedMutations = options.expectedMutations ? options.expectedMutations : []
    const expectedActions = options.expectedActions ? options.expectedActions : []
    const getters = options.getters ? options.getters : {}

    let mutationCount = 0
    let actionCount = 0

    const commit = (type, payload) => {
      const mutation = expectedMutations[mutationCount]

      try {
        expect(mutation.type).toBe(type)
        if (payload) {
          expect(mutation.payload).toEqual(payload)
        }

        mutationCount++
        if (mutationCount >= expectedMutations.length && actionCount >= expectedActions.length) {
          // @ts-ignore
          resolve()
        }
      } catch (error) {
        reject(error)
      }
    }

    const dispatch = (type, payload) => {
      const action = expectedActions[actionCount]

      try {
        expect(action.type).toBe(type)
        if (payload) {
          expect(action.payload).toEqual(payload)
        }

        actionCount++
        if (actionCount >= expectedActions.length && mutationCount >= expectedMutations.length) {
          // @ts-ignore
          resolve()
        }
      } catch (error) {
        reject(error)
      }
    }

    action({ commit, dispatch, getters, state, rootState }, payload)

    if (expectedMutations.length === 0 && expectedActions.length === 0) {
      expect(mutationCount).toBe(0)
      expect(actionCount).toBe(0)
      // @ts-ignore
      resolve()
    }
  })
}

export default { testAction }
