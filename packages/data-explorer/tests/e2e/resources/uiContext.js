module.exports = {
  'logoTopMaxHeight': 150,
  'navBarLogo': '/img/Logo_Blue_Small.png',
  'menu': {
    'id': 'main',
    'label': 'Home',
    'items': [
      {
        'type': 'plugin',
        'id': 'home',
        'label': 'Home'
      },
      {
        'type': 'plugin',
        'id': 'redirect',
        'label': 'Bioinformatics',
        'params': 'url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FBioinformatics'
      },
      {
        'type': 'menu',
        'id': 'experimental',
        'label': 'Experimental',
        'items': [
          {
            'type': 'plugin',
            'id': 'redirect',
            'label': 'DS2 Books',
            'params': 'url=%2F%40molgenis-experimental%2Fdata-explorer%2Fdist%2Findex.html%23%2Fquest_nillable_Books'
          },
          {
            'type': 'plugin',
            'id': 'redirect',
            'label': 'Collections',
            'params': 'url=%2F%40molgenis-experimental%2Fdata-explorer%2Fdist%2Findex.html%23%2Feu_bbmri_eric_collections'
          },
          {
            'type': 'plugin',
            'id': 'redirect',
            'label': 'Biobanks',
            'params': 'url=%2F%40molgenis-experimental%2Fdata-explorer%2Fdist%2Findex.html%23%2Feu_bbmri_eric_biobanks'
          },
          {
            'type': 'plugin',
            'id': 'redirect',
            'label': 'TypeTest',
            'params': 'url=%2F%40molgenis-experimental%2Fdata-explorer%2Fdist%2Findex.html%23%2Ftest_TypeTest'
          }
        ]
      }
    ]
  },
  'loginHref': '/login',
  'helpLink': {
    'label': 'Help',
    'href': 'https://molgenis.gitbook.io/molgenis/'
  },
  'authenticated': false,
  'email': 'molgenis+anonymous@gmail.com',
  'username': 'anonymous',
  'roles': [
    'ROLE_ANONYMOUS'
  ],
  'showCookieWall': false,
  'version': '8.4.0-SNAPSHOT',
  'buildDate': '2020-04-08 08:21 UTC',
  'selectedTheme': '/css/bootstrap-4/bootstrap-molgenis-blue.min.css?1tzNyw'
}
