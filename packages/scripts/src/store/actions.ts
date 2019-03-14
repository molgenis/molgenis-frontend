// @ts-ignore
import api from '@molgenis/molgenis-api-client'

export default {
  requestScripts ({ dispatch, commit } : any) {
    return new Promise((resolve, reject) => {
      api.get('/api/v2/sys_scr_ScriptType?num=10000').then((response: any) => {
        // console.log(response)
        commit('loadScriptTypes', response.items.map((type: any) => {
          return type.name
        }))
      })

      api.get('/api/v2/sys_scr_Script?num=10000').then((response: any) => {
        // console.log(response)
        commit('loadScripts', response)
        commit('setLoadedState', true)
        resolve()
      }, (error: any) => {
        reject(error)
      })
    })
  },
  editScript ({ dispatch, commit } : any, script: any) {
    return new Promise((resolve, reject) => {
      const options = {
        body: JSON.stringify({ entities: [script] })
      }
      api.put('/api/v2/sys_scr_Script', options).then((response: any) => {
        dispatch('requestScripts')
        resolve()
      }, (error: any) => {
        reject(error)
      })
    })
  },
  newScript ({ dispatch, commit } : any, script: any) {
    return new Promise((resolve, reject) => {
      const options = {
        body: JSON.stringify({ entities: [script] })
      }
      api.post('/api/v2/sys_scr_Script', options).then((response: any) => {
        dispatch('requestScripts')
        resolve()
      }, (error: any) => {
        reject(error)
      })
    })
  },
  removeScript ({ dispatch, commit } : any, scriptName: string) {
    api.delete_('/api/v2/sys_scr_Script/' + scriptName).then((response: any) => {
      dispatch('requestScripts')
    }, () => {
    })
  },
  saveParametersAndScripts ({ dispatch, commit } : any, form: any) {
    return new Promise((resolve, reject) => {
      dispatch('addParameters', form.parameters).then(() => {
        dispatch('editScript', form).then(() => {
          resolve()
        }, (error: any) => { reject(error) })
      }, (error: any) => { reject(error) })
    })
  },
  newParametersAndScripts ({ dispatch, commit } : any, form: any) {
    return new Promise((resolve, reject) => {
      dispatch('addParameters', form.parameters).then(() => {
        dispatch('newScript', form).then(() => {
          resolve()
        }, (error: any) => { reject(error) })
      }, (error: any) => { reject(error) })
    })
  },
  addParameters ({ dispatch, commit } : any, parameters: any) {
    return new Promise((resolve, reject) => {
      api.get('/api/v2/sys_scr_ScriptParameter?num=10000').then((response: any) => {
        const existingParameters = response.items.map((parameter:any) => { return parameter.name })
        existingParameters.push('molgenisToken')
        existingParameters.push('outputFile')

        // Filter out pre existing parameters and commit only the unique new ones
        existingParameters.map((toRemove:string) => {
          parameters = parameters.filter((parameter:string) => parameter !== toRemove)
        })

        if (parameters.length > 0) {
          const options = {
            body: JSON.stringify({ entities:
                parameters.map((parameter: any) => { return { 'name': parameter } })
            })
          }

          api.post('/api/v2/sys_scr_ScriptParameter', options).then((response: any) => {
            resolve()
          }, (error: any) => {
            reject(error)
          })
        } else {
          resolve()
        }
      }, (error: any) => {
        reject(error)
      })
    })
  }
}
