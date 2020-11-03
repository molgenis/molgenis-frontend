# 4. Molgenis Core Apps

Date: 2020-10-22

## Status

Proposal

## Context

*See [frontend architecture sessions](https://docs.google.com/document/d/1VW3ah5VAvAz2KnqNZlNmVqCzFhBMlIcjPPUlsHMFRIY/)
for background information on micro-frontend/SPA architecture.*

Molgenis is flexible software that enables its users to create their own
frontend apps. This is useful for custom applications, made on top of a
Molgenis backend. However, the same micro-architecture paradigm is
applied to parts of the frontend that are *always* being shipped with
Molgenis. We call these admin-like Molgenis apps "core packages".

At the moment there are 11 legacy admin-like apps in Molgenis. They are comprised
of freemarker templates, Java controllers and legacy JavaScript files:

```code
feedback logmanager jobs mappingservice permissionmanager scheduledjobs
sorta tagwizard thememanager useraccount usermanager data-explorer 1
```

There are 12 Unpkg-style admin-like apps. These apps still consist of Java
Controllers and freemarker templates, but have external JavaScript frontend
projects. The Data Explorer 2 is slightly different; it also comes with its own
static index file:

```code
appmanager data-row-edit importwizard navigator one-click-importer questionnaires
scripts searchAll security-ui settings data-explorer 2 metadata-manager
```

The Unpkg JavaScript frontend apps all include their own package configuration,
versioning, release cycles, build tools and testsuites; glued together in the
Nginx [proxy config](https://github.com/molgenis/molgenis-frontend/blob/master/docker/proxy-config/proxy.d/frontend/stable.conf). In theory, by splitting the frontend application in
loose packages, some form of compartmentalization between components and
application parts is being enforced through separate versioning. In practice
however, it leads to some problematic issues, which mostly have to do with a
lack of DRY:

* Sub-optimal build tools - too many toolchains to maintain
* Incomplete fixes - changes may well be beyond app boundaries
* Inconsistent html & styling - app boundaries discourage consistency refactoring
* Poor app performance - excessive bundle size, unnecessary page-reloads(Vue-router)
* Inconsistent UX - lack of component reuse within the context of molgenis core apps

As a result, features take longer to implement and quality decreases. By
incrementally merging core apps together, we would be able to gradually reduce
the amount of required packaging and versioning, making the release process
easier. Also, we would be able to keep build tools up-to-date and optimize the
app for better performance for its user anad and E2E tests.


Th and develop the
frontend from a more holistic perspective.

## Decision

We would like to incrementally decide on merging admin apps in the "@molgenis-ui/core"
app. This would allow us to first get a grasp of the impact of these changes,
while designing a blueprint for merging other apps. At the end of this process,
we will have a clear notion of whether these changes are beneficial to the
Molgenis project. The apps that we are going to pick are already similar in
terms of tooling and libraries (Vue-router & Vuex):

* navigator (unpkg/vuex/router/jest/test-utils)
* data explorer 2 (unpkg/vuex/router/jest/test-utils)
* theme-manager (legacy)

## Consequences

We would get rid of DE2's own index.html and add a common endpoint(e.g. **/app**)
and Freemarker template to Molgenis, similar to how other Unpkg app are served.
This common endpoint will serve the index file for the core app and all the
necessary INITIAL_STATE.

We are **not** going to change the current Webpack/Vue CLI setup at this moment.
At the same time, we have to be prepared replace it with a more modern bundler
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
history routing, instead of hashbang routing, e.g.:

```bash
/app/explorer
/app/navigator
/app/themes
```
