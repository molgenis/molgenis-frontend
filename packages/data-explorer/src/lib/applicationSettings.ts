const packageSettings =
{
  'id': 'app_set',
  'label': 'App settings'
}

const entitySettings =
{
  'id': 'app_set_DataExplorerEntitySettings',
  'package': 'app_set',
  'label': {
    'defaultValue': 'Data Explorer Entity Settings'
  },
  'attributes': [
    {
      'label': {
        'defaultValue': 'id'
      },
      'name': 'id',
      'sequenceNr': 0,
      'type': 'string',
      'idAttribute': true,
      'labelAttribute': true,
      'nullable': false,
      'auto': true,
      'visible': true,
      'unique': true,
      'readOnly': true,
      'aggregatable': false
    },
    {
      'label': {
        'defaultValue': 'Table'
      },
      'description': {
        'defaultValue': 'The table to apply the settings to'
      },
      'name': 'table',
      'sequenceNr': 1,
      'type': 'xref',
      'idAttribute': false,
      'labelAttribute': false,
      'refEntityType': 'sys_md_EntityType',
      'nullable': false,
      'auto': false,
      'visible': true,
      'unique': true,
      'readOnly': false,
      'aggregatable': false
    },
    {
      'label': {
        'defaultValue': 'Card template'
      },
      'description': {
        'defaultValue': 'Specify a Vue template that should be rendered in the card layout of dataexplorer v2'
      },
      'name': 'card_template',
      'sequenceNr': 2,
      'type': 'script',
      'idAttribute': false,
      'labelAttribute': false,
      'nullable': true,
      'auto': false,
      'visible': true,
      'unique': false,
      'readOnly': false,
      'aggregatable': false
    },
    {
      'label': {
        'defaultValue': 'Is shop'
      },
      'description': {
        'defaultValue': 'Can users shop items from this table?'
      },
      'name': 'shop',
      'sequenceNr': 3,
      'type': 'bool',
      'idAttribute': false,
      'labelAttribute': false,
      'nullable': true,
      'auto': false,
      'visible': true,
      'unique': false,
      'readOnly': false,
      'aggregatable': false
    },
    {
      'label': {
        'defaultValue': 'Template attributes'
      },
      'name': 'template_attrs',
      'sequenceNr': 4,
      'type': 'string',
      'idAttribute': false,
      'labelAttribute': false,
      'nullable': true,
      'auto': false,
      'visible': true,
      'unique': false,
      'readOnly': false,
      'aggregatable': false
    },
    {
      'label': {
        'defaultValue': 'Collapse limit'
      },
      'name': 'collapse_limit',
      'sequenceNr': 5,
      'type': 'string',
      'idAttribute': false,
      'labelAttribute': false,
      'nullable': true,
      'auto': false,
      'visible': true,
      'unique': false,
      'readOnly': false,
      'aggregatable': false
    },
    {
      'label': {
        'defaultValue': 'Default filters'
      },
      'description': {
        'defaultValue': 'Comma separated list of filter names that should be active by default '
      },
      'name': 'default_filters',
      'sequenceNr': 6,
      'type': 'string',
      'idAttribute': false,
      'labelAttribute': false,
      'nullable': true,
      'auto': false,
      'visible': true,
      'unique': false,
      'readOnly': false,
      'aggregatable': false
    }
  ]
}

export default {
  packageSettings,
  entitySettings
}
