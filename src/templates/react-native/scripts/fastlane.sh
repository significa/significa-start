#!/bin/sh

echo '
1. Installing `graphicsmagick` 
A `fastlane-plugin-app-icon` dependency'
brew install graphicsmagick

echo '
2. Installing Fastlane'
bundle install

echo '
3. Running Fastlane'
bundle exec fastlane prep_build
