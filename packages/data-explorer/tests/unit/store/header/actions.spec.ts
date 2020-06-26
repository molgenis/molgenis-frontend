import actions from '@/store/header/actions'
import client from '@/lib/client'

jest.mock('@/lib/client', () => ({ get: jest.fn() }))

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
      client.get.mockResolvedValue(mockResp)
      await actions.getGroupTabels({ commit }, { package: 'http://host/api/data/sys_md_Package/my-pack' })
      expect(commit).toHaveBeenCalledWith('setPackageTables', [{ id: 'id', label: 'label' }])
      done()
    })
  })
})
