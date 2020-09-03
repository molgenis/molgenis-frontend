#!/bin/sh
# Copies the package dist dirs to the docker context so that they can be copied to container.
rm -rf docker/preview-config/dist
mkdir -p docker/preview-config/dist/@molgenis-ui
# mkdir -p docker/preview-config/dist/@molgenis-experimental
for file in packages/*; do 
    mkdir -p "docker/preview-config/dist/@molgenis-ui/$(basename "$file")/dist"
    # mkdir -p "docker/preview-config/dist/@molgenis-experimental/$(basename "$file")/dist"
    # if test -f "${file}/dist"; then
    cp -rf "${file}/dist" "docker/preview-config/dist/@molgenis-ui/$(basename "$file")"
    # cp -rf "${file}/dist" "docker/preview-config/dist/@molgenis-experimental/$(basename "$file")"
    # else
    # curl -o "https://unpkg.com/browse/@molgenis-ui/${file}/dist/" --output-dir "docker/preview-config/dist/@molgenis-ui/$(basename "$file")"     
    # fi
done