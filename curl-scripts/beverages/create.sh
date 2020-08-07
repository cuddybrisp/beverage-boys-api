#!/bin/bash

API="http://localhost:4741"
URL_PATH="/beverages"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "beverage": {
      "name": "'"${TEXT}"'",
      "ounces": "'"${VALUE}"'",
      "finished": "'"${FINISHED}"'"
    }
  }'

echo
