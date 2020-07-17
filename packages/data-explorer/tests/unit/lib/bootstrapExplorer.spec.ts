import bootstrapExplorer from '../../../src/lib/bootstrapExplorer'
import client from '../../../src/lib/client'
import store from '@/store/store'
import applicationSettings from '../../../src/lib/applicationSettings'

jest.mock('../../../src/lib/client')
jest.mock('@/store/store')

describe('bootstrapExplorer.ts', () => {
  it('checks if table exists', async (done) => {
    await bootstrapExplorer()
    expect(client.get).toBeCalledWith('/api/data/app_set_DataExplorerEntitySettings')
    done()
  })
  it('only adds data when user has edit rights', async (done) => {
    client.get = jest.fn(() => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    store.commit = jest.fn()

    await bootstrapExplorer()
    expect(store.commit).toHaveBeenCalledWith('setToast', { type: 'danger', message: 'Please login as administrator to initialize the application' })
    done()
  })

  it('adds data if the table does not exist', async (done) => {
    store.getters.hasEditRights = jest.fn(() => true)
    client.get = jest.fn(() => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    await bootstrapExplorer()
    expect(client.post).toBeCalledWith('api/data/sys_md_Package', applicationSettings.packageSettings)
    expect(client.post).toBeCalledWith('api/metadata', applicationSettings.entitySettings)
    done()
  })
})
