module.exports = {
    links: {
      self: 'https://data-v3.test.molgenis.org/api/data/de_dataexplorer_table_settings?q=table==%22root_hospital_lab_results%22'
    },
    items: [
      {
        links: {
          self: 'https://data-v3.test.molgenis.org/api/data/de_dataexplorer_table_settings/aaaac3ifucuqqys5qvh6agiaae'
        },
        data: {
          id: 'aaaac3ifucuqqys5qvh6agiaae',
          table: {
            links: {
              self: 'https://data-v3.test.molgenis.org/api/data/sys_md_EntityType/root_hospital_lab_results'
            }
          },
          table_label: 'Lab results',
          card_template: '<h1>{{record.id}}</h1>\n<p>The custom card works</p>',
          shop: true,
          template_attrs: 'label'
        }
      }
    ],
    page: {
      size: 1,
      totalElements: 1,
      totalPages: 1,
      number: 0
    }
  }