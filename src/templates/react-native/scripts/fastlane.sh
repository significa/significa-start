#!/bin/sh

echo '
###
1. Installing `graphicsmagick` 
fastlane-plugin-app-icon dependency
###'
brew install graphicsmagick

# Enter ios folder
cd ./ios

echo '
###
2. iOS: Installing Fastlane
###'
bundle install

echo '
###
3. iOS: Running Fastlane:beta
###'
bundle exec fastlane beta

cho '
###
4. Android: Not implement yet
###'