import { shallowMount } from '@vue/test-utils'
import EntityCard from '@/components/DataView/EntityCard.vue'

describe('EntityCard.vue', () => {
  const clickShop = jest.fn()
  it('exists', () => {
    const wrapper = shallowMount(EntityCard, { propsData: { id: 'none' } })
    expect(wrapper.exists()).toBeTruthy()
  })

  it('add items to shoppingcart', () => {
    const wrapper = shallowMount(EntityCard, { propsData: { id: 'test', isSelected: false, isShop: true, clickShop } })
    wrapper.find('shopping-button-stub').trigger('click')
    expect(clickShop).toBeCalledTimes(1)
  })
})
