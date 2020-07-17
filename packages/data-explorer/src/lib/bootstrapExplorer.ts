import client from './client'
import store from '../store/store'
import applicationSettings from './applicationSettings'

const packageEndpoint = 'api/data/sys_md_Package'
const metaDataEndpoint = 'api/metadata'

async function createSettings () {
  if (!store.getters.hasEditRights) return { type: 'danger', message: 'Please login as administrator to initialize the application' }
  try {
    await client.post(packageEndpoint, applicationSettings.packageSettings)
  } catch (error) { } // if it exists, axios gives error and stops executing.

  await client.post(metaDataEndpoint, applicationSettings.entitySettings)
  return { type: 'success', message: 'The application has been succesfully initialized!' }
}

const bootstrapExplorer = async (): Promise<any | undefined> => {
  try {
    await client.get('/api/data/app_set_DataExplorerEntitySettings')
  } catch (error) {
    store.dispatch('notifyUser', { messageType: 'warning', message: 'Bootstrapping Data explorer' })
    const status = await createSettings()
    store.dispatch('notifyUser', { messageType: status.type, message: status.message })
  }
}

export default bootstrapExplorer
