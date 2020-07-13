import Axios from 'axios'
import store from '../store/store'

const emx = 'settings.xlsx'
const action = 'ADD_UPDATE_EXISTING'
const currentAppLocationUrl = `${window.location.href.replace(window.location.hash, '').replace('/index.html', '')}`
const settingsLocationUrl = `${currentAppLocationUrl}/config/${emx}`
const molgenisSettingsEndpoint = `/plugin/importwizard/importByUrl?url=${settingsLocationUrl}&action=${action}`

// https://preview-frontend-pr-325-6.dev.molgenis.org/menu/main/dataexplorer?entity=plugin_data_data_explorer_entity_settings&hideselect=true

const BootstrapExplorer = async () => {
  let beforeSettings = Axios.get('/api/metadata/plugin_data_data_explorer_entity_settings').then(t =>
    console.log('check before', t)
  )
  // console.log('bootstrapping application')
  // let versionNumberRequest = await Axios.get('/config/version.txt') // this does not work on the server
  // const version = versionNumberRequest.data
  // console.log('version number is', version)
  // check for table
  // if not then check user rights
  // const fileRequest = await Axios.get('/config/settings.xlsx')
  // const settingsFormData = setSettingsFormData(fileRequest.data)
  // console.log(fileRequest)
  let x = await Axios.post(molgenisSettingsEndpoint).catch(e => console.log(e))
  console.log('Settings post:', x)

  // /plugin/importwizard/importByUrl?notify=false&entityTypeId=demo&url=http://localhost:8080/config/settings.xlsx
  if (store.getters.hasEditRights) { }

  // Axios.get('/config/settingstable.xlsx').then(t => console.log(t))
  let isSettingsTableAvailable = Axios.get('/api/metadata/plugin_data_data_explorer_entity_settings').then(t =>
    console.log('check after', t)
  )
}

export default BootstrapExplorer
