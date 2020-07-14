import Axios from 'axios'
import store from '../store/store'
import applicationSettings from './applicationSettings'

const packageEndpoint = 'api/data/sys_md_Package'
const metaDataEndpoint = 'api/metadata'

async function createSettings () {
  if (!store.getters.hasEditRights) store.dispatch('notifyUser', { type: 'danger', message: 'Please login as administrator to initialize the application' })

  try {
    await Axios.post(packageEndpoint, applicationSettings.packageSettings)
  } catch (error) { } // if it exists, Axios gives error and stops executing.

  await Axios.post(metaDataEndpoint, applicationSettings.entitySettings)
  store.dispatch('notifyUser', { type: 'success', message: 'The application has been succesfully initialized!' })
}

const BootstrapExplorer = async () => {
  let settingsTable: any = {}
  try {
    settingsTable = await Axios.get('/api/data/app_set_DataExplorerEntitySettings')
  } catch (error) { await createSettings() }
}

export default BootstrapExplorer
