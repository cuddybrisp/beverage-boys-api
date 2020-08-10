#!/bin/bash

API="http://localhost:4741"
URL_PATH="/beverages"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
--header "Authorization: Bearer ${TOKEN}" \
--data '{
  "beverage": {
    "name": "'"${NAME}"'",
    "ounces": "'"${OUNCES}"'",
    "finished": "'"${FINISHED}"'"
    }
  }'

echo
