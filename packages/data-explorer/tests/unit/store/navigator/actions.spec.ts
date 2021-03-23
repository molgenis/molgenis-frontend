import actions from '@/store/navigator/actions'
import * as api from '@/lib/utils/api'
import td from 'testdouble'
import utils from '../../../lib/test-action'

describe('actions', () => {
  beforeEach(() => td.reset())

  describe('FETCH_RESOURCES', () => {
    it('should dispatch FETCH_RESOURCES_BY_QUERY action for the current query', async () => {
      const options = {
        rootState: {
          query: 'MyQuery'
        },
        expectedActions: [
          { type: '__FETCH_RESOURCES_BY_QUERY__', payload: 'MyQuery' }
        ]
      }
      await utils.testAction(actions.__FETCH_RESOURCES__, options)
    })
    it('should dispatch FETCH_RESOURCES_BY_FOLDER action for the current folder', async () => {
      const options = {
        rootState: {
          route: {
            params: {
              folderId: 'folderId'
            }
          }
        },
        expectedActions: [
          { type: '__FETCH_RESOURCES_BY_FOLDER__', payload: 'folderId' }
        ]
      }
      await utils.testAction(actions.__FETCH_RESOURCES__, options)
    })
  })
  describe('FETCH_RESOURCES_BY_QUERY', () => {
    it('should set resources in the state for the given query', async () => {
      const resources = [ { type: 'PACKAGE', id: 'id', label: 'label', readonly: false } ]

      const getResourcesByQuery = td.function('api.getResourcesByQuery')
      td.when(getResourcesByQuery('myQuery')).thenResolve(Promise.resolve(resources))
      td.replace(api, 'getResourcesByQuery', getResourcesByQuery)

      const options = {
        payload: 'myQuery',
        expectedMutations: [
          { type: '__SET_RESOURCES__', payload: resources }
        ]
      }
      await utils.testAction(actions.__FETCH_RESOURCES_BY_QUERY__, options)
    })
    it('should set alerts in the state in case of errors', async () => {
      const getResourcesByQuery = td.function('api.getResourcesByQuery')

      const error = new Error()
      // @ts-ignore
      error.alerts = [ { type: 'ERROR', message: 'message' } ]
      td.when(getResourcesByQuery('myQuery')).thenResolve(Promise.reject(new Error()))
      td.replace(api, 'getResourcesByQuery', getResourcesByQuery)

      const options = {
        payload: 'myQuery',
        expectedMutations: [
          // @ts-ignore
          { type: '__ADD_ALERTS__', payload: error.alerts }
        ]
      }
      await utils.testAction(actions.__FETCH_RESOURCES_BY_QUERY__, options)
    })
  })
  describe('FETCH_RESOURCES_BY_FOLDER', () => {
    it('should set folder and folder resources in the state for the given folder id', async () => {
      const folderState = {
        folder: { id: 'id', label: 'label', readonly: false },
        resources: [ {
          type: 'PACKAGE',
          id: 'id',
          label: 'label',
          readonly: false
        } ]
      }

      const getResourcesByFolderId = td.function('api.getResourcesByFolderId')
      td.when(getResourcesByFolderId('folderId')).thenResolve(Promise.resolve(folderState))
      td.replace(api, 'getResourcesByFolderId', getResourcesByFolderId)

      const options = {
        payload: 'folderId',
        expectedMutations: [
          { type: '__SET_FOLDER__', payload: folderState.folder },
          { type: '__SET_RESOURCES__', payload: folderState.resources }
        ]
      }
      await utils.testAction(actions.__FETCH_RESOURCES_BY_FOLDER__, options)
    })
    it('should set alerts in the state in case of errors', async () => {
      const getResourcesByFolderId = td.function('api.getResourcesByFolderId')
      td.when(getResourcesByFolderId('folderId')).thenResolve(Promise.reject(new Error()))
      td.replace(api, 'getResourcesByFolderId', getResourcesByFolderId)

      const options = {
        payload: 'folderId',
        expectedMutations: [
          { type: '__ADD_ALERTS__' }
        ]
      }
      await utils.testAction(actions.__FETCH_RESOURCES_BY_FOLDER__, options)
    })
  })
  describe('SELECT_ALL_RESOURCES', () => {
    it('should update selected resources in the state to be resources', async () => {
      const resources = [ { type: 'PACKAGE', id: 'id', label: 'label', readonly: false } ]

      const options = {
        state: {
          resources: resources
        },
        expectedMutations: [
          { type: '__SET_SELECTED_RESOURCES__', payload: resources }
        ]
      }
      await utils.testAction(actions.__SELECT_ALL_RESOURCES__, options)
    })
  })
  describe('DESELECT_ALL_RESOURCES', () => {
    it('should update selected resources in the state to be empty', async () => {
      const options = {
        state: {
          selectedResources: [ { type: 'PACKAGE', id: 'id', label: 'label', readonly: false } ]
        },
        expectedMutations: [
          { type: '__SET_SELECTED_RESOURCES__', payload: [] }
        ]
      }
      await utils.testAction(actions.__DESELECT_ALL_RESOURCES__, options)
    })
  })
  describe('SELECT_RESOURCE', () => {
    it('should add given resource to the selected resources in the state', async () => {
      const resource0 = { type: 'PACKAGE', id: 'id0', label: 'label0', readonly: false }
      const resource1 = { type: 'PACKAGE', id: 'id1', label: 'label1', readonly: false }
      const options = {
        state: {
          selectedResources: [ resource0 ]
        },
        payload: resource1,
        expectedMutations: [
          {
            type: '__SET_SELECTED_RESOURCES__',
            payload: [ resource0, resource1 ]
          }
        ]
      }
      await utils.testAction(actions.__SELECT_RESOURCE__, options)
    })
  })
  describe('DESELECT_RESOURCE', () => {
    it('should remove given resource from the selected resources in the state', async () => {
      const resource0 = { type: 'PACKAGE', id: '0', label: 'label0', readonly: false }
      const resource1 = { type: 'ENTITY_TYPE', id: '0', label: 'label0', readonly: false }
      const options = {
        state: {
          selectedResources: [ resource0, resource1 ]
        },
        payload: resource0,
        expectedMutations: [
          {
            type: '__SET_SELECTED_RESOURCES__',
            payload: [ resource1 ]
          }
        ]
      }
      await utils.testAction(actions.__DESELECT_RESOURCE__, options)
    })
  })
  describe('DELETE_SELECTED_RESOURCES', () => {
    const resources = [ { type: 'PACKAGE', id: 'id', label: 'label', readonly: false } ]
    const deleteResources = td.function('api.deleteResources')

    it('should delete selected resources', async () => {
      const job = { type: 'DELETE', id: 'id', status: 'RUNNING' }

      td.when(deleteResources(resources)).thenResolve(Promise.resolve(job))
      td.replace(api, 'deleteResources', deleteResources)

      const options = {
        state: {
          selectedResources: resources
        },
        expectedActions: [
          { type: '__POLL_JOB__', payload: job }
        ],
        expectedMutations: [
          { type: '__SET_SELECTED_RESOURCES__', payload: [] },
          { type: '__ADD_JOB__', payload: job }
        ]
      }
      await utils.testAction(actions.__DELETE_SELECTED_RESOURCES__, options)
    })

    it('should set alerts in the state in case of errors', async () => {
      const error = new Error()
      // @ts-ignore
      error.alerts = [ { type: 'ERROR', message: 'message' } ]

      td.when(deleteResources(resources)).thenResolve(Promise.reject(error))
      td.replace(api, 'deleteResources', deleteResources)

      const options = {
        state: {
          selectedResources: resources
        },
        expectedMutations: [
          // @ts-ignore
          { type: '__ADD_ALERTS__', payload: error.alerts }
        ]
      }
      await utils.testAction(actions.__DELETE_SELECTED_RESOURCES__, options)
    })
  })
  describe('CREATE_RESOURCE', () => {
    const resource = { type: 'PACKAGE', id: 'id', label: 'label', readonly: false }
    const folder = { id: 'id', label: 'label', readonly: false }
    const createResource = td.function('api.createResource')

    it('should create the given resource and refresh resources in the state', async () => {
      td.when(createResource(resource, folder)).thenResolve(Promise.resolve())
      td.replace(api, 'createResource', createResource)

      const options = {
        state: {
          folder: folder
        },
        payload: resource,
        expectedActions: [
          {
            type: '__FETCH_RESOURCES__'
          }
        ]
      }
      await utils.testAction(actions.__CREATE_RESOURCE__, options)
    })
    it('should set alerts in the state in case of errors', async () => {
      const error = new Error()
      // @ts-ignore
      error.alerts = [ { type: 'ERROR', message: 'message' } ]
      td.when(createResource(resource, folder)).thenResolve(Promise.reject(error))
      td.replace(api, 'createResource', createResource)

      const options = {
        expectedMutations: [
          // @ts-ignore
          { type: '__ADD_ALERTS__', payload: error.alerts }
        ],
        state: {
          folder: folder
        },
        payload: resource
      }
      await utils.testAction(actions.__CREATE_RESOURCE__, options)
    })
  })
  describe('UPDATE_RESOURCE', () => {
    it('should update the given resource and refresh resources in the state', async () => {
      const resource = { type: 'PACKAGE', id: 'id', label: 'label', readonly: false }
      const updatedResource = { type: 'PACKAGE', id: 'id', label: 'labelNew', readonly: false }

      const updateResource = td.function('api.updateResource')
      td.when(updateResource(resource, updatedResource)).thenResolve(Promise.resolve())
      td.replace(api, 'updateResource', updateResource)

      const options = {
        state: {
          resources: [ resource ]
        },
        payload: updatedResource,
        expectedActions: [
          {
            type: '__FETCH_RESOURCES__'
          }
        ]
      }
      await utils.testAction(actions.__UPDATE_RESOURCE__, options)
    })

    it('should set alerts in the state in case of errors', async () => {
      const resource = { type: 'PACKAGE', id: 'id', label: 'label', readonly: false }
      const updatedResource = { type: 'PACKAGE', id: 'id', label: 'labelNew', readonly: false }

      const updateResource = td.function('api.createResource')
      const error = new Error()
      // @ts-ignore
      error.alerts = [ { type: 'ERROR', message: 'message' } ]
      td.when(updateResource(resource, updatedResource)).thenResolve(Promise.reject(error))
      td.replace(api, 'updateResource', updateResource)

      const options = {
        expectedMutations: [
          // @ts-ignore
          { type: '__ADD_ALERTS__', payload: error.alerts }
        ],
        state: {
          resources: [ resource ]
        },
        payload: updatedResource
      }
      await utils.testAction(actions.__UPDATE_RESOURCE__, options)
    })
  })
  describe('MOVE_CLIPBOARD_RESOURCES', () => {
    it('should move clipboard resources to given target folder', async () => {
      const resources = [ { type: 'PACKAGE', id: 'id', label: 'label', readonly: false } ]
      const folder = { id: 'id', label: 'label', readonly: false }

      const moveResources = td.function('api.moveResources')
      td.when(moveResources(resources, folder)).thenResolve(Promise.resolve())
      td.replace(api, 'moveResources', moveResources)

      const options = {
        payload: folder,
        state: {
          clipboard: {
            mode: 'CUT',
            resources: resources
          }
        },
        expectedActions: [
          { type: '__FETCH_RESOURCES__' }
        ],
        expectedMutations: [
          { type: '__RESET_CLIPBOARD__' }
        ]
      }
      await utils.testAction(actions.__MOVE_CLIPBOARD_RESOURCES__, options)
    })

    it('should set alerts in the state in case of errors', async () => {
      const resources = [ { type: 'PACKAGE', id: 'id', label: 'label', readonly: false } ]
      const folder = { id: 'id', label: 'label', readonly: false }

      const moveResources = td.function('api.moveResources')
      const error = new Error()
      // @ts-ignore
      error.alerts = [ { type: 'ERROR', message: 'message' } ]
      td.when(moveResources(resources, folder)).thenResolve(Promise.reject(error))
      td.replace(api, 'moveResources', moveResources)

      const options = {
        payload: folder,
        state: {
          clipboard: {
            mode: 'CUT',
            resources: resources
          }
        },
        expectedMutations: [
          // @ts-ignore
          { type: '__ADD_ALERTS__', payload: error.alerts }
        ]
      }
      await utils.testAction(actions.__MOVE_CLIPBOARD_RESOURCES__, options)
    })
  })
  describe('COPY_CLIPBOARD_RESOURCES', () => {
    const resources = [ { type: 'PACKAGE', id: 'id', label: 'label', readonly: false } ]
    const folder = { id: 'id', label: 'label', readonly: false }

    it('should copy clipboard resources to given target folder', async () => {
      const job = { type: 'COPY', id: 'id', status: 'RUNNING' }
      const copyResources = td.function('api.copyResources')
      td.when(copyResources(resources, folder)).thenResolve(Promise.resolve(job))
      td.replace(api, 'copyResources', copyResources)

      const options = {
        payload: folder,
        state: {
          clipboard: {
            mode: 'COPY',
            resources: resources
          }
        },
        expectedActions: [
          { type: '__POLL_JOB__', payload: job }
        ],
        expectedMutations: [
          { type: '__RESET_CLIPBOARD__' },
          { type: '__ADD_JOB__', payload: job }
        ]
      }
      await utils.testAction(actions.__COPY_CLIPBOARD_RESOURCES__, options)
    })

    it('should set alerts in the state in case of errors', async () => {
      const copyResources = td.function('api.copyResources')
      const error = new Error()
      // @ts-ignore
      error.alerts = [ { type: 'ERROR', message: 'message' } ]
      td.when(copyResources(resources, folder)).thenResolve(Promise.reject(error))
      td.replace(api, 'copyResources', copyResources)

      const options = {
        payload: folder,
        state: {
          clipboard: {
            mode: 'CUT',
            resources: resources
          }
        },
        expectedMutations: [
          // @ts-ignore
          { type: '__ADD_ALERTS__', payload: error.alerts }
        ]
      }
      await utils.testAction(actions.__COPY_CLIPBOARD_RESOURCES__, options)
    })
  })
  describe('POLL_JOB', () => {
    it('should update the job on progress change', async () => {
      const job = {
        type: 'COPY',
        id: 'jobId',
        status: 'RUNNING',
        progress: 3,
        progressMax: 100
      }
      const updatedJob = {
        type: 'COPY',
        id: 'jobId',
        status: 'RUNNING',
        progress: 30,
        progressMax: 100
      }

      const fetchJob = td.function('api.fetchJob')
      td.when(fetchJob(job)).thenResolve(Promise.resolve(updatedJob))
      td.replace(api, 'fetchJob', fetchJob)

      const options = {
        payload: job,
        state: {
          jobs: [ job ]
        },
        expectedMutations: [
          { type: '__UPDATE_JOB__', payload: updatedJob }
        ]
      }
      await utils.testAction(actions.__POLL_JOB__, options)
    })

    it('should fetch resources on copy job success', async () => {
      const job = {
        type: 'COPY',
        id: 'jobId',
        status: 'RUNNING',
        progress: 3,
        progressMax: 100
      }
      const updatedJob = {
        type: 'COPY',
        id: 'jobId',
        status: 'SUCCESS',
        progress: 100,
        progressMax: 100,
        resultUrl: '/files/myfile.zip'
      }

      const fetchJob = td.function('api.fetchJob')
      td.when(fetchJob(job)).thenResolve(Promise.resolve(updatedJob))
      td.replace(api, 'fetchJob', fetchJob)

      const options = {
        payload: job,
        state: {
          jobs: [ job ]
        },
        expectedMutations: [
          { type: '__UPDATE_JOB__', payload: updatedJob }
        ],
        expectedActions: [
          { type: '__FETCH_RESOURCES__' }
        ]
      }
      await utils.testAction(actions.__POLL_JOB__, options)
    })
    it('should set alerts in the state in case of errors', async () => {
      const error = new Error()
      // @ts-ignore
      error.alerts = [ { type: 'ERROR', message: 'message' } ]

      const job = {
        type: 'COPY',
        id: 'jobId',
        status: 'RUNNING',
        progress: 3,
        progressMax: 100
      }

      const fetchJob = td.function('api.fetchJob')
      td.when(fetchJob(job)).thenResolve(Promise.reject(error))
      td.replace(api, 'fetchJob', fetchJob)

      const options = {
        payload: job,
        state: {
          jobs: [ job ]
        },
        expectedMutations: [
          // @ts-ignore
          { type: '__ADD_ALERTS__', payload: error.alerts }
        ]
      }

      await utils.testAction(actions.__POLL_JOB__, options)
    })
  })
  describe('DOWNLOAD_SELECTED_RESOURCES', () => {
    const resources = [ { type: 'PACKAGE', id: 'id', label: 'label', readonly: false } ]
    const downloadResources = td.function('api.downloadResources')

    it('should download selected resources', async () => {
      const job = { type: 'DOWNLOAD', id: 'id', status: 'RUNNING' }

      td.when(downloadResources(resources)).thenResolve(Promise.resolve(job))
      td.replace(api, 'downloadResources', downloadResources)

      const options = {
        state: {
          selectedResources: resources
        },
        expectedActions: [
          { type: '__POLL_JOB__', payload: job }
        ],
        expectedMutations: [
          { type: '__SET_SELECTED_RESOURCES__', payload: [] },
          { type: '__ADD_JOB__', payload: job }
        ]
      }
      await utils.testAction(actions.__DOWNLOAD_SELECTED_RESOURCES__, options)
    })
    it('should set alerts in the state in case of errors', async () => {
      const error = new Error()
      // @ts-ignore
      error.alerts = [ { type: 'ERROR', message: 'message' } ]

      td.when(downloadResources(resources)).thenResolve(Promise.reject(error))
      td.replace(api, 'downloadResources', downloadResources)

      const options = {
        state: {
          selectedResources: resources
        },
        expectedMutations: [
          // @ts-ignore
          { type: '__ADD_ALERTS__', payload: error.alerts }
        ]
      }
      await utils.testAction(actions.__DOWNLOAD_SELECTED_RESOURCES__, options)
    })
  })
})
