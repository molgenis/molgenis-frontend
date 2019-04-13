#!/bin/sh
cd "$(dirname "$0")"
rm -rf dist
mkdir dist
cp -rf ../packages/*/dist/* dist