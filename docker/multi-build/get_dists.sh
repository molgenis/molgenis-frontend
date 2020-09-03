#!/bin/sh
# Creates all dists using unpackage, so that we can get a preview without building everything
for file in packages/*; do 
    mkdir -p "${file}/dist"  
    curl -o "https://unpkg.com/browse/@molgenis-ui/${file}/dist/" --output-dir "${file}/dist"   
done