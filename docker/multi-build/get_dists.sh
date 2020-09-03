#!/bin/sh
# Creates all dists using unpackage, so that we can get a preview without building everything
for file in packages/*; do 
    mkdir -p "${WORKSPACE}/packages/${file}/dist"  
    curl -O "https://unpkg.com/browse/@molgenis-ui/${file}/dist/" --output "${WORKSPACE}/packages/${file}/dist/"    
done