import Axios from 'axios'
import store from '../store/store'

function getSettingsUrl () {
  console.log('settingsurl')
  return `${window.location.href.replace(window.location.hash, '').replace('index.html', '')}config/settings.xlsx`
}

function setSettingsFormData (fileContents: string) {
  let formData = new FormData()
  let dataAsBlob = new Blob([fileContents], { type: 'application/xml' })
  formData.append('file', dataAsBlob, 'settings.xlsx')
  formData.append('action', 'ADD_UPDATE_EXISTING')
  formData.append('notify', 'false')
  return formData
}

function settingsByUrlFormdata () {
  console.log('settings form data')
  return `/plugin/importwizard/importByUrl?url=${getSettingsUrl()}`
}

const BootstrapExplorer = async () => {
  console.log('bootstrapping application')
  let versionNumberRequest = await Axios.get('/config/version.txt')
  const version = versionNumberRequest.data
  console.log('version number is', version)
  // check for table
  // if not then check user rights
  // const fileRequest = await Axios.get('/config/settings.xlsx')
  // const settingsFormData = setSettingsFormData(fileRequest.data)
  // console.log(fileRequest)
  const t = settingsByUrlFormdata()
  console.log(t)
  let x = await Axios.post(t)
  console.log('axios', x)

  // /plugin/importwizard/importByUrl?notify=false&entityTypeId=demo&url=http://localhost:8080/config/settings.xlsx
  if (store.getters.hasEditRights) { }

  // Axios.get('/config/settingstable.xlsx').then(t => console.log(t))
  let isSettingsTableAvailable = Axios.get('/api/metadata/root_hospital_patients?flattenAttributes=true').then(t =>
    console.log(t)
  )
}

export default BootstrapExplorer
