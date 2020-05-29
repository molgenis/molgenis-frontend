import actions from '@/store/header/actions'
import axios from 'axios'

jest.mock('axios', () => ({ get: jest.fn() }))

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
      axios.get.mockResolvedValue(mockResp)
      await actions.getGroupTabels({ commit }, { package: 'http://host/api/data/sys_md_Package/my-pack' })
      expect(commit).toHaveBeenCalledWith('setPackageTables', [{ id: 'id', label: 'label' }])
      done()
    })
  })
})
