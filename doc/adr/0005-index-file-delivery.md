# 5. Index file delivery

Date: 2020-11-09

## Status

Proposal

## Context

*See [frontend architecture sessions](https://docs.google.com/document/d/1VW3ah5VAvAz2KnqNZlNmVqCzFhBMlIcjPPUlsHMFRIY/)
for background information on micro-frontend/SPA architecture.*

We need a consistent method to serve the index file for our frontend
application.

## Decision

We are going to use a serverside generated index file for *@molgenis-ui/core*
app, so we can easily and efficiently pass context from the Molgenis server to our
client application.

## Consequences

* Index templates (e.g. view-navigator.ftl, view-search-all.ftl) should be merged
