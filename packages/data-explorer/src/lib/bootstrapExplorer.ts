import store from '../store/store'
import applicationSettings from './applicationSettings'
import { silentClient } from './client'

const packageEndpoint = 'api/data/sys_md_Package'
const metaDataEndpoint = 'api/metadata'

async function createSettings () {
  if (store.getters.hasEditRights === true) {
    store.commit('setToast', { type: 'warning', message: 'Bootstrapping Data explorer' })
    try {
      await silentClient.post(packageEndpoint, applicationSettings.packageSettings)
    } catch (error) {
      // if the settings package already exists, axios gives error and stops executing.
    }
    try {
      await silentClient.post(metaDataEndpoint, applicationSettings.entitySettings)
    } catch (error) {
      // entity exists already
    }
    store.commit('setToast', { type: 'success', message: 'The application has been succesfully initialized!' })
  }
}

const bootstrapExplorer = async (): Promise<any | undefined> => {
  try {
    await silentClient.get('/api/data/app_set_DataExplorerEntitySettings')
  } catch (error) {
    await createSettings()
  }
}

export default bootstrapExplorer
