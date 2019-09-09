export default {
  'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_employees?expand=department, user, function_description&filter=birthdate, department, user, function_description, id, firstName, lastName' },
  'items': [{
    'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_employees/e000000' },
    'data': {
      'function_description': {
        'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_employees/e000000/function_description' },
        'items': [{
          'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_functions/it' },
          'data': { 'id': 'it', 'label': 'IT employee' }
        }]
      },
      'department': {
        'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_departments/it' },
        'data': { 'id': 'it', 'label': 'IT' }
      },
      'id': 'e000000',
      'firstName': 'Harold',
      'lastName': 'Finch',
      'birthdate': '1962-09-22',
      'user': {
        'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_users/admin' },
        'data': {
          'displayName': 'admin',
          'userName': 'admin',
          'active': true,
          'role': 'admin',
          'e_mail': 'admin@thisHospital.com'
        }
      }
    }
  }, {
    'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_employees/e000001' },
    'data': {
      'function_description': {
        'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_employees/e000001/function_description' },
        'items': [{
          'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_functions/dc' },
          'data': { 'id': 'dc', 'label': 'Doctor' }
        }]
      },
      'department': {
        'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_departments/a' },
        'data': { 'id': 'a', 'label': 'Animals' }
      },
      'id': 'e000001',
      'firstName': 'John',
      'lastName': 'Dolittle',
      'birthdate': '1967-12-19',
      'user': {
        'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_users/dolittle' },
        'data': {
          'displayName': 'j.dolittle',
          'userName': 'dolittle',
          'active': true,
          'role': 'employee',
          'title': 'dr.',
          'e_mail': 'j.dolittle@animals4life.nl'
        }
      }
    }
  }, {
    'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_employees/e000002' },
    'data': {
      'function_description': {
        'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_employees/e000002/function_description' },
        'items': [{
          'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_functions/rs' },
          'data': { 'id': 'rs', 'label': 'Researcher' }
        }]
      },
      'department': {
        'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_departments/r' },
        'data': { 'id': 'r', 'label': 'Research' }
      },
      'id': 'e000002',
      'firstName': 'Heinz',
      'lastName': 'Doofenshmirtz',
      'birthdate': '1960-08-27',
      'user': {
        'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_users/JohnnyRingoenshmirtz217' },
        'data': {
          'displayName': 'h.doofenshmirtz',
          'userName': 'JohnnyRingoenshmirtz217',
          'active': true,
          'role': 'employee',
          'title': 'dr.',
          'e_mail': 'doof@doofania.nl'
        }
      }
    }
  }, {
    'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_employees/e000003' },
    'data': {
      'function_description': {
        'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_employees/e000003/function_description' },
        'items': [{
          'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_functions/dc' },
          'data': { 'id': 'dc', 'label': 'Doctor' }
        }, {
          'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_functions/ps' },
          'data': { 'id': 'ps', 'label': 'Plastic surgeon' }
        }]
      },
      'department': {
        'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_departments/p' },
        'data': { 'id': 'p', 'label': 'Plastic surgery' }
      },
      'id': 'e000003',
      'firstName': 'Victor',
      'lastName': 'Frankenstein',
      'birthdate': '1818-01-01',
      'user': {
        'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_users/frankie' },
        'data': {
          'displayName': 'v.frankenstein',
          'userName': 'frankie',
          'active': true,
          'role': 'employee',
          'title': 'dr.',
          'e_mail': 'v.frankenstein@gmail.com'
        }
      }
    }
  }, {
    'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_employees/e000004' },
    'data': {
      'function_description': {
        'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_employees/e000004/function_description' },
        'items': [{
          'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_functions/rs' },
          'data': { 'id': 'rs', 'label': 'Researcher' }
        }]
      },
      'department': {
        'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_departments/g' },
        'data': { 'id': 'g', 'label': 'Genetics' }
      },
      'id': 'e000004',
      'firstName': 'Gregor Johann',
      'lastName': 'Mendel',
      'birthdate': '1822-07-20',
      'user': {
        'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_users/gregor' },
        'data': {
          'displayName': 'g.mendel',
          'userName': 'gregor',
          'active': true,
          'role': 'employee',
          'e_mail': 'g.mendel@gmail.com'
        }
      }
    }
  }, {
    'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_employees/e000005' },
    'data': {
      'function_description': {
        'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_employees/e000005/function_description' },
        'items': [{
          'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_functions/dc' },
          'data': { 'id': 'dc', 'label': 'Doctor' }
        }]
      },
      'department': {
        'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_departments/di' },
        'data': { 'id': 'di', 'label': 'Diagnostic medicine' }
      },
      'id': 'e000005',
      'firstName': 'John',
      'lastName': 'Watson',
      'birthdate': '1975-08-07',
      'user': {
        'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_users/watson' },
        'data': {
          'displayName': 'j.watson',
          'userName': 'watson',
          'active': true,
          'role': 'employee',
          'title': 'dr.',
          'e_mail': 'j.watson@princeton-plainsboro.com'
        }
      }
    }
  }, {
    'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_employees/e000006' },
    'data': {
      'function_description': {
        'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_employees/e000006/function_description' },
        'items': [{
          'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_functions/hdm' },
          'data': { 'id': 'hdm', 'label': 'Head of diagnostic medicine' }
        }, {
          'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_functions/dc' },
          'data': { 'id': 'dc', 'label': 'Doctor' }
        }, {
          'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_functions/np' },
          'data': { 'id': 'np', 'label': 'Nephrologist' }
        }, {
          'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_functions/pt' },
          'data': { 'id': 'pt', 'label': 'Pathologist' }
        }, {
          'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_functions/ids' },
          'data': { 'id': 'ids', 'label': 'Infectious disease specialist' }
        }]
      },
      'department': {
        'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_departments/di' },
        'data': { 'id': 'di', 'label': 'Diagnostic medicine' }
      },
      'id': 'e000006',
      'firstName': 'Gregory',
      'lastName': 'House',
      'birthdate': '1959-05-15',
      'user': {
        'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_users/house' },
        'data': {
          'displayName': 'g.house',
          'userName': 'house',
          'active': true,
          'role': 'employee',
          'title': 'dr.',
          'e_mail': 'donotreply@princeton-plainsboro.com'
        }
      }
    }
  }, {
    'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_employees/e000007' },
    'data': {
      'function_description': {
        'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_employees/e000007/function_description' },
        'items': [{
          'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_functions/dc' },
          'data': { 'id': 'dc', 'label': 'Doctor' }
        }, {
          'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_functions/onc' },
          'data': { 'id': 'onc', 'label': 'Oncologist' }
        }]
      },
      'department': {
        'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_departments/onc' },
        'data': { 'id': 'onc', 'label': 'Oncology' }
      },
      'id': 'e000007',
      'firstName': 'James',
      'lastName': 'Wilson',
      'user': {
        'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_users/jwilson' },
        'data': {
          'displayName': 'j.wilson',
          'userName': 'jwilson',
          'active': true,
          'role': 'employee',
          'title': 'dr.',
          'e_mail': 'j.wilson@princeton-plainsboro.com'
        }
      }
    }
  }, {
    'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_employees/e000008' },
    'data': {
      'function_description': {
        'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_employees/e000008/function_description' },
        'items': [{
          'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_functions/dm' },
          'data': { 'id': 'dm', 'label': 'Dean of Medicine' }
        }, {
          'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_functions/dc' },
          'data': { 'id': 'dc', 'label': 'Doctor' }
        }]
      },
      'id': 'e000008',
      'firstName': 'Lisa',
      'lastName': 'Cuddy',
      'birthdate': '1968-08-04',
      'user': {
        'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_users/lcuddy' },
        'data': {
          'displayName': 'l.cuddy',
          'userName': 'lcuddy',
          'active': true,
          'role': 'employee',
          'title': 'dr.',
          'e_mail': 'l.cuddy@princeton-plainsboro.com'
        }
      }
    }
  }, {
    'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_employees/e000009' },
    'data': {
      'function_description': {
        'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_employees/e000009/function_description' },
        'items': [{
          'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_functions/dc' },
          'data': { 'id': 'dc', 'label': 'Doctor' }
        }, {
          'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_functions/sg' },
          'data': { 'id': 'sg', 'label': 'Surgeon' }
        }]
      },
      'department': {
        'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_departments/di' },
        'data': { 'id': 'di', 'label': 'Diagnostic medicine' }
      },
      'id': 'e000009',
      'firstName': 'Robert',
      'lastName': 'Chase',
      'birthdate': '1979-01-23',
      'user': {
        'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_users/rchase' },
        'data': {
          'displayName': 'r.chase',
          'userName': 'rchase',
          'active': true,
          'role': 'employee',
          'title': 'dr.',
          'e_mail': 'r.chase@princeton-plainsboro.com'
        }
      }
    }
  }, {
    'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_employees/e000010' },
    'data': {
      'function_description': {
        'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_employees/e000010/function_description' },
        'items': [{
          'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_functions/dc' },
          'data': { 'id': 'dc', 'label': 'Doctor' }
        }, {
          'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_functions/im' },
          'data': { 'id': 'im', 'label': 'Immunologist' }
        }]
      },
      'department': {
        'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_departments/di' },
        'data': { 'id': 'di', 'label': 'Diagnostic medicine' }
      },
      'id': 'e000010',
      'firstName': 'Allison',
      'lastName': 'Cameron',
      'birthdate': '1979-12-23',
      'user': {
        'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_users/acameron' },
        'data': {
          'displayName': 'a.cameron',
          'userName': 'acameron',
          'active': true,
          'role': 'employee',
          'title': 'dr.',
          'e_mail': 'a.cameron@princeton-plainseboro.com'
        }
      }
    }
  }, {
    'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_employees/e000011' },
    'data': {
      'function_description': {
        'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_employees/e000011/function_description' },
        'items': [{
          'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_functions/dc' },
          'data': { 'id': 'dc', 'label': 'Doctor' }
        }, {
          'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_functions/ne' },
          'data': { 'id': 'ne', 'label': 'Neurologist' }
        }]
      },
      'department': {
        'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_departments/di' },
        'data': { 'id': 'di', 'label': 'Diagnostic medicine' }
      },
      'id': 'e000011',
      'firstName': 'Eric',
      'lastName': 'Foreman',
      'birthdate': '1979-07-20',
      'user': {
        'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_users/eforeman' },
        'data': {
          'displayName': 'e.foreman',
          'userName': 'eforeman',
          'active': true,
          'role': 'employee',
          'title': 'dr.',
          'e_mail': 'e.foreman@princeton-plainsboro.com'
        }
      }
    }
  }, {
    'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_employees/e000012' },
    'data': {
      'function_description': {
        'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_employees/e000012/function_description' },
        'items': [{
          'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_functions/dc' },
          'data': { 'id': 'dc', 'label': 'Doctor' }
        }, {
          'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_functions/ps' },
          'data': { 'id': 'ps', 'label': 'Plastic surgeon' }
        }]
      },
      'department': {
        'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_departments/di' },
        'data': { 'id': 'di', 'label': 'Diagnostic medicine' }
      },
      'id': 'e000012',
      'firstName': 'Chris',
      'lastName': 'Taub',
      'user': {
        'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_users/ctaub' },
        'data': {
          'displayName': 'c.taub',
          'userName': 'ctaub',
          'active': true,
          'role': 'employee',
          'title': 'dr.',
          'e_mail': 'c.taub@princeton-plainsboro.com'
        }
      }
    }
  }, {
    'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_employees/e000013' },
    'data': {
      'function_description': {
        'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_employees/e000013/function_description' },
        'items': [{
          'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_functions/dc' },
          'data': { 'id': 'dc', 'label': 'Doctor' }
        }, {
          'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_functions/in' },
          'data': { 'id': 'in', 'label': 'Internist' }
        }]
      },
      'department': {
        'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_departments/di' },
        'data': { 'id': 'di', 'label': 'Diagnostic medicine' }
      },
      'id': 'e000013',
      'firstName': 'Remy',
      'lastName': 'Hadley',
      'birthdate': '1984-02-02',
      'user': {
        'links': { 'self': 'http: //localhost: 443/api/data/root_hospital_users/rhadley' },
        'data': {
          'displayName': 'r.hadley',
          'userName': 'rhadley',
          'active': true,
          'role': 'employee',
          'title': 'dr.',
          'e_mail': 'r.hadley@princeton-plainsboro.com'
        }
      }
    }
  }],
  'page': { 'size': 14, 'totalElements': 14, 'totalPages': 1, 'number': 0 }
}
