module.exports = {
  links: {
    self: 'https://data-v3.test.molgenis.org/api/data/root_hospital_lab_results?expand=sample_type'
  },
  items: [
    {
      links: {
        self: 'https://data-v3.test.molgenis.org/api/data/root_hospital_lab_results/p000000001_2014_11_11'
      },
      data: {
        id: 'p000000001_2014_11_11',
        sample_type: {
          links: {
            self: 'https://data-v3.test.molgenis.org/api/data/root_hospital_sample_types/blood'
          },
          data: {
            id: 'blood',
            label: 'Blood'
          }
        },
        ESR: 14,
        HB: 8,
        hematocrit: 0.46,
        iron: 15,
        PSA: 1.6,
        proteins_serum: 74,
        proteins_plasma: 70,
        TSH: 0.3,
        FT4: 10,
        cholesterol: 2.6
      }
    },
    {
      links: {
        self: 'https://data-v3.test.molgenis.org/api/data/root_hospital_lab_results/p000000001_2015_01_14'
      },
      data: {
        id: 'p000000001_2015_01_14',
        sample_type: {
          links: {
            self: 'https://data-v3.test.molgenis.org/api/data/root_hospital_sample_types/blood'
          },
          data: {
            id: 'blood',
            label: 'Blood'
          }
        },
        ESR: 14,
        HB: 9,
        hematocrit: 0.52,
        iron: 20,
        PSA: 1.3,
        proteins_serum: 81,
        proteins_plasma: 72,
        TSH: 2.3,
        FT4: 20,
        cholesterol: 3.5
      }
    },
    {
      links: {
        self: 'https://data-v3.test.molgenis.org/api/data/root_hospital_lab_results/p000000002_2015_02_01'
      },
      data: {
        id: 'p000000002_2015_02_01',
        sample_type: {
          links: {
            self: 'https://data-v3.test.molgenis.org/api/data/root_hospital_sample_types/blood'
          },
          data: {
            id: 'blood',
            label: 'Blood'
          }
        },
        ESR: 15,
        HB: 7.5,
        hematocrit: 0.45,
        iron: 12,
        proteins_serum: 78,
        proteins_plasma: 72,
        TSH: 0.4,
        FT4: 12,
        cholesterol: 3
      }
    },
    {
      links: {
        self: 'https://data-v3.test.molgenis.org/api/data/root_hospital_lab_results/p000000003_2004_10_30'
      },
      data: {
        id: 'p000000003_2004_10_30',
        sample_type: {
          links: {
            self: 'https://data-v3.test.molgenis.org/api/data/root_hospital_sample_types/blood'
          },
          data: {
            id: 'blood',
            label: 'Blood'
          }
        },
        ESR: 17,
        HB: 9,
        hematocrit: 0.47,
        iron: 18,
        PSA: 3.4,
        proteins_serum: 75,
        proteins_plasma: 75,
        TSH: 2.2,
        FT4: 21,
        cholesterol: 4.9
      }
    },
    {
      links: {
        self: 'https://data-v3.test.molgenis.org/api/data/root_hospital_lab_results/p000000003_2014_12_19'
      },
      data: {
        id: 'p000000003_2014_12_19',
        sample_type: {
          links: {
            self: 'https://data-v3.test.molgenis.org/api/data/root_hospital_sample_types/blood'
          },
          data: {
            id: 'blood',
            label: 'Blood'
          }
        },
        ESR: 19,
        HB: 10,
        hematocrit: 0.46,
        iron: 25,
        PSA: 4.2,
        proteins_serum: 74,
        proteins_plasma: 71,
        TSH: 0.9,
        FT4: 24,
        cholesterol: 2.3
      }
    },
    {
      links: {
        self: 'https://data-v3.test.molgenis.org/api/data/root_hospital_lab_results/p000000003_2016_09_08'
      },
      data: {
        id: 'p000000003_2016_09_08',
        sample_type: {
          links: {
            self: 'https://data-v3.test.molgenis.org/api/data/root_hospital_sample_types/blood'
          },
          data: {
            id: 'blood',
            label: 'Blood'
          }
        },
        ESR: 19,
        HB: 9,
        hematocrit: 0.5,
        iron: 16,
        PSA: 4.1,
        proteins_serum: 80,
        proteins_plasma: 74,
        TSH: 1.5,
        FT4: 16,
        cholesterol: 4.5
      }
    }
  ],
  data: {
    page: {
      size: 6,
      totalElements: 6,
      totalPages: 1,
      number: 0
    }
  }
}
