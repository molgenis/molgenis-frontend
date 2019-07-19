#!/bin/sh
# Copies the package dist dirs to the docker context so that they can be copied to container.
rm -rf docker/preview/dist
mkdir -p docker/preview/dist/@molgenis-ui
for file in packages/*; do 
    mkdir -p "docker/preview/dist/@molgenis-ui/$(basename "$file")/dist"
    cp -rf "${file}/dist" "docker/preview/dist/@molgenis-ui/$(basename "$file")"
done