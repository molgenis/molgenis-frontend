#!/bin/sh
# Copies the package styleguide dirs to the docker context so that they can be copied to container.
rm -rf docker/preview-config/styleguide
mkdir -p docker/preview-config/styleguide
if [ -d "packages/components-library/styleguide" ]; then
  cp -rf "packages/components-library/styleguide" "docker/preview-config/styleguide"
fi
