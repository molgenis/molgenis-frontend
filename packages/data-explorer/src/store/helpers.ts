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
