// @ts-ignore
import api from '@molgenis/molgenis-api-client'
import actions from '@/store/actions'

jest.mock('@molgenis/molgenis-api-client', () => {
  return {
    post: jest.fn(),
    get: jest.fn(),
    delete_: jest.fn(),
    postFile: jest.fn()
  }
})

describe('actions', () => {
  const state: any = {}

  const context = {
    state,
    commit: jest.fn(),
    dispatch: jest.fn(),
    getters: jest.fn()
  }

  describe('ACTIVATE_APP', () => {
    it('should dispatch FETCH_APPS on successful get request', async (done) => {
      api.post.mockResolvedValueOnce()
      await actions.ACTIVATE_APP(context, 'test_id')
      expect(context.dispatch).toBeCalledWith('FETCH_APPS')
      done()
    })

    it('should commit SET_ERROR on failed post request', async (done) => {
      api.post.mockRejectedValueOnce('failed get request')
      await actions.ACTIVATE_APP(context, 'test_id')
      expect(context.commit).toBeCalledWith('SET_ERROR', 'failed get request')
      done()
    })
  })

  describe('DEACTIVATE_APP', () => {
    it('should dispatch FETCH_APPS on successful get request', async (done) => {
      api.post.mockResolvedValueOnce()
      await actions.DEACTIVATE_APP(context, 'test_id')
      expect(context.dispatch).toBeCalledWith('FETCH_APPS')
      done()
    })

    it('should commit SET_ERROR on failed post request', async (done) => {
      api.post.mockRejectedValueOnce('failed post request')
      await actions.DEACTIVATE_APP(context, 'test_id')
      expect(context.commit).toBeCalledWith('SET_ERROR', 'failed post request')
      done()
    })
  })

  describe('DELETE_APP', () => {
    it('should dispatch FETCH_APPS on successful delete request', async (done) => {
      api.delete_.mockResolvedValueOnce()
      await actions.DELETE_APP(context, 'test_id')
      expect(context.dispatch).toBeCalledWith('FETCH_APPS')
      done()
    })

    it('should commit SET_ERROR on failed get request', async (done) => {
      api.delete_.mockRejectedValueOnce('failed delete request')
      await actions.DELETE_APP(context, 'test_id')
      expect(context.commit).toBeCalledWith('SET_ERROR', 'failed delete request')
      done()
    })
  })

  describe('FETCH_APPS', () => {
    it('should commit UPDATE_APPS and SET_LOADING on successful get request', async (done) => {
      const apps = [{ name: 'app1' }, { name: 'app2' }]
      api.get.mockResolvedValueOnce(apps)
      await actions.FETCH_APPS(context)
      expect(context.commit).toBeCalledWith('UPDATE_APPS', apps)
      expect(context.commit).toBeCalledWith('SET_LOADING', false)
      done()
    })

    it('should commit SET_ERROR on failed get request', async (done) => {
      api.get.mockRejectedValueOnce('failed get request')
      await actions.FETCH_APPS(context)
      expect(context.commit).toBeCalledWith('SET_ERROR', 'failed get request')
      done()
    })
  })

  describe('UPLOAD_APP', () => {
    let updateObject: {
      id: string;
      file: File;
      updateConfig: boolean;
    }

    beforeEach(() => {
      updateObject = {
        id: '1337',
        file: new File([], 'file'),
        updateConfig: false
      }
    })

    it('should dispatch FETCH_APPS on successful post request', async (done) => {
      api.postFile.mockResolvedValueOnce()
      await actions.UPDATE_APP(context, updateObject)

      expect(api.postFile).toHaveBeenCalledWith('/plugin/appmanager/update/1337', updateObject.file)
      expect(context.dispatch).toBeCalledWith('FETCH_APPS')
      done()
    })

    it('should add query parameter on postFile when updateConfig set to true', async (done) => {
      updateObject.updateConfig = true
      api.postFile.mockResolvedValueOnce()
      await actions.UPDATE_APP(context, updateObject)

      expect(api.postFile).toHaveBeenCalledWith('/plugin/appmanager/update/1337?updateConfig=true', updateObject.file)
      expect(context.dispatch).toBeCalledWith('FETCH_APPS')
      done()
    })

    it('should commit SET_ERROR on failed post request', async (done) => {
      api.postFile.mockRejectedValueOnce('failed post request')
      await actions.UPDATE_APP(context, updateObject)
      expect(context.commit).toBeCalledWith('SET_ERROR', 'failed post request')
      done()
    })
  })

  describe('UPDATE_APP', () => {
    it('should dispatch FETCH_APPS on successful post request', async (done) => {
      api.postFile.mockResolvedValueOnce()
      const file = new File([], 'file')
      await actions.UPLOAD_APP(context, file)
      expect(context.dispatch).toBeCalledWith('FETCH_APPS')
      done()
    })

    it('should commit SET_ERROR on failed post request', async (done) => {
      const file = new File([], 'file')
      api.postFile.mockRejectedValueOnce('failed post request')
      await actions.UPLOAD_APP(context, file)
      expect(context.commit).toBeCalledWith('SET_ERROR', 'failed post request')
      done()
    })
  })
})
