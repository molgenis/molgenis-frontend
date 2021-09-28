import { filterObjectOnStringProperties } from '../../../src/logic/filter'

let objectsArrayToFilter

describe('filter.js', () => {
  beforeEach(() => {
    objectsArrayToFilter = [{
      name: 'Harry',
      role: 'student'
    }, {
      name: 'Ron',
      role: 'student'
    }, {
      name: 'Dumbledor',
      role: 'teacher',
      perk: 'Full wizard'
    },
    {
      name: 'Perkins',
      role: 'janitor'
    }]
  })

  it('can filter a list on a property that contains a string', () => {
    const filteredResult = filterObjectOnStringProperties(objectsArrayToFilter, ['name', 'role', 'perks'], 'stude')
    expect(filteredResult).toStrictEqual([{
      name: 'Harry',
      role: 'student'
    }, {
      name: 'Ron',
      role: 'student'
    }])
  })

  it('can filter a list if a property exists and/or it matches with a property value', () => {
    const filteredResult = filterObjectOnStringProperties(objectsArrayToFilter, ['name', 'role', 'perk'], 'perk', ['perk'])

    expect(filteredResult).toStrictEqual([{
      name: 'Dumbledor',
      role: 'teacher',
      perk: 'Full wizard'
    }, {
      name: 'Perkins',
      role: 'janitor'
    }])
  })
})
