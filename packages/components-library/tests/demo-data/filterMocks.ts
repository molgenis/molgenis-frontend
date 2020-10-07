export const fruitOptions = [
  { text: 'Orange', value: 'orange' },
  { text: 'Apple', value: 'apple' },
  { text: 'Pineapple', value: 'pineapple' },
  { text: 'Grape', value: 'grape' },
  { text: 'Melon', value: 'melon' },
  { text: 'Kiwi', value: 'kiwi' },
  { text: 'Blueberry', value: 'blueberry' },
  { text: 'Pear', value: 'pear' },
  { text: 'Apricot', value: 'apricot' },
  { text: 'Mango', value: 'mango' },
  { text: 'Breadfruit', value: 'breadfruit' },
  { text: 'Cherry', value: 'cherry' },
  { text: 'Cranberry', value: 'cranberry' },
  { text: 'Durian', value: 'durian' },
  { text: 'Guava', value: 'guava' },
  { text: 'Papaya', value: 'papaya' }
]

export const fruitOptionsFunction = () => Promise.resolve(fruitOptions)

export const booleanOptions = [
  { value: 'no', text: 'No' },
  { value: 'yes', text: 'Yes' }
]

export const colorOptions = [
  { value: 'red', text: 'Red' },
  { value: 'green', text: 'Green' },
  { value: 'blue', text: 'Blue' },
  { value: 'yellow', text: 'Yellow' },
  { value: 'white', text: 'White' },
  { value: 'purple', text: 'Purple' },
  { value: 'black', text: 'Black' }
]

export const multiFilterOptions = ({ count, query }: {count?: number; query?: string}) => {
  return new Promise((resolve) => {
    let filteredOptions = [...fruitOptions] // keep original unfiltered to use as mock data-store
    if (query) {
      const queryItems = query.toLowerCase().split(',').filter(i => i)
      filteredOptions = filteredOptions.filter((option) => {
        return queryItems.some((i) => option.value.includes(i))
      })
    }
    if (count) {
      filteredOptions = filteredOptions.splice(0, count)
    }

    resolve(filteredOptions)
  })
}

export const filters = [
  {
    name: 'name',
    label: 'Label',
    description: 'description',
    collapsed: false
  },
  {
    name: 'datetime',
    label: 'Datetime',
    collapsed: false,
    max: null,
    min: null,
    opens: 'right',
    range: true,
    time: false,
    type: 'date-time-filter',
    value: ['01/03/2037', '01/03/2038']
  },
  {
    name: 'age',
    label: 'Age',
    collapsed: false,
    min: -10,
    max: 10,
    step: 0.01,
    type: 'range-filter'
  },
  {
    name: 'fruit',
    label: 'Filter with multiple options',
    collapsed: false,
    options: multiFilterOptions,
    initialDisplayItems: 5,
    type: 'multi-filter'
  },
  {
    name: 'compound-id',
    label: 'compound',
    description: 'Compound description of a compound',
    type: 'compound-title',
    collapsable: false
  },
  {
    name: 'search',
    label: 'Search',
    description: 'search by string',
    placeholder: 'placeholder',
    type: 'string-filter',
    collapsable: false,
    compound: 'compound-id'
  },
  {
    name: 'color',
    label: 'Color',
    collapsed: false,
    bulkOperation: true,
    options: () => {
      return new Promise(
        function (resolve) {
          resolve(colorOptions)
        })
    },
    type: 'checkbox-filter',
    compound: 'compound-id'
  },
  {
    name: 'number',
    label: 'Number',
    collapsed: false,
    type: 'number-filter',
    compound: 'compound-id'
  },
  {
    name: 'name1',
    label: 'Name',
    description: 'Name of object',
    type: 'string-filter',
    collapsed: false
  },
  {
    name: 'string',
    label: 'String',
    description: 'search by string',
    placeholder: 'placeholder',
    type: 'string-filter',
    collapsable: true,
    collapsed: false
  },
  {
    name: 'checkbox',
    label: 'Checkbox',
    collapsed: false,
    bulkOperation: true,
    maxVisibleOptions: 1,
    options: () => {
      return new Promise(
        function (resolve) {
          resolve(colorOptions)
        })
    },
    type: 'checkbox-filter'
  },
  {
    name: 'checkbox-options',
    label: 'Checkbox lots of options',
    collapsed: false,
    bulkOperation: true,
    maxVisibleOptions: 1,
    options: () => {
      return new Promise(
        function (resolve) {
          resolve(fruitOptions)
        })
    },
    type: 'checkbox-filter'
  },
  {
    name: 'long-name',
    label: 'Way too long name to really fit in the user interface',
    collapsed: true,
    bulkOperation: true,
    options: () => {
      return new Promise(
        function (resolve) {
          resolve(booleanOptions)
        })
    },
    type: 'checkbox-filter'
  }
]
