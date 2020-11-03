# 4. Molgenis Core Apps

Date: 2020-10-22

## Status

Proposal

## Context

*See [frontend architecture sessions](https://docs.google.com/document/d/1VW3ah5VAvAz2KnqNZlNmVqCzFhBMlIcjPPUlsHMFRIY/)
for background information on micro-frontend/SPA architecture.*

Molgenis is flexible software that enables its users to create their own
frontend apps. This is useful to build custom frontend applications against
a Molgenis backend. However, the same micro-architecture paradigm is also
applied to parts of the frontend that are *always* being shipped with
Molgenis. We call these admin-like Molgenis apps "core packages".

At the moment there are 11 legacy admin-like apps that are bundled with Molgenis.
These apps are comprised of freemarker templates, Java controllers and legacy
JavaScript files:

```code
feedback logmanager jobs mappingservice permissionmanager scheduledjobs
sorta tagwizard thememanager useraccount usermanager data-explorer 1
```

Then there are 12 Unpkg-style admin-like apps, which are quite similar to the
legacy apps, except that they have separate JavaScript frontend projects. All
of these apps still use Molgenis to generate an initial index.html file.
Data Explorer 2 is slightly different; it also comes with its own static index
file. The unpkg-style apps are:

```code
appmanager data-row-edit importwizard navigator one-click-importer questionnaires
scripts searchAll security-ui settings data-explorer 2 metadata-manager
```

All of these Unpkg JavaScript frontend apps include their own package
configuration, versioning, release cycles, build tools and testsuites; glued
together in the Nginx [proxy config](https://github.com/molgenis/molgenis-frontend/blob/master/docker/proxy-config/proxy.d/frontend/stable.conf). In theory, by splitting the frontend
application in loose packages, some form of compartmentalization between components
and application parts is being enforced through separate versioning. In practice,
maintaining that many packages to build -  what is essently one middle-sized
frontend app - leads to problematic development symptoms:

* outdated/sub-optimal build tools - 12 toolchains to maintain
* packaging & versioning x12 - massive amount of packages to resolve
* Incomplete fixes - changes ofen span beyond app boundaries
* Inconsistent html & styling - app boundaries discourage consistency refactoring
* Poor app performance - excessive bundle size, unnecessary page-reloads(Vue-router)
* Inconsistent UX - lack of component reuse within the context of molgenis core apps

Features take considerably longer to implement and quality decreases as long as
we won't handle the underlying cause; a lack of DRY. The solution is to simplify
our frontend, by incrementally merging core apps together. This would gradually
result in more optimal build tools and less packaging & versioning. It sets
the right conditions to build the Molgenis frontend from a holistic perspective,
which hopefuly results in better fixes, more layout & UX consistency and a better
app performance.

## Decision

We would like to incrementally decide on merging admin apps in the "@molgenis-ui/core"
app. This would allow us to get a grasp of the impact of these changes, while designing a
blueprint for merging other apps. At the end of this process, we will have a clear
notion of whether these changes are beneficial to the Molgenis project.
The apps that we are going to pick are already similar in terms of tooling and
libraries (Vue-router & Vuex):

* navigator (unpkg/vuex/router/jest/test-utils)
* data explorer 2 (unpkg/vuex/router/jest/test-utils)
* theme-manager (legacy)

## Consequences

We would get rid of DE2's own index.html and add a common endpoint(e.g. **/app**)
and Freemarker template to Molgenis, similar to how other Unpkg app are served.
This common endpoint will serve the index file for the core app and all of the
necessary INITIAL_STATE.

We are **not** going to change the current Webpack/Vue CLI setup for now. At the
same time, we have to be prepared to replace it with a more modern bundler
when we're going further down this road.

We will correctly use Vue-router to connect the applications together and
use clean URLS to do so. Both the Vuex stores are implemented using Vuex
modules. Urls may look like:

```bash
/app#/explorer
/app#/navigator
/app#/themes
```

Not a necessity, but we could make the URL a bit prettier by modifying the
Nginx config with a wildcard on the  **/app/** URI, so we could use
history routing instead of hashbang routing:

```bash
/app/explorer
/app/navigator
/app/themes
```
