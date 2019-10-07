module.exports = {
    href: '/api/v2/root_cities',
    meta: {
      href: '/api/v2/root_cities',
      hrefCollection: '/api/v2/root_cities',
      name: 'root_cities',
      label: 'Cities',
      description: 'list of cities, located in package root, so other companies can use the same "root" package and use the same entities',
      attributes: [
        {
          href: '/api/v2/root_cities/meta/cityName',
          fieldType: 'STRING',
          name: 'cityName',
          label: 'cityName',
          description: 'unique city name',
          attributes: [],
          maxLength: 255,
          auto: false,
          nillable: false,
          readOnly: true,
          labelAttribute: false,
          unique: true,
          visible: true,
          lookupAttribute: false,
          isAggregatable: false
        },
        {
          href: '/api/v2/root_cities/meta/lat',
          fieldType: 'DECIMAL',
          name: 'lat',
          label: 'lat',
          description: 'latitude in degrees',
          attributes: [],
          auto: false,
          nillable: true,
          readOnly: false,
          labelAttribute: false,
          unique: false,
          visible: true,
          lookupAttribute: false,
          isAggregatable: false
        },
        {
          href: '/api/v2/root_cities/meta/lng',
          fieldType: 'DECIMAL',
          name: 'lng',
          label: 'lng',
          description: 'longitude in degrees',
          attributes: [],
          auto: false,
          nillable: true,
          readOnly: false,
          labelAttribute: false,
          unique: false,
          visible: true,
          lookupAttribute: false,
          isAggregatable: false
        },
        {
          href: '/api/v2/root_cities/meta/label',
          fieldType: 'STRING',
          name: 'label',
          label: 'label',
          description: 'the label of the city',
          attributes: [],
          maxLength: 255,
          auto: false,
          nillable: false,
          readOnly: false,
          labelAttribute: true,
          unique: false,
          visible: true,
          lookupAttribute: true,
          isAggregatable: false
        },
        {
          href: '/api/v2/root_cities/meta/country',
          fieldType: 'STRING',
          name: 'country',
          label: 'country',
          description: 'the country the city is in',
          attributes: [],
          maxLength: 255,
          auto: false,
          nillable: false,
          readOnly: false,
          labelAttribute: false,
          unique: false,
          visible: true,
          lookupAttribute: false,
          isAggregatable: false
        }
      ],
      labelAttribute: 'label',
      idAttribute: 'cityName',
      lookupAttributes: [
        'label'
      ],
      isAbstract: false,
      writable: true,
      languageCode: 'en',
      permissions: [
        'AGGREGATE_DATA',
        'READ_DATA',
        'READ_METADATA',
        'UPDATE_DATA',
        'DELETE_DATA',
        'UPDATE_METADATA',
        'DELETE_METADATA',
        'COUNT_DATA',
        'ADD_DATA'
      ]
    },
    start: 0,
    num: 100,
    total: 23,
    items: [
      {
        _href: '/api/v2/root_cities/another_place',
        cityName: 'another_place',
        label: 'Another place',
        country: 'Somewhere'
      },
      {
        _href: '/api/v2/root_cities/chicago',
        cityName: 'chicago',
        label: 'Chicago, Illinois',
        country: 'United States'
      },
      {
        _href: '/api/v2/root_cities/danville',
        cityName: 'danville',
        label: 'Danville',
        country: 'United States'
      },
      {
        _href: '/api/v2/root_cities/doofania',
        cityName: 'doofania',
        label: 'Doofania',
        country: 'United States'
      },
      {
        _href: '/api/v2/root_cities/far_far_away',
        cityName: 'far_far_away',
        label: 'Giant Town',
        country: 'Far far away'
      },
      {
        _href: '/api/v2/root_cities/geneve',
        cityName: 'geneve',
        label: 'Genève',
        country: 'Switzerland'
      },
      {
        _href: '/api/v2/root_cities/gimelschtump',
        cityName: 'gimelschtump',
        label: 'Gimelshtump',
        country: 'Drusselstein'
      },
      {
        _href: '/api/v2/root_cities/godrics_hollow',
        cityName: 'godrics_hollow',
        label: 'Godric\'s Hollow',
        country: 'England'
      },
      {
        _href: '/api/v2/root_cities/here',
        cityName: 'here',
        label: 'Here',
        country: 'Here'
      },
      {
        _href: '/api/v2/root_cities/highlands',
        cityName: 'highlands',
        label: 'Highlands',
        country: 'Scotland'
      },
      {
        _href: '/api/v2/root_cities/hyncice',
        cityName: 'hyncice',
        label: 'Hynčice',
        country: 'Czech Republic'
      },
      {
        _href: '/api/v2/root_cities/lassiter',
        cityName: 'lassiter',
        label: 'Lassiter',
        country: 'United States'
      },
      {
        _href: '/api/v2/root_cities/london',
        cityName: 'london',
        label: 'London',
        country: 'England'
      },
      {
        _href: '/api/v2/root_cities/metropolis',
        cityName: 'metropolis',
        lat: 37.151165,
        lng: -88.731998,
        label: 'Metropolis',
        country: 'United States'
      },
      {
        _href: '/api/v2/root_cities/mould-on-the-wold',
        cityName: 'mould-on-the-wold',
        label: 'Mould-on-the-Wold',
        country: 'England'
      },
      {
        _href: '/api/v2/root_cities/napoli',
        cityName: 'napoli',
        label: 'Napoli',
        country: 'Italy'
      },
      {
        _href: '/api/v2/root_cities/new_york',
        cityName: 'new_york',
        lat: 40.712784,
        lng: -74.005941,
        label: 'New York',
        country: 'United States'
      },
      {
        _href: '/api/v2/root_cities/ottery_st_catchpole',
        cityName: 'ottery_st_catchpole',
        label: 'Ottery St. Catchpole',
        country: 'England'
      },
      {
        _href: '/api/v2/root_cities/place',
        cityName: 'place',
        label: 'Place',
        country: 'Somewhere'
      },
      {
        _href: '/api/v2/root_cities/princeton',
        cityName: 'princeton',
        label: 'Princeton, New Jersey',
        country: 'United States'
      },
      {
        _href: '/api/v2/root_cities/puddleby-on-the-marsh',
        cityName: 'puddleby-on-the-marsh',
        label: 'Puddleby-on-the-Marsh',
        country: 'England'
      },
      {
        _href: '/api/v2/root_cities/tinworth',
        cityName: 'tinworth',
        label: 'Tinworth',
        country: 'England'
      },
      {
        _href: '/api/v2/root_cities/yet_another_place',
        cityName: 'yet_another_place',
        label: 'Yet another place',
        country: 'Somewhere'
      }
    ]
  }