#!/bin/sh
# Copies the package dist dirs to the docker context so that they can be copied to container.
rm -rf docker/preview-config/dist
mkdir -p docker/preview-config/dist/@molgenis-ui
for file in packages/*; do 
    mkdir -p "docker/preview-config/dist/@molgenis-ui/$(basename "$file")/dist"
    cp -rf "${file}/dist" "docker/preview-config/dist/@molgenis-ui/$(basename "$file")"
done