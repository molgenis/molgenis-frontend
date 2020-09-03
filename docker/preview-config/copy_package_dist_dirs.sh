#!/bin/sh
# Copies the package dist dirs to the docker context so that they can be copied to container.
rm -rf docker/preview-config/dist
mkdir -p docker/preview-config/dist/@molgenis-ui
mkdir -p docker/preview-config/dist/@molgenis-experimental
for file in packages/*; do 
    if test -f "${file}/dist"; then
    mkdir -p "docker/preview-config/dist/@molgenis-ui/$(basename "$file")/dist"
    mkdir -p "docker/preview-config/dist/@molgenis-experimental/$(basename "$file")/dist"
    cp -rf "${file}/dist" "docker/preview-config/dist/@molgenis-ui/$(basename "$file")"
    cp -rf "${file}/dist" "docker/preview-config/dist/@molgenis-experimental/$(basename "$file")"
    fi
done