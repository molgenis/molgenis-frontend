[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=molgenis_molgenis-frontend&metric=alert_status)](https://sonarcloud.io/dashboard?id=molgenis_molgenis-frontend)
[![Code Coverage](https://codecov.io/gh/molgenis/molgenis-frontend/branch/master/graph/badge.svg)](https://codecov.io/gh/molgenis/molgenis-frontend/branch/master)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
# molgenis-frontend
These are *stable* packages for MOLGENIS. The *stable* packages will compose the MOLGENIS frontend. These are used in the [molgenis/molgenis repository](https://github.com/molgenis/molgenis)

The following will be addressed:

- [Environment](#environment)
- [Developing](#developing)
- [Integrate with MOLGENIS](#integrate-with-molgenis)
- [Guidelines](#guidelines)

## Environment
When developing client code, you will need to following tools:
 - Node v8.11.3 (LTS version) and included NPM version
 - Yarn v1.10.3 or greater

The project is built using [lerna](https://lerna.js.org/) to manage the monorepo and [yarn](https://yarnpkg.com/) as the npm client.

> note: It can be hard to migrate from old to new versions. Please check the [troubleshooting guide](TROUBLESHOOTING.md) if you have trouble setting up the environment.

## Developing
To get started run
```bash
> yarn install
> yarn lerna bootstrap
```

The following will be addressed:

- [Commits](#commits)
- [Usage of yarn](#usage-of-yarn)
- [Create new stable packages](#create-new-stable-packages)
- [Update existing stable packages](#update-existing-stable-packages)
- [Testing packages](#testing-packages)

### Commits
We use independent versioning for the packages. This makes it hard to interactively specify at release
time what type of upgrade each app needs.

So please specify your changes using [conventional commits](https://www.conventionalcommits.org).
This allows lerna to deduce the version increments for each app from the commits.
As a bonus, it will generate a per-app changelogs.

If you've run `yarn install`, you can use [`commitizen`](https://commitizen.github.io/cz-cli/) to
formulate your commits interactively from anywhere in the repository. Just type `git cz` instead
of `git commit`. It will accept command line flags too.

#### Allowed scopes
Use the app directory names as scopes.

#### Allowed types
The [Angular conventional commit types](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#type).

#### Squash messy commits
When merging a pull request that does not use conventional commits you can squash the commits
into a single conventional commit.

### Usage of yarn
The following three commands can be used to install, develop and test client code:

#### cli2

```bash
> yarn install
> yarn dev
> yarn unit
> yarn e2e
// (to run unit and e2e together)
> yarn test 
> yarn build
```
#### cli3

```bash
> yarn install
> yarn serve
> yarn test:unit
> yarn test:e2e
> yarn build
```

#### Global commands

Third party dependencies can be added: 

```bash
> yarn add <library_name>
```



Third party development dependencies can be added: 

```bash
> yarn add --dev <library_name>
```

or removed:

```bash
> yarn remove <library_name>
```

using yarn.

Yarn produces a `yarn.lock` file. 
Commit this file to your Git repository as it ensures future builds to use the versions that were used to create the client code.

When running your client code in development on port 8081, it will help to run the MOLGENIS locally on port 8080. 
The vue-cli comes with a proxy table that will redirect any REST calls to localhost:8080.

### Create new stable packages
If you do not have the vue-cli (version 3), please check [vue-cli](https://cli.vuejs.org/). 

If you have the vue-cli installed you can use the following steps to quickly install a working Vue template.

```bash
> cd packages/
> vue create --preset ../preset.json <my-app-name> 
```

Using the ```preset.json``` is recommended. If you need specific tooling you can also choose manual.

>note: Make sure you update the project-name to @molgenis-ui/#my-app# for publishing purposes in the ```package.json``` *name-key* of the package you created.

### Update existing stable packages
The whole development flow is working as follows. 

- [PR's](#pull-requests)
- [Merges with master](#merges-with-master)
- [Releases](#Releases)
- [Deployment](#Deployment)

#### Pull requests
PR preview docker containers are available on registry.molgenis.org/molgenis-frontend:PR-XYZ and get deployed to the kubernetes cluster, as a proxy in front of master.dev.molgenis.org 

#### Merges with master
Merges with the master automatically will deploy on npmjs.org.

#### Releases
A release will automatically be done when an app is merged with the master.
Lerna will determine which modules need to be released and what type of increment is needed based
on the git log. Please use conventional commits so that this is determined correctly.

For more information, see the `lerna version` [command documentation](https://github.com/lerna/lerna/tree/master/commands/version#readme).

The modules are published to our [stable repository](https://registry.npmjs.org/molgenis-ui)

#### Deployment
When the packages are published they will be automatically deployed based upon the app-configuration in each MOLGENIS instance. The service which serves the packages is at the moment https://unpkg.com. This service serves and NPM bundle as a bundle of files.

Unpackage fetches tgz packages from npm ( @molgenis-ui ) and unzips and serves them.
unpkg.com forwards requests to versioned requests.

**Example configuration:**

@molgenis-ui/navigator has versions: 1.0.0 , 2.0.1, 2.1.2

```unpkg/@molgenis-ui/navigator```
 is forwarded to 
```unpkg/@molgenis-ui/navigator@2.1.2 ( latest )```

```unpkg/@molgenis-ui/navigator@2.0.1```
 Is not  forwarded ( version request )

```unpkg/@molgenis-ui/navigator@~2```
 is forwarded to 
```unpkg/@molgenis-ui/navigator@2.0.1 ( latest within major )```

### Developing packages
There are two ways to develop a package:

1. [Make a standalone setup and mock the API responses](#make-a-standalone-setup)
2. [Proxy the package in front of a MOLGENIS backend](#proxying-molgenis-backend) 

> **note: the ordering of the ways to test the packages is important.**
>
>The first and second test manners should be sufficient to actually be confident that your application works. In the preview mode, 
where you already integrated the artifact in MOLGENIS you also test the integration. 

#### Make a standalone setup
You always want to start with an offline setup for the package. You then need to define the state and mock 
responses first and have to think about the API you want to use. In cli2 and cli3 the setup is different so 
both are described.  

##### cli2
When you are creating a standalone setup in cli2 you need to add an ```index.html``` file (is generated automatically).
Besides this you need to add mock responses to supply you **store**. You can add them in ```#package#/config/index.js```. 

*Example:*

```javascript
...
const listOfItems = require('./dev-responses/list.js')
...
  before (app) {
      app.get('#apipath#', function (req, res) {
        res.json(listOfItems)
      })
...
```

This before block is used by the **store** instead of accessing the real end-points. This is also used by the end-to-end tests to test the ui.

> note: You need to use yarn to install, test, serve and develop the package. Check: [Usage of yarn](#usage-of-yarn) (cli2).

##### cli3
When you are creating a standalone setup in cli3 you need to add an ```index.html``` file (is generated automatically).
Besides this you need to add mock responses to supply you **store**. You can add them in ```vue.config.js```.

A template of ```vue.config.js``` can be found here:

```javascript
// vue.config.js
module.exports = {
  chainWebpack: config => {
    config.externals({
      '#external library key#': '#library name#'
    })
  },
  devServer: {
    // In CI mode, Safari cannot contact "localhost", so as a workaround, run the dev server using the jenkins agent pod dns instead.
    host: process.env.JENKINS_AGENT_NAME || 'localhost',
    // Do not proxy in production to allow for mocking api response in e2e test ( e2e tests are run in production mode)
    proxy: process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:8080',
    before: function (app, server) {
      app.get('#api path#', function (req, res) {
        res.json({
          href: '#href api#',
          items: [
            {
              _href: '#item href#',
              code: '#item code#',
            },
          ]
        })
      })
    }
  }
}
```

 
*Example:* 
 
```javascript
...
const listOfItems = require('./dev-responses/list.js')
...
  before: function (app, server) {
      app.get('#api path#', function (req, res) {
        res.json(listOfItems)
      })      
...
``` 

This before block is used by the **store** instead of accessing the real end-points. This is also used by the end-to-end tests to test the ui.

> note: You need to use yarn to install, test, serve and develop the package. Check: [Usage of yarn](#usage-of-yarn) (cli3). 



#### Proxying MOLGENIS backend
We now have two configurations for the VUE packages. One based on [vue-cli2](https://cli.vuejs.org/guide/creating-a-project.html#using-the-gui) and one based on [vue-cli3](https://cli.vuejs.org/guide/creating-a-project.html#vue-create).

##### cli2
You need to configure the MOLGENIS backend in the index.js of the vue configuration. It is usually placed here: ```#package#/config/index.js```

You need to: 'add, change or leave it as it is', this configuration block:

*Example:*

```javascript
...
dev: {
    ...
    proxyTable: {
      '/login': {
        target: 'http://localhost:8080'
      },
      '/api': {
        target: 'http://localhost:8080'
      },
      '/plugin/#package#': {
        target: 'http://localhost:8080'
      }
    },
...
```

You need to add the paths that are used by the package. In this case:

```javascript
- '/login'
- '/api'
- '/plugin'
```

The idea is that we lean as much on public API's as possible. Then we do not need lot's of specific webservices for plugins.

> note: You need to disable the ```before```-block in the ```#package#/config/index.js```. This way you are making sure that 
the package is not using the mock responses.


##### cli3
In cli3 you have a lot less configuration. Default the vue configuration is located partially in the ```package.json``` and in ```vue.config.js```. 
To proxy we need to amend the ```vue.config.js```.

*Example:*

```javascript
...
 'devServer': {
    proxy: process.env.NODE_ENV === 'production' ? undefined : {
      '^/login': {
        'target': 'http://localhost:8080'
      },
      '^/api': {
        'target': 'http://localhost:8080'
      },
      '^/plugin/#package#': {
        'target': 'http://localhost:8080'
      },
...
```

You need to add the paths that are used by the package. In this case:

```javascript
- '/login'
- '/api'
- '/plugin'
```

The idea is that we lean as much on public API's as possible. That we do not need lot's of specific webservices for plugins.

> note: You need to disable the ```before```-block in the ```vue.config.js```. This way you are making sure that 
the package is not using the mock responses.

## Add a MOLGENIS plugin for the package
There is a workflow you have to follow to add a new frontend package as a plugin in [molgenis/molgenis](https://github.com/molgenis/molgenis).
This is used for the stable apps, core features of MOLGENIS that should always be available on all deployments.

### Create a [molgenis/molgenis-my-app](https://github.com/molgenis/molgenis) module to serve your new app
You need three files:

- pom.xml
- src/main/java/org/molgenis/my/app/MyAppController.java
- src/main/resources/templates/view-my-app.ftl

You have to create a module with the following inside your ```pom.xml```:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <parent>
    <groupId>org.molgenis</groupId>
    <artifactId>molgenis</artifactId>
    <version>#molgenis version#</version>
  </parent>

  <artifactId>molgenis-my-app</artifactId>
  <name>#new app#</name>
  <description>Plugin module for serving new app.</description>

  <dependencies>
    <dependency>
      <groupId>javax.servlet</groupId>
      <artifactId>javax.servlet-api</artifactId>
      <scope>provided</scope>
    </dependency>
      <dependency>
          <groupId>org.springframework</groupId>
          <artifactId>spring-webmvc</artifactId>
      </dependency>
      <dependency>
          <groupId>org.molgenis</groupId>
          <artifactId>molgenis-web</artifactId>
          <version>${project.version}</version>
          <scope>compile</scope>
      </dependency>
      <dependency>
          <groupId>org.molgenis</groupId>
          <artifactId>molgenis-security</artifactId>
          <version>${project.version}</version>
          <scope>compile</scope>
      </dependency>
      <!-- start optional -->
      <dependency>
        <groupId>org.molgenis</groupId>
        <artifactId>#dependant module#</artifactId>
        <version>${project.version}</version>
      </dependency>
      <!-- end optional -->  
  </dependencies>

</project>
```

* Add the new module to the module list in the pom.xml in the root dir.
* Add the new module as to the `<dependencies>` block of the pom.xml of the `molgenis-app` module.

You create in ```src/main/resources/templates/``` a ```view-my-app.ftl``` view template with the content below.

```injectedfreemarker
<#include "resource-macros.ftl">
<#include "molgenis-header.ftl">
<#include "molgenis-footer.ftl">

<#assign js = []>
<#assign css = ["/@molgenis-ui/my-app/dist/css/app.css"]>
<#assign version = 2>

<@header css js version/>
<div id="app"></div>

<script type="text/javascript">
        window.__INITIAL_STATE__ = {
            baseUrl: '${baseUrl}',
            lng: '${lng}',
            fallbackLng: '${fallbackLng}',
            isSuperUser: ${isSuperUser?c}
        }
    </script>
<script type=text/javascript src="/@molgenis-ui/my-app/dist/js/manifest.js"></script>
<script type=text/javascript src="/@molgenis-ui/my-app/dist/js/vendor.js"></script>
<script type=text/javascript src="/@molgenis-ui/my-app/dist/js/app.js"></script>
<@footer version/>
```
Note that there can be *no* chunks in the URLs.

You have to create a file `MyAppController.java` in ```src/main/java/org/molgenis/my/app``` with a tiny PluginController that serves the template:

```java
package org.molgenis.data.my.app;

import static java.util.Objects.requireNonNull;
import static org.molgenis.data.my.app.MyAppController.URI;

import org.molgenis.web.PluginController;
import org.molgenis.web.menu.MenuReaderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(URI)
public class MyAppController extends PluginController {
  private static final Logger LOG = LoggerFactory.getLogger(MyAppController.class);

  public static final String ID = "my-app";
  public static final String URI = PluginController.PLUGIN_URI_PREFIX + ID;
  private static final String KEY_BASE_URL = "baseUrl";

  public static final String VIEW_TEMPLATE = "view-my-app";
  private final MenuReaderService menuReaderService;

  public MyAppController(MenuReaderService menuReaderService) {
    super(URI);
    this.menuReaderService = requireNonNull(menuReaderService);
  }

  @GetMapping("/**")
  public String init() {
    model.addAttribute(KEY_BASE_URL, menuReaderService.findMenuItemPath(ID));
    return VIEW_TEMPLATE;
  }
}
```

That is it.

### Preview frontend with alternative backend using CI rancher cluster

You can link the generated PR preview to an alternative backend preview
- Login to rancher ( or use cli).
- Find the preview config ( Menu item 'config-maps', use search to find the preview version you are looking for).
- Edit the ...-config file, change the 'proxy_pass' location to use the alternative backend service ( save after edit).
- Go to the Workloads page and find the preview version you are looking for.
- Scale down to 0, and scale back up to 1 ( this will create a new container that uses the updated config).
 
## Guidelines
Below you can find some guidelines + code examples for stuff that we view is standard when creating a MOLGENIS plugin.

**Use Font awesome for icons[<sup>1</sup>](#guidelines-1)**


```html
<i class="fa fa-plus"></i>
```

**Write unit tests for mutations, actions, getters and other pure JS code**
```js

// utils.spec.js

import { swapArrayElements } from 'utils'

describe('swapArrayElements', () => {
    it('should swap the location of two objects in an array', () => {
        const array = [1, 2, 3, 4, 5]

        const actual = swapArrayElements(array, 2, 3)
        const expected = [1, 2, 4, 3, 5]

        expect(expected).to.deep.equal(actual)
    })
})
```

**Create named Vue components**
```js

// ComponentA.vue

<script>
    export default {
        name: 'component-A'
    }
</script>
```

**To allow theme changes to affect all specific color sets, use sass mixins and variables[<sup>1</sup>](#guidelines-1) when setting colors** 
```scss
<style lang="scss">
  @import "~variables";
  @import "~mixins";
  
   .some_class {
      background-color: $red;
    }
    
    .some_other_class {
      background-color: darken($red, 20%)
    }
</style>
```

**When using Vuex for your state, use TypeScript to add typing your state parameters[<sup>1</sup>](#guidelines-1)**
```js

// state.js
export type State = {
  message: ?string
  isUpdated: boolean
}

const state: State = {
  message: null,
  isUpdated: false
}
```

**Use i18n for labels**
```html
<button>{{ 'back-to-home-button' | i18n }}</button>
```

**When writing actions or mutations for your store, use constants for the different types**
```js

// mutations.js
export default {
    'setMessage' (state, message) {
        state.message = message
    }
}
```

# Jenkins CI/CD

## Pull requests / commits to pull requests
Whenever a PR is created or commits are being made to a PR
a trigger is sent to Jenkins to start building a preview.

For our build we use Lerna. We let Lerna check against the change target (mostly master)
to see which packages have been changed and only test / build those.

## Build script
You can find a custom build script that checks if a dist folder exists (eg, has been created by Lerna) and copies that to a temp docker dir.

```
docker/copy_package_dist_dirs.sh
```

## Preview container
For the preview we have some special nginx config

```
docker/preview-config/conf.d/preview.conf
```

which will proxy all packages to master.dev.molgenis.org that have not been found in the preview container 
