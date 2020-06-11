import actions from '@/store/header/actions'
import api from '@/lib/api'

jest.mock('@/lib/api', () => ({ get: jest.fn() }))

describe('header actions', () => {
  let commit: any = jest.fn()

  describe('getGroupTabels', () => {
    it('should fetch the data', async (done) => {
      const mockResp = {
        data: {
          items: [{ data: { id: 'id', label: 'label' } }]
        }
      }
      // @ts-ignore
      api.get.mockResolvedValue(mockResp)
      await actions.getGroupTabels({ commit }, { package: 'http://host/api/data/sys_md_Package/my-pack' })
      expect(commit).toHaveBeenCalledWith('setPackageTables', [{ id: 'id', label: 'label' }])
      done()
    })
  })
})
