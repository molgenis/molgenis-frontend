// @ts-ignore
import api from '@molgenis/molgenis-api-client'

const flattenCompounds = (fields: any[]) => {
  return fields.reduce((accum: any[], f: { type: string; children: any }) => {
    if (f.type === 'field-group') {
      accum = accum.concat(flattenCompounds(f.children))
    } else {
      accum.push(f)
    }
    return accum
  }, [])
}

const isFileIncluded = (formData: { [x: string]: any }, formFields: any) => {
  const flattendFields = flattenCompounds(formFields)
  const fieldsWithFile = flattendFields
    .filter((field: { type: string }) => field.type === 'file')
    .find((field: { id: string | number }) => typeof formData[field.id] !== 'string')

  return !!fieldsWithFile
}

export const appendToForm = (fields: any[], formData: FormData, [ key, value ]: [string, unknown]) => {
  const isFile = value && fields.find((field: { id: any; type: string }) => field.id === key && field.type === 'file' && typeof value !== 'string')
  if (isFile) {
    // @ts-ignore
    formData.append(key, value, value.name)
  } else {
    // @ts-ignore
    const stringValue: string = value === undefined || value === null ? '' : value
    formData.append(key, stringValue)
  }
}

const buildFormData = (data: { [s: string]: unknown } | ArrayLike<unknown>, fields: any) => {
  const formData = new FormData()
  const flattendFields = flattenCompounds(fields)
  Object.entries(data).forEach((pair) => appendToForm(flattendFields, formData, pair))
  return formData
}

const doPost = (uri: string, formData: any, formFields: any) => {
  const containsFileData = isFileIncluded(formData, formFields)
  const options = {
    headers: {
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    },
    body: containsFileData ? buildFormData(formData, formFields) : JSON.stringify(formData),
    method: 'POST',
    credentials: 'same-origin'
  }

  return api.post(uri, options, containsFileData)
}

/**
 * Fetch for edit-response mixes data and metadata,
 * this function creates a new object with separate properties for data and metadata, similar to the
 * fetch for create response
 * @param response
 * @returns Promise{{meta: *, rowData: *}}
 */
const parseEditResponse = (response: { [x: string]: any; _meta: any }) => {
  const { _meta, ...rowData } = response
  return Promise.resolve({ meta: _meta, rowData: rowData })
}

const fetchForCreate = (tableId: string) => api.get('/api/v2/' + tableId + '?num=0')

const fetchForUpdate = (tableId: string, rowId: string) => {
  return api.get('/api/v2/' + tableId + '/' + rowId).then((response: any) => parseEditResponse(response))
}

const create = (formData: any, formFields: any, tableId: string) => {
  return doPost('/api/v1/' + tableId + '?_method=PUT', formData, formFields)
}

const update = (formData: any, formFields: any, tableId: string, rowId: string) => {
  return doPost('/api/v1/' + tableId + '/' + rowId + '?_method=PUT', formData, formFields)
}

const save = async (formData: any, formFields: any, tableId: any, rowId: null | string) => {
  return rowId === null ? create(formData, formFields, tableId) : update(formData, formFields, tableId, rowId)
}

const fetch = (tableId: any, rowId: null | string) => rowId === null ? fetchForCreate(tableId) : fetchForUpdate(tableId, rowId)

const fetchOption = async (location: string) => api.get(location)

export {
  save, fetch, fetchOption
}
