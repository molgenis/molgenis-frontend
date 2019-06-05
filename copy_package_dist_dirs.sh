#!/bin/sh
# Copies the package dist dirs to the docker context so that they can be copied to container.
rm -rf docker/dist
mkdir -p docker/dist/@molgenis-ui
for file in packages/*; do 
    mkdir "docker/dist/$(basename "$file")"
    cp -rf "${file}/dist" "docker/dist/@molgenis-ui/$(basename "$file")"
done