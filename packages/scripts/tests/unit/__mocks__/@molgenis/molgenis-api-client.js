import * as schemas from '../../test-schemas'

export default {
  get: (value) => {
    if (value === '/api/v2/sys_scr_ScriptType?num=10000') return Promise.resolve(schemas.ScriptType)
    if (value === '/api/v2/sys_scr_Script?num=10000') return Promise.resolve(schemas.Script)
  }
}
