import actions from '@/store/header/actions'
import client from '@/lib/client'

jest.mock('@/lib/client', () => ({ get: jest.fn() }))

describe('header actions', () => {
  let commit: any = jest.fn()

  describe('getGroupTabels', () => {
    afterEach(() => {
      // @ts-ignore
      client.get.mockClear()
      commit.mockClear()
    })

    it('should fetch the data', async (done) => {
      const mockResp = {
        data: {
          items: [{ data: { id: 'id', label: 'label' } }]
        }
      }
      // @ts-ignore
      client.get.mockResolvedValue(mockResp)
      await actions.getGroupTabels({ commit }, { package: 'http://host/api/data/sys_md_Package/my-pack' })
      expect(commit).toHaveBeenCalledWith('setPackageTables', [{ id: 'id', label: 'label' }])
      done()
    })
  })

  describe('fetchBreadcrumbs', () => {
    describe('when no nagivator location or metaData has been set', () => {
      it('should not try to fetch the breadCrumbs', async () => {
        const rootState = {}
        const getters = {}
        await actions.fetchBreadcrumbs({ commit, getters, rootState })
        expect(client.get).not.toHaveBeenCalled()
      })
    })
    describe('when nagivator location have metaData has been set', () => {
      const getters = {
        navigatorLocation: 'some-location'
      }
      const rootState = {
        tableMeta: {
          id: 'my-table',
          label: 'my-table-label',
          package: 'my-package'
        }
      }

      beforeEach(() => {
        // @ts-ignore
        client.get.mockReset()
        commit.mockReset()
        // @ts-ignore
        client.get.mockResolvedValueOnce({
          data: {
            items: [{ data: { id: 'parent-id', label: 'parent-label', parent: { links: { self: 'self' } } } }]
          }
        })
        // @ts-ignore
        client.get.mockResolvedValueOnce({
          data: {
            items: [{ data: { id: 'grand-parent-id', label: 'grand-parent-label' } }]
          }
        })
      })

      it('should fetch the crumbs one by one, and update the state each time', async () => {
        await actions.fetchBreadcrumbs({ commit, getters, rootState })
        expect(commit).toHaveBeenCalledWith('addBreadcrumb', {
          id: 'my-table',
          label: 'my-table-label',
          link: 'some-location/my-table'
        })
        expect(commit).toHaveBeenCalledWith('addBreadcrumb', {
          id: 'parent-id',
          label: 'parent-label',
          link: 'some-location/parent-id'
        })
        expect(commit).toHaveBeenCalledWith('addBreadcrumb', {
          id: 'grand-parent-id',
          label: 'grand-parent-label',
          link: 'some-location/grand-parent-id'
        })
      })
    })
  })
})
