# 4. Molgenis Core Apps

Date: 2020-10-22

## Status

Proposal

## Context

See [frontend architecture sessions](https://docs.google.com/document/d/1VW3ah5VAvAz2KnqNZlNmVqCzFhBMlIcjPPUlsHMFRIY/)
for additional background information on micro-frontend/SPA architecture.

Molgenis is flexible software that allows users to create their own apps.
This is quite powerful whenever a new, custom application needs to be made
on top of the Molgenis backend. However, the same modular paradigm is also
being applied to parts of the frontend that are always being shipped with
Molgenis. We call these admin-like apps Molgenis "core" packages.

As an assessment; there are at the moment approximately 11 legacy Molgenis apps
that are still rooted in Molgenis freemarker templates and Java controllers:

* feedback
* logmanager
* jobs
* mappingservice
* permissionmanager
* scheduledjobs
* sorta
* tagwizard
* thememanager
* useraccount
* usermanager
* data-explorer 1

There are about 12 Unpkg-style frontend applications:

* appmanager
* data-row-edit
* importwizard
* navigator
* one-click-importer
* questionnaires
* scripts
* searchAll
* security-ui
* settings
* data-explorer 2
* metadata-manager

The Unpkg applications all come with their own package configuration, release
cycle, build tools and testsuites; glued together in the Nginx proxy, which
makes them approachable from the same domain. The idea is that by identifying
conceptually similar core apps, and merging them together in a new "core" package,
we will greatly simplify our frontend stack. It means less apps and versions to
juggle with, less toolchains to maintain, less packages to install and a faster
user-experience in the app, because state between core apps is maintained
as a SPA using Vue-router. Apps that use Vuex are being compartimentalized
within the core app, using Vuex modules.

## Decision

The keyword here is convergence; the act of converging and especially moving
toward union or uniformity. This means that Molgenis core is going to be one
Vue application. Conceptually, it is no different than the existing unpkg-style
applications; e.g. we will not deal now with other related subjects like
index.html distribution. Instead, we will incrementally decide whether
an existing app can be moved into Molgenis the core package. To start with,
we will merge these two apps together in a new "core" package:

* navigator
* data-explorer 2

The reason to start with these two packages, is that their is quite a lot
of cross-navigation between the navigator and the data-explorer 2.

## Consequences

The navigator url will change from **/menu/main/navigator** to a similar
URI as Data Explorer 2:

/@molgenis-ui/core/dist/index.html#/navigator
/@molgenis-ui/core/dist/index.html#/explorer

Not a necessity, but we could make the URL a bit prettier by modifying the
Nginx config with a wildcard on the  **/core/** URI, so we could use
history routing, instead of hashbang routing, so **/core/#/explorer** becomes
**/core/explorer**.