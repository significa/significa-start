#!/usr/bin/env bash -e
echo '
###
Creating environment variables file
###'
sh ./appcenter_envar.sh

echo '
###
Setup script
###'
sh ./fastlane.sh