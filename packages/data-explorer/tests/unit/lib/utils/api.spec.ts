import molgenisApiClient from '@molgenis/molgenis-api-client'
import * as api from '@/lib/utils/api'
import td from 'testdouble'

describe('api', () => {
  afterEach(() => td.reset())

  let resources
  let folderId
  let folder

  beforeEach(() => {
    resources = [ {
      type: 'PACKAGE',
      id: 'package0',
      label: 'package #0',
      readonly: false
    } ]
    folderId = 'folderId'
    folder = { id: folderId, label: 'label', readonly: false }
  })

  describe('fetchJob', () => {
    it('should call the job endpoint for a copy job and return current job', async () => {
      const job = {
        type: 'COPY',
        id: 'jobId',
        status: 'RUNNING',
        progress: undefined,
        progressMax: undefined,
        progressMessage: undefined,
        resultUrl: undefined
      }

      const get = td.function('molgenisApiClient.get')
      td.when(get('/api/v2/sys_job_ResourceCopyJobExecution/jobId')).thenResolve({
        type: 'ResourceCopyJob',
        identifier: 'jobId',
        status: 'SUCCESS'
      })
      td.replace(molgenisApiClient, 'get', get)

      const updatedJob = {
        type: 'COPY',
        id: 'jobId',
        status: 'SUCCESS',
        progress: undefined,
        progressMax: undefined,
        progressMessage: undefined,
        resultUrl: undefined
      }

      expect((await api.fetchJob(job))).toEqual(updatedJob)
    })

    it('should call the job endpoint for a download job and return current job', async () => {
      const job = {
        type: 'DOWNLOAD',
        id: 'jobId',
        status: 'RUNNING',
        progress: undefined,
        progressMax: undefined,
        progressMessage: undefined,
        resultUrl: undefined
      }

      const response = {
        type: 'ResourceDownloadJob',
        identifier: 'jobId',
        status: 'FAILED'
      }

      const get = td.function('molgenisApiClient.get')
      td.when(get('/api/v2/sys_job_ResourceDownloadJobExecution/jobId')).thenResolve(response)
      td.replace(molgenisApiClient, 'get', get)

      const updatedJob = {
        type: 'DOWNLOAD',
        id: 'jobId',
        status: 'FAILED',
        progress: undefined,
        progressMax: undefined,
        progressMessage: undefined,
        resultUrl: undefined
      }
      expect((await api.fetchJob(job))).toEqual(updatedJob)
    })

    it('should return alerts in case of errors', async () => {
      const job = {
        type: 'DOWNLOAD',
        id: 'jobId',
        status: 'RUNNING',
        progress: undefined,
        progressMax: undefined,
        resultUrl: undefined
      }

      const response:any = { errors: [ { message: 'error' } ] }
      const get = td.function('molgenisApiClient.get')
      td.when(get('/api/v2/sys_job_ResourceDownloadJobExecution/jobId')).thenReject(response)
      td.replace(molgenisApiClient, 'get', get)
      expect(api.fetchJob(job)).rejects.toThrow(Error)
    })
  })

  describe('getResourcesByFolderId', () => {
    it('should call the get endpoint with folderId parameter and return folder state', async () => {
      const response = {
        folder: { id: 'id', label: 'label', readonly: 'false' },
        resources: [ { type: 'PACKAGE', id: 'p0', label: 'package #0', readonly: 'false' } ]
      }
      const get = td.function('molgenisApiClient.get')
      td.when(get('/plugin/navigator/get?folderId=f0')).thenResolve(response)
      td.replace(molgenisApiClient, 'get', get)

      expect((await api.getResourcesByFolderId('f0'))).toEqual(response)
    })

    it('should call the get endpoint without folderId parameter and return folder state', async () => {
      const response = {
        folder: { id: 'id', label: 'label', readonly: 'false' },
        resources: [ { type: 'PACKAGE', id: 'p0', label: 'package #0', readonly: 'false' } ]
      }
      const get = td.function('molgenisApiClient.get')
      td.when(get('/plugin/navigator/get')).thenResolve(response)
      td.replace(molgenisApiClient, 'get', get)

      expect((await api.getResourcesByFolderId())).toEqual(response)
    })

    it('should return alerts in case of errors', async () => {
      const response:any = { errors: [ { message: 'error' } ] }
      const get = td.function('molgenisApiClient.get')
      td.when(get('/plugin/navigator/get?folderId=unknownFolder')).thenReject(response)
      td.replace(molgenisApiClient, 'get', get)
      expect(api.getResourcesByFolderId('unknownFolder')).rejects.toThrow(Error)
    })
  })

  describe('getResourcesByQuery', () => {
    it('should call the search endpoint and return folder state', async () => {
      const response = {
        resources: [ { type: 'PACKAGE', id: 'p0', label: 'package #0', readonly: 'false' } ]
      }
      const get = td.function('molgenisApiClient.get')
      td.when(get('/plugin/navigator/search?query=text')).thenResolve(response)
      td.replace(molgenisApiClient, 'get', get)
      expect((await api.getResourcesByQuery('text'))).toEqual(response)
    })

    it('should return alerts in case of errors', () => {
      const response:any = { errors: [ { message: 'error' } ] }
      const get = td.function('molgenisApiClient.get')
      td.when(get('/plugin/navigator/search?query=text')).thenReject(response)
      td.replace(molgenisApiClient, 'get', get)
      expect(api.getResourcesByQuery('text')).rejects.toThrow(Error)
    })
  })

  describe('moveResources', () => {
    let body

    beforeEach(() => {
      body = {
        body: JSON.stringify({
          resources: [ { id: 'package0', type: 'PACKAGE' } ],
          targetFolderId: folderId
        })
      }
    })

    it('should call move endpoint and do nothing on success', async () => {
      const response = 'OK'
      const post = td.function('molgenisApiClient.post')
      td.when(post('/plugin/navigator/move', body)).thenResolve(response)
      td.replace(molgenisApiClient, 'post', post)

      expect((await api.moveResources(resources, folder))).toEqual(response)
    })

    it('should return alerts in case of errors', () => {
      const response:any = { errors: [ { message: 'error' } ] }
      const post = td.function('molgenisApiClient.post')
      td.when(post('/plugin/navigator/move', body)).thenReject(response)
      td.replace(molgenisApiClient, 'post', post)

      expect(api.moveResources(resources, folder)).rejects.toThrow(Error)
    })
  })

  describe('copyResources', () => {
    let body

    beforeEach(() => {
      body = {
        body: JSON.stringify({
          resources: [ { id: 'package0', type: 'PACKAGE' } ],
          targetFolderId: folderId
        })
      }
    })


    it('should call copy endpoint and return job on success', async () => {
      const response = {
        type: 'ResourceCopyJob',
        identifier: 'jobId',
        status: 'SUCCESS'
      }

      const post = td.function('molgenisApiClient.post')
      td.when(post('/plugin/navigator/copy', body)).thenResolve(response)
      td.replace(molgenisApiClient, 'post', post)

      const expectedjob = {
        type: 'COPY',
        id: 'jobId',
        status: 'SUCCESS',
        progress: undefined,
        progressMax: undefined,
        progressMessage: undefined,
        resultUrl: undefined
      }
      expect((await api.copyResources(resources, folder))).toEqual(expectedjob)
    })

    it('should return alerts in case of errors', () => {
      const response:any = { errors: [ { message: 'error' } ] }
      const post = td.function('molgenisApiClient.post')
      td.when(post('/plugin/navigator/copy', body)).thenReject(response)
      td.replace(molgenisApiClient, 'post', post)

      expect(api.copyResources(resources, folder)).rejects.toThrow(Error)
    })
  })

  describe('deleteResources', () => {
    let body

    beforeEach(() => {
      body = {
        body: JSON.stringify({
          resources: [ { id: 'package0', type: 'PACKAGE' } ]
        })
      }
    })

    it('should call download endpoint and return job on success', async () => {
      const response:any = {
        type: 'ResourceDeleteJob',
        identifier: 'jobId',
        status: 'SUCCESS'
      }

      const delete_ = td.function('molgenisApiClient.delete_')
      td.when(delete_('/plugin/navigator/delete', body)).thenResolve(response)
      td.replace(molgenisApiClient, 'delete_', delete_)

      const expectedjob = {
        type: 'DELETE',
        id: 'jobId',
        status: 'SUCCESS',
        progress: undefined,
        progressMax: undefined,
        progressMessage: undefined,
        resultUrl: undefined
      }
      expect((await api.deleteResources(resources))).toEqual(expectedjob)
    })

    it('should return alerts in case of errors', () => {
      const response = { errors: [ { message: 'error' } ] }
      const delete_ = td.function('molgenisApiClient.delete_')
      td.when(delete_('/plugin/navigator/delete', body)).thenResolve(response)
      td.replace(molgenisApiClient, 'delete_', delete_)

      expect(api.deleteResources(resources)).rejects.toThrow(Error)
    })
  })

  describe('deleteResources', () => {
    let body

    beforeEach(() => {
      body = {
        body: JSON.stringify({
          resources: [ { id: 'package0', type: 'PACKAGE' } ]
        })
      }
    })


    it('should call delete endpoint and do nothing on success', async () => {
      let response
      let delete_

      beforeEach(() => {
        response = 'OK'
        delete_ = td.function('molgenisApiClient.delete_')
        td.when(delete_('/plugin/navigator/delete', body)).thenResolve(response)
        td.replace(molgenisApiClient, 'delete_', delete_)
      })

      let res

      try {
        res = await api.deleteResources(resources)
      // eslint-disable-next-line no-empty
      } catch (err) {} finally {
        expect(res).toEqual(response)
      }
    })

    it('should return alerts in case of errors', () => {
      const response:any = { errors: [ { message: 'error' } ] }
      const delete_ = td.function('molgenisApiClient.delete_')
      td.when(delete_('/plugin/navigator/delete', body)).thenReject(response)
      td.replace(molgenisApiClient, 'delete_', delete_)

      expect(api.deleteResources(resources)).rejects.toThrow(Error)
    })
  })

  describe('downloadResources', () => {
    let body

    beforeEach(() => {
      body = {
        body: JSON.stringify({
          resources: [ { id: 'package0', type: 'PACKAGE' } ]
        })
      }
    })

    it('should call download endpoint and return job on success', async () => {
      const response = {
        type: 'ResourceDownloadJob',
        identifier: 'jobId',
        status: 'SUCCESS'
      }

      const post = td.function('molgenisApiClient.post')
      td.when(post('/plugin/navigator/download', body)).thenResolve(response)
      td.replace(molgenisApiClient, 'post', post)

      const expectedjob = {
        type: 'DOWNLOAD',
        id: 'jobId',
        status: 'SUCCESS',
        progress: undefined,
        progressMax: undefined,
        progressMessage: undefined,
        resultUrl: undefined
      }
      expect((await api.downloadResources(resources))).toEqual(expectedjob)
    })

    it('should return alerts in case of errors', () => {
      const response:any = { errors: [ { message: 'error' } ] }
      const post = td.function('molgenisApiClient.post')
      td.when(post('/plugin/navigator/download', body)).thenReject(response)
      td.replace(molgenisApiClient, 'post', post)

      expect(api.downloadResources(resources)).rejects.toThrow(Error)
    })
  })

  describe('createResource', () => {
    let body
    let post

    beforeEach(() => {
      body = {
        body: JSON.stringify({
          entities: [ { id: 'package0', label: 'package #0', parent: folderId } ]
        })
      }
      post = td.function('molgenisApiClient.post')
    })

    it('should create a new resource and do nothing on success', async () => {
      const response = 'OK'

      td.when(post('/api/v2/sys_md_Package', body)).thenResolve(response)
      td.replace(molgenisApiClient, 'post', post)

      expect((await api.createResource(resources[0], folder))).toEqual(response)
    })

    it('should return alerts in case of errors', () => {
      const response:any = { errors: [ { message: 'error' } ] }
      td.when(post('/api/v2/sys_md_Package', body)).thenReject(response)
      td.replace(molgenisApiClient, 'post', post)

      expect(api.createResource(resources[0], folder)).rejects.toThrow(Error)
    })
  })

  describe('updateResource', () => {
    let updatedResource
    let body
    let put

    beforeEach(() => {
      updatedResource = {
        type: 'PACKAGE',
        id: 'package0',
        label: 'updated package #0',
        readonly: false
      }
      body = {
        body: JSON.stringify({
          resource: { type: 'PACKAGE', id: 'package0', label: 'updated package #0', readonly: false }
        })
      }

      put = td.function('molgenisApiClient.put')
    })

    it('should call update endpoint and do nothing on success', async () => {
      const response = 'OK'
      td.when(put('/plugin/navigator/update', body)).thenResolve(response)
      td.replace(molgenisApiClient, 'put', put)

      expect((await api.updateResource(resources[0], updatedResource))).toEqual(response)
    })

    it('should return alerts in case of errors', () => {
      const response:any = { errors: [ { message: 'error' } ] }
      td.when(put('/plugin/navigator/update', body)).thenReject(response)
      td.replace(molgenisApiClient, 'put', put)

      expect(api.deleteResources(resources, updatedResource)).rejects.toThrow(Error)
    })
  })
})
