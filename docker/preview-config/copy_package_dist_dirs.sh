#!/bin/sh
# Copies the package dist dirs to the docker context so that they can be copied to container.
rm -rf docker/preview-config/dist
mkdir -p docker/preview-config/dist/@molgenis-ui
touch docker/preview-config/dist/@molgenis-ui/heartbeat.txt
for file in packages/*; do 
    if [ -d "${file}/dist" ]; then
    mkdir -p "docker/preview-config/dist/@molgenis-ui/$(basename "$file")/dist"
    cp -rf "${file}/dist" "docker/preview-config/dist/@molgenis-ui/$(basename "$file")"
    fi
done