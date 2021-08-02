#!/usr/bin/env bash
# Creates an .env from ENV variables for use with react-native-dotenv
ENV_WHITELIST=${ENV_WHITELIST:-"^RN_"}
printf "\nCreating an .env file with:\n"
set | egrep -e $ENV_WHITELIST | sed 's/^RN_//g' > .env
cat .env