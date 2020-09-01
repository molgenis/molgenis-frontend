import bootstrapExplorer from '@/lib/bootstrapExplorer'
import { silentClient } from '@/lib/client'
import store from '@/store/store'
import applicationSettings from '@/lib/applicationSettings'

silentClient.get = jest.fn()
silentClient.post = jest.fn()

jest.mock('@/store/store', () => ({
  commit: jest.fn(),
  getters: { hasEditRights: jest.fn() }
}))

describe('bootstrapExplorer.ts', () => {
  it('checks if table exists', async (done) => {
    await bootstrapExplorer()
    expect(silentClient.get).toBeCalledWith('/api/data/app_set_DataExplorerEntitySettings')
    done()
  })
  it('only adds data when user has edit rights', async (done) => {
    store.getters.hasEditRights = false
    silentClient.get = jest.fn(() => {
      return new Promise((resolve, reject) => reject(new Error()))
    })

    await bootstrapExplorer()
    expect(store.commit).not.toBeCalled()
    done()
  })

  it('adds data if the table does not exist', async (done) => {
    store.getters.hasEditRights = true
    await bootstrapExplorer()
    expect(silentClient.post).toBeCalledWith('api/data/sys_md_Package', applicationSettings.packageSettings)
    expect(silentClient.post).toBeCalledWith('api/metadata', applicationSettings.entitySettings)
    done()
  })
})
