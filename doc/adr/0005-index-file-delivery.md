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

We are going to use a clientside index file for the *@molgenis-ui/core*
app, so we can easily and efficiently pass context from the Molgenis server to our
client application.
