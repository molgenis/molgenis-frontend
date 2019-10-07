module.exports = {
    href: '/api/v2/root_hospital_diagnosis',
    meta: {
      href: '/api/v2/root_hospital_diagnosis',
      hrefCollection: '/api/v2/root_hospital_diagnosis',
      name: 'root_hospital_diagnosis',
      label: 'Diagnosis',
      description: 'diagnosis is hospital specific, so placed in the hospital package',
      attributes: [
        {
          href: '/api/v2/root_hospital_diagnosis/meta/id',
          fieldType: 'STRING',
          name: 'id',
          label: 'id',
          attributes: [],
          maxLength: 255,
          auto: false,
          nillable: false,
          readOnly: true,
          labelAttribute: false,
          unique: true,
          visible: true,
          lookupAttribute: true,
          isAggregatable: false
        },
        {
          href: '/api/v2/root_hospital_diagnosis/meta/disease',
          fieldType: 'STRING',
          name: 'disease',
          label: 'disease',
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
          href: '/api/v2/root_hospital_diagnosis/meta/ontology',
          fieldType: 'STRING',
          name: 'ontology',
          label: 'ontology',
          attributes: [],
          maxLength: 255,
          auto: false,
          nillable: true,
          readOnly: false,
          labelAttribute: false,
          unique: false,
          visible: true,
          lookupAttribute: false,
          isAggregatable: false
        }
      ],
      labelAttribute: 'disease',
      idAttribute: 'id',
      lookupAttributes: [
        'id',
        'disease'
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
    total: 24,
    items: [
      {
        _href: '/api/v2/root_hospital_diagnosis/07',
        id: '07',
        disease: 'Diseases of the eye and adnexa',
        ontology: 'icd-10'
      },
      {
        _href: '/api/v2/root_hospital_diagnosis/09',
        id: '09',
        disease: 'Diseases of the circulatory system',
        ontology: 'icd-10'
      },
      {
        _href: '/api/v2/root_hospital_diagnosis/10',
        id: '10',
        disease: 'Diseases of the respiratory system',
        ontology: 'icd-10'
      },
      {
        _href: '/api/v2/root_hospital_diagnosis/13',
        id: '13',
        disease: 'Diseases of the musculoskeletal system and connective tissue',
        ontology: 'icd-10'
      },
      {
        _href: '/api/v2/root_hospital_diagnosis/A00',
        id: 'A00',
        disease: 'Cholera',
        ontology: 'icd-10'
      },
      {
        _href: '/api/v2/root_hospital_diagnosis/A051',
        id: 'A051',
        disease: 'Botulism',
        ontology: 'icd-10'
      },
      {
        _href: '/api/v2/root_hospital_diagnosis/A1',
        id: 'A1',
        disease: 'Tuberculosis',
        ontology: 'icd-10'
      },
      {
        _href: '/api/v2/root_hospital_diagnosis/A37',
        id: 'A37',
        disease: 'Whooping cough',
        ontology: 'icd-10'
      },
      {
        _href: '/api/v2/root_hospital_diagnosis/A692',
        id: 'A692',
        disease: 'Lyme disease',
        ontology: 'icd-10'
      },
      {
        _href: '/api/v2/root_hospital_diagnosis/B15',
        id: 'B15',
        disease: 'Acute hepatitis A',
        ontology: 'icd-10'
      },
      {
        _href: '/api/v2/root_hospital_diagnosis/B16',
        id: 'B16',
        disease: 'Acute hepatitis B',
        ontology: 'icd-10'
      },
      {
        _href: '/api/v2/root_hospital_diagnosis/B171',
        id: 'B171',
        disease: 'Acute hepatitis C',
        ontology: 'icd-10'
      },
      {
        _href: '/api/v2/root_hospital_diagnosis/B20-B24',
        id: 'B20-B24',
        disease: 'Human immunodeficiency virus [HIV] disease',
        ontology: 'icd-10'
      },
      {
        _href: '/api/v2/root_hospital_diagnosis/C37',
        id: 'C37',
        disease: 'Malignant neoplasm of thymus',
        ontology: 'icd-10'
      },
      {
        _href: '/api/v2/root_hospital_diagnosis/E10-E14',
        id: 'E10-E14',
        disease: 'Diabetes mellitus',
        ontology: 'icd-10'
      },
      {
        _href: '/api/v2/root_hospital_diagnosis/E66',
        id: 'E66',
        disease: 'Obesity',
        ontology: 'icd-10'
      },
      {
        _href: '/api/v2/root_hospital_diagnosis/F11',
        id: 'F11',
        disease: 'Mental and behavioural disorders due to use of opioids',
        ontology: 'icd-10'
      },
      {
        _href: '/api/v2/root_hospital_diagnosis/F602',
        id: 'F602',
        disease: 'Dissocial personality disorder',
        ontology: 'icd-10'
      },
      {
        _href: '/api/v2/root_hospital_diagnosis/G10',
        id: 'G10',
        disease: 'Huntington disease',
        ontology: 'icd-10'
      },
      {
        _href: '/api/v2/root_hospital_diagnosis/G43',
        id: 'G43',
        disease: 'Migraine',
        ontology: 'icd-10'
      },
      {
        _href: '/api/v2/root_hospital_diagnosis/I50',
        id: 'I50',
        disease: 'Heart failure',
        ontology: 'icd-10'
      },
      {
        _href: '/api/v2/root_hospital_diagnosis/L905',
        id: 'L905',
        disease: 'Scar conditions and fibrosis of skin',
        ontology: 'icd-10'
      },
      {
        _href: '/api/v2/root_hospital_diagnosis/R960',
        id: 'R960',
        disease: 'Instantaneous death',
        ontology: 'icd-10'
      },
      {
        _href: '/api/v2/root_hospital_diagnosis/Z833',
        id: 'Z833',
        disease: 'Family history of diabetes mellitus',
        ontology: 'icd-10'
      }
    ]
  }