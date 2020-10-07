# 4. Molgenis Core Apps

Date: 2020-09-23

## Status

Proposal

## Context

See [frontend architecture sessions](https://docs.google.com/document/d/1VW3ah5VAvAz2KnqNZlNmVqCzFhBMlIcjPPUlsHMFRIY/) for additional background
information on micro-frontend/SPA architecture.

Molgenis is flexible software that allows users to create their own apps.
This is quite powerful whenever a new, custom application needs to be made
on top of the Molgenis backend. However, the same modular paradigm is also
being applied to parts of the frontend, that are always being shipped with
Molgenis.

At this time, we have approximately 12 legacy Molgenis apps that are still
rooted in Molgenis freemarker templates and Java controllers. There are
about 11 new-style Unpkg frontend applications. The Unpkg applications
all come with their own package configuration, release cycle, build tools
and testsuites; all glued together in the Nginx proxy, so they are
approachable from the same domain.

## Decision

The keyword here is convergence; the act of converging and especially moving
toward union or uniformity. This means that Molgenis frontend core is going
to be one Vue application, in which all components from the 11 existing Unpkg
applications are merged together in a single frontend package. Instead of
glueing them together with Nginx, we will do this using Vue-router and
Vuex modules. Instead of having 11 app versions, we will use one frontend
version and use git tags to mirror each Molgenis release.

## Consequences

This [frontend spike](https://github.com/molgenis/frontend-spike) already
proved that merging existing Unpkg apps together isn't that technically
challenging. Vuex modules provides namespacing with minimal changes.

An open question is how to integrate legacy applications in the resulting SPA.
The answer is: we shouldn't attempt to integrate them to close.  I've seen several attempts so far to integrate legacy applications in a SPA, using iframe wrappers
and IPC.

Instead of spending energy and time into such a workaround, we should just keep
the styling and layout of both solutions in sync, until the last legacy
module has been moved to the new frontend. We should still use the same
unpkg mechanism, but we just point it to the new frontend package using a
URL like: https://master.dev.molgenis.org/v2/

The Nginx proxy config needs to be updated, to be able to support history
routing on this endpoint, so that uri's like **/v2/dataexplorer** and **/v2/navigator**
route to the correct frontend view.
