# 3. Have App create app setting table 

Date: 2020-09-23

## Status

Accepted

## Context

Apps (for example the data-explorer-2 or the biobank-explorer) may need settings data to function properly. As these settings are dynamic (may be changed at run time), and may change between deployments these settings need to be stored somewhere (molgenis database). This poses two problems; 1) how to link the app with the settings data, 2) how to control access to the settings.

## Decision

We leave it up to the app to create the settings entity. Each app creates 0 or 1 settings entities. By default everyone can read the settings data. Depending on the app the entity contains 1 or more rows ( in case of multiple rows the app is responsible using the correct row(s) in each context).

## Consequences

If an app needs setting data to function properly, a user with sufficient rights needs to trigger the creation of the settings entity. If settings data may not been seen by some users/roles the app developer must use the permission api to restrict access. If a user without the rights to create settings data uses the app while the expected settings data is not there, the app should handle this. The app for example may use default settings or show a error message. 
