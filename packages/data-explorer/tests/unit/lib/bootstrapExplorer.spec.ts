import bootstrapExplorer from '@/lib/bootstrapExplorer'
import client from '@/lib/client'
import store from '@/store/store'
import applicationSettings from '@/lib/applicationSettings'

jest.mock('@/lib/client', () => ({
  post: jest.fn(),
  get: jest.fn()
}))

jest.mock('@/store/store', () => ({
  commit: jest.fn(),
  getters: { hasEditRights: jest.fn() }
}))

describe('bootstrapExplorer.ts', () => {
  it('checks if table exists', async (done) => {
    await bootstrapExplorer()
    expect(client.get).toBeCalledWith('/api/data/app_set_DataExplorerEntitySettings')
    done()
  })
  it('only adds data when user has edit rights', async (done) => {
    store.getters.hasEditRights = false
    client.get = jest.fn(() => {
      return new Promise((resolve, reject) => reject(new Error()))
    })

    await bootstrapExplorer()
    expect(store.commit).toHaveBeenCalledWith('setToast', { type: 'danger', message: 'Please login as administrator to initialize the application' })
    done()
  })

  it('adds data if the table does not exist', async (done) => {
    store.getters.hasEditRights = true
    await bootstrapExplorer()
    expect(client.post).toBeCalledWith('api/data/sys_md_Package', applicationSettings.packageSettings)
    expect(client.post).toBeCalledWith('api/metadata', applicationSettings.entitySettings)
    done()
  })
})
