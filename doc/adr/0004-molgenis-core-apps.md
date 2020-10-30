# 4. Molgenis Core Apps

Date: 2020-10-22

## Status

Proposal

## Context

See [frontend architecture sessions](https://docs.google.com/document/d/1VW3ah5VAvAz2KnqNZlNmVqCzFhBMlIcjPPUlsHMFRIY/)
for additional background information on micro-frontend/SPA architecture.

Molgenis is flexible software that enables its users to create their own apps.
This is useful for custom applications, made on top of the Molgenis backend.
However, the same micro-architecture paradigm is also applied to parts of
the frontend that are *always* being shipped with Molgenis. We call these
admin-like Molgenis apps "core packages".

At the moment there are 11 legacy admin-like apps. These apps have freemarker
templates and Java controllers, but also legacy JavaScript files within Molgenis:

```code
feedback logmanager jobs mappingservice permissionmanager scheduledjobs
sorta tagwizard thememanager useraccount usermanager data-explorer 1
```

There are 12 Unpkg-style frontend core apps. These apps still have Java Controllers
and freemarker templates, but have external JavaScript frontend projects. The Data
Explorer 2 is slightly different; it also comes with its own static index file:

```code
appmanager data-row-edit importwizard navigator one-click-importer questionnaires
scripts searchAll security-ui settings data-explorer 2 metadata-manager
```

The Unpkg JavaScript frontend apps all include their own package configuration,
release cycle, build tools and testsuites; glued together in the Nginx proxy.
In theory, by separating parts of the frontend application in packages, some
form of compartmentalization between components and application parts is
enforced. In practice, it seems to lead to some problematic issues:

* Toolchains become out-of-date and out-of-sync
* Frontend styling and layout is inconsistent between apps
* Slow app experience due to sub-optimal use of Vue-router (page reloads when unnecessary)
* Inconsistent/mixed use of urls (routes & hardcoded paths)
* Uncommon UX-patterns due to the lack of shareable components; components that
should only be sharable within the context of molgenis core apps (e.g. no components-library)
* Fixes are applied partially, due to release-cycles and dependencies that discourage applying them beyond one app

As a result, features take longer than necessary to implement and quality
suffers. By incrementally merging core apps together, we would be able to
gradually reduce the amount of packaging and versioning, making it easier to
keep the build toolchain up-to-date and develop the frontend from a more
holistic perspective. At the same time, users and E2E tests will benefit from
a faster app, due to maintaining state between views.

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
