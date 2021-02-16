#!/bin/sh
ENV_WHITELIST=${ENV_WHITELIST:-"^RN"}
set | egrep -e $ENV_WHITELIST | egrep -v "^_" | egrep -v "WHITELIST" > .env
printf "\n.env created with contents:\n"
cat .env