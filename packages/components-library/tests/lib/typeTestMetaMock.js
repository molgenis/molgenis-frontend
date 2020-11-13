export const typeTestMetaData = {
  id: 'test_TypeTest',
  label: 'TypeTest',
  description: 'MOLGENIS Data types test entity',
  package: 'https://master.dev.molgenis.org/api/data/sys_md_Package/test',
  abstract: false,
  indexingDepth: 1,
  attributes: {
    id: {
      id: 'aaaac3nlqmipbmszilr3bfqaei',
      label: 'id label',
      name: 'id',
      sequenceNr: 0,
      type: 'int',
      idAttribute: true,
      labelAttribute: true,
      lookupAttributeIndex: 0,
      nullable: false,
      auto: false,
      visible: true,
      unique: true,
      readOnly: true,
      aggregatable: false
    },
    xbool: {
      id: 'aaaac3nlqmipbmszilr3bfqaeu',
      label: 'xbool',
      description: 'TypeTest boolean attribute',
      name: 'xbool',
      sequenceNr: 1,
      type: 'bool',
      idAttribute: false,
      labelAttribute: false,
      nullable: false,
      auto: false,
      visible: true,
      unique: false,
      readOnly: false,
      aggregatable: true,
      defaultValue: 'false'
    },
    xboolnillable: {
      id: 'aaaac3nlqmipbmszilr3bfqafa',
      label: 'xboolnillable label',
      description: 'TypeTest nillable boolean attribute',
      name: 'xboolnillable',
      sequenceNr: 2,
      type: 'bool',
      idAttribute: false,
      labelAttribute: false,
      nullable: true,
      auto: false,
      visible: true,
      unique: false,
      readOnly: false,
      aggregatable: true,
      defaultValue: 'true'
    },
    xcompound: {
      id: 'aaaac3nlqmipbmszilr3bfqafe',
      label: 'xcompound label',
      description: 'TypeTest compound attribute',
      name: 'xcompound',
      sequenceNr: 3,
      type: 'compound',
      idAttribute: false,
      labelAttribute: false,
      nullable: false,
      auto: false,
      visible: true,
      unique: false,
      readOnly: false,
      aggregatable: false
    },
    xcompound_int: {
      id: 'aaaac3nlqmipbmszilr3bfqafi',
      label: 'xcompound_int label',
      name: 'xcompound_int',
      sequenceNr: 4,
      type: 'int',
      idAttribute: false,
      labelAttribute: false,
      nullable: true,
      auto: false,
      visible: true,
      unique: false,
      readOnly: false,
      aggregatable: true,
      parentAttributeId: 'aaaac3nlqmipbmszilr3bfqafe',
      defaultValue: '1'
    },
    xcompound_string: {
      id: 'aaaac3nlqmipbmszilr3bfqafm',
      label: 'xcompound_string label',
      description: 'TypeTest compound string attribute',
      name: 'xcompound_string',
      sequenceNr: 5,
      type: 'string',
      idAttribute: false,
      labelAttribute: false,
      nullable: true,
      auto: false,
      visible: true,
      unique: false,
      readOnly: false,
      aggregatable: true,
      parentAttributeId: 'aaaac3nlqmipbmszilr3bfqafe',
      defaultValue: 'xcompound_string'
    },
    xcategorical_value: {
      id: 'aaaac3nlqmipbmszilr3bfqafq',
      label: 'xcategorical_value label',
      description: 'TypeTest categorical attribute',
      name: 'xcategorical_value',
      sequenceNr: 6,
      type: 'categorical',
      idAttribute: false,
      labelAttribute: false,
      refEntityType: {
        self: 'https://master.dev.molgenis.org/api/metadata/test_TypeTestRef'
      },
      nullable: false,
      auto: false,
      visible: true,
      unique: false,
      readOnly: false,
      aggregatable: false,
      categoricalOptions: [
        {
          id: 'MyRef',
          label: 'MyRef'
        },
        {
          id: 'aaa',
          label: 'bbbb'
        },
        {
          id: 'cccc',
          label: 'dddd'
        },
        {
          id: 'ref1',
          label: 'label1'
        },
        {
          id: 'ref2',
          label: 'label2'
        },
        {
          id: 'ref3',
          label: 'label3'
        },
        {
          id: 'ref4',
          label: 'label4'
        },
        {
          id: 'ref5',
          label: 'label5'
        }
      ],
      defaultValue: 'ref1'
    },
    xcategoricalnillable_value: {
      id: 'aaaac3nlqmipbmszilr3bfqafu',
      label: 'xcategoricalnillable_value',
      description: 'TypeTest nillable categorical attribute',
      name: 'xcategoricalnillable_value',
      sequenceNr: 7,
      type: 'categorical',
      idAttribute: false,
      labelAttribute: false,
      refEntityType: {
        self: 'https://master.dev.molgenis.org/api/metadata/test_TypeTestRef'
      },
      nullable: true,
      auto: false,
      visible: true,
      unique: false,
      readOnly: false,
      aggregatable: false,
      categoricalOptions: [
        {
          id: 'MyRef',
          label: 'MyRef'
        },
        {
          id: 'aaa',
          label: 'bbbb'
        },
        {
          id: 'cccc',
          label: 'dddd'
        },
        {
          id: 'ref1',
          label: 'label1'
        },
        {
          id: 'ref2',
          label: 'label2'
        },
        {
          id: 'ref3',
          label: 'label3'
        },
        {
          id: 'ref4',
          label: 'label4'
        },
        {
          id: 'ref5',
          label: 'label5'
        }
      ],
      defaultValue: 'ref2'
    },
    xcategoricalmref_value: {
      id: 'aaaac3nlqmipbmszilr3bfqafy',
      label: 'xcategoricalmref_value',
      description: 'TypeTest categorical mref attribute',
      name: 'xcategoricalmref_value',
      sequenceNr: 8,
      type: 'categoricalmref',
      idAttribute: false,
      labelAttribute: false,
      refEntityType: {
        self: 'https://master.dev.molgenis.org/api/metadata/test_TypeTestRef'
      },
      nullable: false,
      auto: false,
      visible: true,
      unique: false,
      readOnly: false,
      aggregatable: true,
      categoricalOptions: [
        {
          id: 'MyRef',
          label: 'MyRef'
        },
        {
          id: 'aaa',
          label: 'bbbb'
        },
        {
          id: 'cccc',
          label: 'dddd'
        },
        {
          id: 'ref1',
          label: 'label1'
        },
        {
          id: 'ref2',
          label: 'label2'
        },
        {
          id: 'ref3',
          label: 'label3'
        },
        {
          id: 'ref4',
          label: 'label4'
        },
        {
          id: 'ref5',
          label: 'label5'
        }
      ],
      defaultValue: 'ref1,ref2'
    },
    xcatmrefnillable_value: {
      id: 'aaaac3nlqmipbmszilr3bfqaf4',
      label: 'xcatmrefnillable_value',
      description: 'TypeTest nillable categorical mref attribute',
      name: 'xcatmrefnillable_value',
      sequenceNr: 9,
      type: 'categoricalmref',
      idAttribute: false,
      labelAttribute: false,
      refEntityType: {
        self: 'https://master.dev.molgenis.org/api/metadata/test_TypeTestRef'
      },
      nullable: true,
      auto: false,
      visible: true,
      unique: false,
      readOnly: false,
      aggregatable: false,
      categoricalOptions: [
        {
          id: 'MyRef',
          label: 'MyRef'
        },
        {
          id: 'aaa',
          label: 'bbbb'
        },
        {
          id: 'cccc',
          label: 'dddd'
        },
        {
          id: 'ref1',
          label: 'label1'
        },
        {
          id: 'ref2',
          label: 'label2'
        },
        {
          id: 'ref3',
          label: 'label3'
        },
        {
          id: 'ref4',
          label: 'label4'
        },
        {
          id: 'ref5',
          label: 'label5'
        }
      ],
      defaultValue: 'ref1,ref3'
    },
    xdate: {
      id: 'aaaac3nlqmipbmszilr3bfqaga',
      label: 'xdate label',
      description: 'Typetest date attribute',
      name: 'xdate',
      sequenceNr: 10,
      type: 'date',
      idAttribute: false,
      labelAttribute: false,
      nullable: false,
      auto: false,
      visible: true,
      unique: false,
      readOnly: false,
      aggregatable: true,
      defaultValue: '2014-08-01T00:00'
    },
    xdatenillable: {
      id: 'aaaac3nlqmipbmszilr3bfqage',
      label: 'xdatenillable label',
      description: 'Typetest nillable date attribute',
      name: 'xdatenillable',
      sequenceNr: 11,
      type: 'date',
      idAttribute: false,
      labelAttribute: false,
      nullable: true,
      auto: false,
      visible: true,
      unique: false,
      readOnly: false,
      aggregatable: false,
      defaultValue: '2015-04-01T00:00'
    },
    xdatetime: {
      id: 'aaaac3nlqmipbmszilr3bfqagi',
      label: 'xdatetime label',
      name: 'xdatetime',
      sequenceNr: 12,
      type: 'datetime',
      idAttribute: false,
      labelAttribute: false,
      nullable: false,
      auto: false,
      visible: true,
      unique: false,
      readOnly: false,
      aggregatable: false,
      defaultValue: '1985-08-12T11:12:13+0500'
    },
    xdatetimenillable: {
      id: 'aaaac3nlqmipbmszilr3bfqagm',
      label: 'xdatetimenillable label',
      description: 'Typetest nillable datetime attribute',
      name: 'xdatetimenillable',
      sequenceNr: 13,
      type: 'datetime',
      idAttribute: false,
      labelAttribute: false,
      nullable: true,
      auto: false,
      visible: true,
      unique: false,
      readOnly: false,
      aggregatable: true,
      defaultValue: '1985-08-12T11:12:13+0500'
    },
    xdecimal: {
      id: 'aaaac3nlqmipbmszilr3bfqagq',
      label: 'xdecimal label',
      description: 'Typetest decimal attribute',
      name: 'xdecimal',
      sequenceNr: 14,
      type: 'decimal',
      idAttribute: false,
      labelAttribute: false,
      nullable: false,
      auto: false,
      visible: true,
      unique: false,
      readOnly: false,
      aggregatable: true,
      defaultValue: '10.234'
    },
    xdecimalnillable: {
      id: 'aaaac3nlqmipbmszilr3bfqagu',
      label: 'xdecimalnillable label',
      description: 'Typetest nillable decimal attribute',
      name: 'xdecimalnillable',
      sequenceNr: 15,
      type: 'decimal',
      idAttribute: false,
      labelAttribute: false,
      nullable: true,
      auto: false,
      visible: true,
      unique: false,
      readOnly: false,
      aggregatable: false,
      defaultValue: '15.666'
    },
    xemail: {
      id: 'aaaac3nlqmipbmszilr3bfqagy',
      label: 'xemail label',
      description: 'Typetest email attribute',
      name: 'xemail',
      sequenceNr: 16,
      type: 'email',
      idAttribute: false,
      labelAttribute: false,
      nullable: false,
      auto: false,
      visible: true,
      unique: false,
      readOnly: false,
      aggregatable: true,
      defaultValue: 'test@x.y.z'
    },
    xemailnillable: {
      id: 'aaaac3nlqmipbmszilr3bfqag4',
      label: 'xemailnillable label',
      description: 'Typetest nillable email attribute',
      name: 'xemailnillable',
      sequenceNr: 17,
      type: 'email',
      idAttribute: false,
      labelAttribute: false,
      nullable: true,
      auto: false,
      visible: true,
      unique: false,
      readOnly: false,
      aggregatable: false,
      defaultValue: 'molgenis@gmail.com'
    },
    xenum: {
      id: 'aaaac3nlqmipbmszilr3bfqaha',
      label: 'xenum',
      description: 'Typetest enum attribute',
      name: 'xenum',
      sequenceNr: 18,
      type: 'enum',
      idAttribute: false,
      labelAttribute: false,
      nullable: false,
      auto: false,
      visible: true,
      unique: false,
      readOnly: false,
      aggregatable: true,
      enumOptions: [
        'enum1',
        'enum2',
        'enum3'
      ],
      defaultValue: 'enum1'
    },
    xenumnillable: {
      id: 'aaaac3nlqmipbmszilr3bfqahe',
      label: 'xenumnillable label',
      description: 'Typetest nillable enum attribute',
      name: 'xenumnillable',
      sequenceNr: 19,
      type: 'enum',
      idAttribute: false,
      labelAttribute: false,
      nullable: true,
      auto: false,
      visible: true,
      unique: false,
      readOnly: false,
      aggregatable: false,
      enumOptions: [
        'enum1',
        'enum2',
        'enum3'
      ],
      defaultValue: 'enum3'
    },
    xhtml: {
      id: 'aaaac3nlqmipbmszilr3bfqahi',
      label: 'xhtml label',
      name: 'xhtml',
      sequenceNr: 20,
      type: 'html',
      idAttribute: false,
      labelAttribute: false,
      nullable: false,
      auto: false,
      visible: true,
      unique: false,
      readOnly: false,
      aggregatable: false,
      defaultValue: '<h1>html</h1>'
    },
    xhtmlnillable: {
      id: 'aaaac3nlqmipbmszilr3bfqahm',
      label: 'xhtmlnillable label',
      description: 'Typetest nillable html attribute',
      name: 'xhtmlnillable',
      sequenceNr: 21,
      type: 'html',
      idAttribute: false,
      labelAttribute: false,
      nullable: true,
      auto: false,
      visible: true,
      unique: false,
      readOnly: false,
      aggregatable: true,
      defaultValue: '<h1>html 2</h1>'
    },
    xhyperlink: {
      id: 'aaaac3nlqmipbmszilr3bfqahq',
      label: 'xhyperlink label',
      description: 'Typetest hyperlink attribute',
      name: 'xhyperlink',
      sequenceNr: 22,
      type: 'hyperlink',
      idAttribute: false,
      labelAttribute: false,
      nullable: false,
      auto: false,
      visible: true,
      unique: false,
      readOnly: false,
      aggregatable: true,
      defaultValue: 'http://www.nu.nl/'
    },
    xhyperlinknillable: {
      id: 'aaaac3nlqmipbmszilr3bfqahu',
      label: 'xhyperlinknillable label',
      description: 'Typetest nillable hyperlink attribute',
      name: 'xhyperlinknillable',
      sequenceNr: 23,
      type: 'hyperlink',
      idAttribute: false,
      labelAttribute: false,
      nullable: true,
      auto: false,
      visible: true,
      unique: false,
      readOnly: false,
      aggregatable: false,
      defaultValue: 'http://www.github.com/'
    },
    xint: {
      id: 'aaaac3nlqmipbmszilr3bfqahy',
      label: 'xint label',
      description: 'Typetest int attribute',
      name: 'xint',
      sequenceNr: 24,
      type: 'int',
      idAttribute: false,
      labelAttribute: false,
      nullable: false,
      auto: false,
      visible: true,
      unique: false,
      readOnly: false,
      aggregatable: true,
      defaultValue: '3'
    },
    xintnillable: {
      id: 'aaaac3nlqmipbmszilr3bfqah4',
      label: 'xintnillable label',
      name: 'xintnillable',
      sequenceNr: 25,
      type: 'int',
      idAttribute: false,
      labelAttribute: false,
      nullable: true,
      auto: false,
      visible: true,
      unique: false,
      readOnly: false,
      aggregatable: false,
      defaultValue: '1'
    },
    xintrange: {
      id: 'aaaac3nlqmipbmszilr3bfqaia',
      label: 'xintrange label',
      description: 'Typetest int range attribute',
      name: 'xintrange',
      sequenceNr: 26,
      type: 'int',
      idAttribute: false,
      labelAttribute: false,
      nullable: false,
      auto: false,
      visible: true,
      unique: false,
      readOnly: false,
      aggregatable: false,
      range: {
        max: 10
      },
      defaultValue: '6'
    },
    xintrangenillable: {
      id: 'aaaac3nlqmipbmszilr3bfqaie',
      label: 'xintrangenillable label',
      description: 'Typetest nillable intrange attribute',
      name: 'xintrangenillable',
      sequenceNr: 27,
      type: 'int',
      idAttribute: false,
      labelAttribute: false,
      nullable: true,
      auto: false,
      visible: true,
      unique: false,
      readOnly: false,
      aggregatable: false,
      range: {
        min: 0
      },
      defaultValue: '77'
    },
    xlong: {
      id: 'aaaac3nlqmipbmszilr3bfqaii',
      label: 'xlong label',
      description: 'Typetest long attribute',
      name: 'xlong',
      sequenceNr: 28,
      type: 'long',
      idAttribute: false,
      labelAttribute: false,
      nullable: false,
      auto: false,
      visible: true,
      unique: false,
      readOnly: false,
      aggregatable: false,
      defaultValue: '12342151234'
    },
    xlongnillable: {
      id: 'aaaac3nlqmipbmszilr3bfqaim',
      label: 'xlongnillable label',
      name: 'xlongnillable',
      sequenceNr: 29,
      type: 'long',
      idAttribute: false,
      labelAttribute: false,
      nullable: true,
      auto: false,
      visible: true,
      unique: false,
      readOnly: false,
      aggregatable: false,
      defaultValue: '12342151234'
    },
    xlongrange: {
      id: 'aaaac3nlqmipbmszilr3bfqaiq',
      label: 'xlongrange label',
      description: 'Typetest longrange attribute',
      name: 'xlongrange',
      sequenceNr: 30,
      type: 'long',
      idAttribute: false,
      labelAttribute: false,
      nullable: false,
      auto: false,
      visible: true,
      unique: false,
      readOnly: false,
      aggregatable: true,
      range: {
        min: 0,
        max: 10
      },
      defaultValue: '5'
    },
    xlongrangenillable: {
      id: 'aaaac3nlqmipbmszilr3bfqaiu',
      label: 'xlongrangenillable label',
      description: 'Typetest nillable longrange attribute',
      name: 'xlongrangenillable',
      sequenceNr: 31,
      type: 'long',
      idAttribute: false,
      labelAttribute: false,
      nullable: true,
      auto: false,
      visible: true,
      unique: false,
      readOnly: false,
      aggregatable: true,
      range: {
        min: 0,
        max: 10
      },
      defaultValue: '3'
    },
    xmref_value: {
      id: 'aaaac3nlqmipbmszilr3bfqaiy',
      label: 'xmref_value',
      description: 'Typetest mref attribute',
      name: 'xmref_value',
      sequenceNr: 32,
      type: 'mref',
      idAttribute: false,
      labelAttribute: false,
      refEntityType: {
        self: 'https://master.dev.molgenis.org/api/metadata/test_TypeTestRef'
      },
      nullable: false,
      auto: false,
      visible: true,
      unique: false,
      readOnly: false,
      aggregatable: true
    },
    xmrefnillable_value: {
      id: 'aaaac3nlqmipbmszilr3bfqai4',
      label: 'xmrefnillable_value',
      name: 'xmrefnillable_value',
      sequenceNr: 33,
      type: 'mref',
      idAttribute: false,
      labelAttribute: false,
      refEntityType: {
        self: 'https://master.dev.molgenis.org/api/metadata/test_TypeTestRef'
      },
      nullable: true,
      auto: false,
      visible: true,
      unique: false,
      readOnly: false,
      aggregatable: false
    },
    xstring: {
      id: 'aaaac3nlqmipdmszilr3bfqaae',
      label: 'xstring label',
      description: 'Typetest string attribute',
      name: 'xstring',
      sequenceNr: 34,
      type: 'string',
      idAttribute: false,
      labelAttribute: false,
      nullable: false,
      auto: false,
      visible: true,
      unique: false,
      readOnly: false,
      aggregatable: true,
      defaultValue: 'xstring'
    },
    xstringnillable: {
      id: 'aaaac3nlqmipdmszilr3bfqaai',
      label: 'xstringnillable label',
      description: 'Typetest nillable string attribute',
      name: 'xstringnillable',
      sequenceNr: 35,
      type: 'string',
      idAttribute: false,
      labelAttribute: false,
      nullable: true,
      auto: false,
      visible: true,
      unique: false,
      readOnly: false,
      aggregatable: false,
      defaultValue: 'xstringnillable'
    },
    xtext: {
      id: 'aaaac3nlqmipdmszilr3bfqaam',
      label: 'xtext label',
      name: 'xtext',
      sequenceNr: 36,
      type: 'text',
      idAttribute: false,
      labelAttribute: false,
      nullable: false,
      auto: false,
      visible: true,
      unique: false,
      readOnly: false,
      aggregatable: false,
      defaultValue: 'xtext'
    },
    xtextnillable: {
      id: 'aaaac3nlqmipdmszilr3bfqaaq',
      label: 'xtextnillable label',
      description: 'Typetest nillable text attribute',
      name: 'xtextnillable',
      sequenceNr: 37,
      type: 'text',
      idAttribute: false,
      labelAttribute: false,
      nullable: true,
      auto: false,
      visible: true,
      unique: false,
      readOnly: false,
      aggregatable: false,
      defaultValue: 'xtextnillable'
    },
    xxref_value: {
      id: 'aaaac3nlqmipdmszilr3bfqaau',
      label: 'xxref_value',
      description: 'Typetest xref attribute',
      name: 'xxref_value',
      sequenceNr: 38,
      type: 'xref',
      idAttribute: false,
      labelAttribute: false,
      refEntityType: {
        self: 'https://master.dev.molgenis.org/api/metadata/test_TypeTestRef'
      },
      nullable: false,
      auto: false,
      visible: true,
      unique: false,
      readOnly: false,
      aggregatable: true
    },
    xxrefnillable_value: {
      id: 'aaaac3nlqmipdmszilr3bfqaay',
      label: 'xxrefnillable_value',
      description: 'Typetest nillable xref attribute_value',
      name: 'xxrefnillable_value',
      sequenceNr: 39,
      type: 'xref',
      idAttribute: false,
      labelAttribute: false,
      refEntityType: {
        self: 'https://master.dev.molgenis.org/api/metadata/test_TypeTestRef'
      },
      nullable: true,
      auto: false,
      visible: true,
      unique: false,
      readOnly: false,
      aggregatable: false
    },
    xstring_hidden: {
      id: 'aaaac3nlqmipdmszilr3bfqaa4',
      label: 'xstring_hidden label',
      description: 'Typetest hidden string attribute',
      name: 'xstring_hidden',
      sequenceNr: 40,
      type: 'string',
      idAttribute: false,
      labelAttribute: false,
      nullable: false,
      auto: false,
      visible: false,
      unique: false,
      readOnly: false,
      aggregatable: false,
      defaultValue: 'xstring'
    },
    xstringnillable_hidden: {
      id: 'aaaac3nlqmipdmszilr3bfqaba',
      label: 'xstringnillable_hidden label',
      description: 'Typetest nillable hidden string attribute',
      name: 'xstringnillable_hidden',
      sequenceNr: 41,
      type: 'string',
      idAttribute: false,
      labelAttribute: false,
      nullable: true,
      auto: false,
      visible: false,
      unique: false,
      readOnly: false,
      aggregatable: false,
      defaultValue: 'xstringhidden'
    },
    xstring_unique: {
      id: 'aaaac3nlqmipdmszilr3bfqabe',
      label: 'xstring_unique label',
      name: 'xstring_unique',
      sequenceNr: 42,
      type: 'string',
      idAttribute: false,
      labelAttribute: false,
      nullable: false,
      auto: false,
      visible: true,
      unique: true,
      readOnly: false,
      aggregatable: false
    },
    xint_unique: {
      id: 'aaaac3nlqmipdmszilr3bfqabi',
      label: 'xint_unique label',
      description: 'Typetest unique int attribute',
      name: 'xint_unique',
      sequenceNr: 43,
      type: 'int',
      idAttribute: false,
      labelAttribute: false,
      nullable: false,
      auto: false,
      visible: true,
      unique: true,
      readOnly: false,
      aggregatable: false
    },
    xxref_unique: {
      id: 'aaaac3nlqmipdmszilr3bfqabq',
      label: 'xxref_unique',
      description: 'Typetest unique xref attribute',
      name: 'xxref_unique',
      sequenceNr: 44,
      type: 'xref',
      idAttribute: false,
      labelAttribute: false,
      refEntityType: {
        self: 'https://master.dev.molgenis.org/api/metadata/test_TypeTestRef'
      },
      nullable: true,
      auto: false,
      visible: true,
      unique: true,
      readOnly: false,
      aggregatable: false
    },
    xfile: {
      id: 'aaaac3nlqmipdmszilr3bfqabu',
      label: 'xfile',
      name: 'xfile',
      sequenceNr: 45,
      type: 'file',
      idAttribute: false,
      labelAttribute: false,
      refEntityType: {
        self: 'https://master.dev.molgenis.org/api/metadata/sys_FileMeta'
      },
      nullable: true,
      auto: false,
      visible: true,
      unique: false,
      readOnly: false,
      aggregatable: false
    },
    xcomputedxref: {
      id: 'aaaac3nlqmipdmszilr3bfqaby',
      label: 'xcomputedxref label',
      description: 'Typetest computed xref attribute',
      name: 'xcomputedxref',
      sequenceNr: 46,
      type: 'xref',
      idAttribute: false,
      labelAttribute: false,
      refEntityType: {
        self: 'https://master.dev.molgenis.org/api/metadata/test_Location'
      },
      nullable: true,
      auto: false,
      visible: true,
      unique: false,
      readOnly: true,
      aggregatable: false,
      expression: '{Chromosome: xstring, Position: xint}'
    },
    xcomputedint: {
      id: 'aaaac3nlqmipdmszilr3bfqab4',
      label: 'xcomputedint label',
      description: 'Typetest computed int attribute',
      name: 'xcomputedint',
      sequenceNr: 47,
      type: 'int',
      idAttribute: false,
      labelAttribute: false,
      nullable: true,
      auto: false,
      visible: true,
      unique: false,
      readOnly: true,
      aggregatable: false,
      expression: 'xint'
    }
  }
}
