[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=molgenis_molgenis-frontend&metric=alert_status)](https://sonarcloud.io/dashboard?id=molgenis_molgenis-frontend)
[![Code Coverage](https://codecov.io/gh/molgenis/molgenis-frontend/branch/master/graph/badge.svg)](https://codecov.io/gh/molgenis/molgenis-frontend/branch/master)
# molgenis-frontend
Frontend code for MOLGENIS

# build
The project is built using [lerna](https://lernajs.io/) to manage the monorepo and 
[yarn](https://yarnpkg.com/) as the npm client.
The modules are published to our 
[own local registry](https://registry.molgenis.org/#browse/browse:npm-hosted) 
`https://registry.molgenis.org/repository/npm-hosted/`

To get started run
```bash
> yarn install
> yarn lerna bootstrap
```

You can then work with each of the modules in the `/packages` directory
as usual running `yarn add` `yarn serve` and whatever other tasks you need.

# versioning
The packages share a semantic version number located in `lerna.json`

# release
When changes are committed to the master, a canary release is built on
the Jenkins server.
You can manually perform a release on Jenkins and specify if it should be
a patch, minor or major increment.

For more information, see the `lerna version` [command documentation](https://github.com/lerna/lerna/tree/master/commands/version#readme).