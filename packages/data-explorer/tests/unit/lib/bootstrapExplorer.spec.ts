import BootstrapExplorer from '../../../src/lib/bootstrapExplorer'
import axios from 'axios'
import store from '@/store/store'
import applicationSettings from '../../../src/lib/applicationSettings'

jest.mock('axios')
jest.mock('@/store/store')

describe('bootstrapExplorer.ts', () => {
  it('checks if table exists', async (done) => {
    await BootstrapExplorer()
    expect(axios.get).toBeCalledWith('/api/data/app_set_DataExplorerEntitySettings')
    done()
  })
  it('only adds data when user has edit rights', async (done) => {
    axios.get = jest.fn(() => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const status = await BootstrapExplorer()
    expect(status.message).toBe('Please login as administrator to initialize the application')
    done()
  })

  it('adds data if the table does not exist', async (done) => {
    store.getters.hasEditRights = jest.fn(() => true)
    axios.get = jest.fn(() => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    await BootstrapExplorer()
    expect(axios.post).toBeCalledWith('api/data/sys_md_Package', applicationSettings.packageSettings)
    expect(axios.post).toBeCalledWith('api/metadata', applicationSettings.entitySettings)
    done()
  })
})
