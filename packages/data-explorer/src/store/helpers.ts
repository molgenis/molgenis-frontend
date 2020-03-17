import { FilterGroup } from '@/types/ApplicationState'

export const getErrorMessage = (response: any) =>
  response.errors
    ? response.errors[0].code
      ? `${response.errors[0].message} (${response.errors[0].code})`
      : response.errors[0].message
    : response.status
      ? response.statusText
        ? `${response.statusText} (${response.status})`
        : `Error status: ${response.status}`
      : response.message
        ? response.message
        : 'Unknown error'

export const tryAction = (action: any): any =>
  (context: any, payload: any) =>
    action(context, payload).catch(
      (error: any) => context.commit('setToast', { message: getErrorMessage(error), type: 'danger' }))

export const encodeBookmark = (filters: FilterGroup) => {
  let output = ''

  if (filters.shown && filters.shown.length > 0) output += `${filters.shown.join(',')}`
  if (filters.selections && filters.selections.length > 0) output += `&selections=${filters.selections.join(',')}`

  return encodeURI(output)
}

export const decodeBookmark = (query: any) => {
  let output: any = {}
  const filters = query.filters
  const selections = query.selections
  if (filters) { output.shown = filters.split(',') }

  if (selections) { output.selections = selections }
  return output
}
