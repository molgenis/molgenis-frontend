import api from '@molgenis/molgenis-api-client'
import { AlertError } from './AlertError'

const NAVIGATOR_URI = '/plugin/navigator'
const REST_API_V2 = '/api/v2'

export function fetchJob (job) {
  const uri = REST_API_V2 + '/' + toApiJobEntityType(job) + '/' + job.id
  return api.get(uri).catch(throwAlertError).then(toJob)
}

export function getResourcesByFolderId (folderId) {
  const uri = folderId ? NAVIGATOR_URI + '/get?folderId=' + encodeURIComponent(
    folderId) : NAVIGATOR_URI + '/get'
  return api.get(uri).catch(throwAlertError).then(toFolderState)
}

export function getResourcesByQuery (query) {
  const uri = NAVIGATOR_URI + '/search?query=' + encodeURIComponent(query)
  return api.get(uri).catch(throwAlertError).then(toFolderState)
}

export function createResource (resource, folder) {
  let promise
  if (resource.type === 'PACKAGE') {
    const packageEntity = toApiPackage(resource)
    packageEntity.parent = folder ? folder.id : null

    const uri = REST_API_V2 + '/sys_md_Package'
    const options = {
      body: JSON.stringify({ entities: [packageEntity] })
    }
    promise = api.post(uri, options).catch(throwAlertError)
  } else {
    promise = Promise.resolve()
  }
  return promise
}

export function updateResource (resource, updatedResource) {
  return api.put(NAVIGATOR_URI + '/update', {
    body: JSON.stringify({
      resource: toApiResource(updatedResource)
    })
  }).catch(throwAlertError)
}

export function downloadResources (resources) {
  return api.post(NAVIGATOR_URI + '/download', {
    body: JSON.stringify({
      resources: resources.map(resource => toApiResourceIdentifier(resource))
    })
  }).catch(throwAlertError).then(toJob)
}

export function deleteResources (resources) {
  return api.delete_(NAVIGATOR_URI + '/delete', {
    body: JSON.stringify({
      resources: resources.map(resource => toApiResourceIdentifier(resource))
    })
  }).catch(throwAlertError).then(toJob)
}

export function copyResources (resources, folder) {
  return api.post(NAVIGATOR_URI + '/copy', {
    body: JSON.stringify({
      resources: resources.map(resource => toApiResourceIdentifier(resource)),
      targetFolderId: folder ? folder.id : null
    })
  }).catch(throwAlertError).then(toJob)
}

export function moveResources (resources,
  folder) {
  return api.post(NAVIGATOR_URI + '/move', {
    body: JSON.stringify({
      resources: resources.map(resource => toApiResourceIdentifier(resource)),
      targetFolderId: folder ? folder.id : null
    })
  }).catch(throwAlertError)
}

// map API types to navigator types
function toFolderState (response) {
  return response
}

function toJob (response) {
  return {
    type: toJobType(response),
    id: response.identifier,
    status: toJobStatus(response),
    progress: response.progressInt,
    progressMax: response.progressMax,
    progressMessage: response.progressMessage,
    resultUrl: response.resultUrl
  }
}

function toJobType (response) {
  let type
  switch (response.type) {
    case 'ResourceCopyJob':
      type = 'COPY'
      break
    case 'ResourceDownloadJob':
      type = 'DOWNLOAD'
      break
    case 'ResourceDeleteJob':
      type = 'DELETE'
      break
    default:
      throw new Error('Unknown job type \'' + response._meta.name + '\'')
  }
  return type
}

function toJobStatus (response) {
  let jobStatus
  switch (response.status) {
    case 'PENDING':
    case 'RUNNING':
      jobStatus = 'RUNNING'
      break
    case 'SUCCESS':
      jobStatus = 'SUCCESS'
      break
    case 'FAILED':
    case 'CANCELED':
      jobStatus = 'FAILED'
      break
    default:
      throw new Error('unexpected job status \'' + response.status + '\'')
  }
  return jobStatus
}

function throwAlertError (response) {
  const alerts = response.errors.map(
    error => ({ type: 'ERROR', message: error.message, code: error.code }))
  throw new AlertError(alerts)
}

// map navigator types to API types
function toApiResource (resource) {
  return resource
}

function toApiResourceIdentifier (resource) {
  return {
    id: resource.id,
    type: resource.type
  }
}

function toApiPackage (resource) {
  return {
    id: resource.id,
    label: resource.label,
    description: resource.description,
    parent: undefined
  }
}

function toApiJobEntityType (job) {
  let apiType
  switch (job.type) {
    case 'COPY':
      apiType = 'sys_job_ResourceCopyJobExecution'
      break
    case 'DOWNLOAD':
      apiType = 'sys_job_ResourceDownloadJobExecution'
      break
    case 'DELETE':
      apiType = 'sys_job_ResourceDeleteJobExecution'
      break
    default:
      throw new Error('unexpected job type \'' + job.type + '\'')
  }
  return apiType
}
