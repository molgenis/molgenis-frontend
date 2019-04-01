import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import AttributeTree from 'components/generic-components/AttributeTree.vue'

describe('AttributeTree.vue', () => {
  it('flattens the attribute tree', () => {
    const attrTree = [
      {
        'id': '1',
        'name': 'id',
        'type': 'string',
        'children': []
      }, {
        'id': '2',
        'name': 'compound',
        'type': 'compound',
        'children': [
          {
            'id': '3',
            'name': 'nested_bool1',
            'type': 'bool',
            'parent': {
              'id': '2',
              'entity': {id: 'xxx', 'label': 'myBeautifulTestTable'}
            },
            'children': []
          },
          {
            'id': '4',
            'name': 'nested_bool2',
            'type': 'bool',
            'parent': {
              'id': '2',
              'entity': {id: 'xxx', 'label': 'myBeautifulTestTable'}
            },
            'children': [
              {
                'id': '5',
                'name': 'nested_nested_bool1',
                'type': 'bool',
                'parent': {
                  'id': '4',
                  'entity': {id: 'xxx', 'label': 'myBeautifulTestTable'}
                },
                'children': []
              }
            ]
          }
        ]
      }]
    const wrapper = mount(AttributeTree, {
      propsData: {
        attributeTree: attrTree,
        onAttributeSelect: function () {}
      }
    })
    const expected = [
      {
        'id': '1',
        'name': 'id',
        'type': 'string',
        'children': []
      }, {
        'id': '2',
        'name': 'compound',
        'type': 'compound',
        'children': [
          {
            'id': '3',
            'name': 'nested_bool1',
            'type': 'bool',
            'parent': {
              'id': '2',
              'entity': {id: 'xxx', 'label': 'myBeautifulTestTable'}
            },
            'children': []
          },
          {
            'id': '4',
            'name': 'nested_bool2',
            'type': 'bool',
            'parent': {
              'id': '2',
              'entity': {id: 'xxx', 'label': 'myBeautifulTestTable'}
            },
            'children': [
              {
                'id': '5',
                'name': 'nested_nested_bool1',
                'type': 'bool',
                'parent': {
                  'id': '4',
                  'entity': {id: 'xxx', 'label': 'myBeautifulTestTable'}
                },
                'children': []
              }
            ]
          }
        ]
      },
      {
        'id': '3',
        'name': 'nested_bool1',
        'type': 'bool',
        'parent': {
          'id': '2',
          'entity': {id: 'xxx', 'label': 'myBeautifulTestTable'}
        },
        'children': []
      },
      {
        'id': '4',
        'name': 'nested_bool2',
        'type': 'bool',
        'parent': {
          'id': '2',
          'entity': {id: 'xxx', 'label': 'myBeautifulTestTable'}
        },
        'children': [
          {
            'id': '5',
            'name': 'nested_nested_bool1',
            'type': 'bool',
            'parent': {
              'id': '4',
              'entity': {id: 'xxx', 'label': 'myBeautifulTestTable'}
            },
            'children': []
          }
        ]
      },
      {
        'id': '5',
        'name': 'nested_nested_bool1',
        'type': 'bool',
        'parent': {
          'id': '4',
          'entity': {id: 'xxx', 'label': 'myBeautifulTestTable'}
        },
        'children': []
      }
    ]
    wrapper.vm.createFlatTree(attrTree)
    const actual = wrapper.vm.$data.flatTree
    expect(actual).to.deep.equal(expected)
  })
})
