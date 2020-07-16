import axios from 'axios'
import store from '../store/store'
import applicationSettings from './applicationSettings'

const packageEndpoint = 'api/data/sys_md_Package'
const metaDataEndpoint = 'api/metadata'

async function createSettings () {
  if (!store.getters.hasEditRights) return { type: 'danger', message: 'Please login as administrator to initialize the application' }
  try {
    await axios.post(packageEndpoint, applicationSettings.packageSettings)
  } catch (error) { } // if it exists, axios gives error and stops executing.

  await axios.post(metaDataEndpoint, applicationSettings.entitySettings)
  return { type: 'success', message: 'The application has been succesfully initialized!' }
}

const BootstrapExplorer = async (): Promise<any | undefined> => {
  try {
    await axios.get('/api/data/app_set_DataExplorerEntitySettings')
  } catch (error) {
    const status = await createSettings()
    return status
  }
}

export default BootstrapExplorer
