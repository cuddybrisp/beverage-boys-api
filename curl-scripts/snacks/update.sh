#!/bin/bash

API="http://localhost:4741"
URL_PATH="/snacks"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
--header "Authorization: Bearer ${TOKEN}" \
--data '{
  "snack": {
    "name": "'"${NAME}"'",
    "servings": "'"${NUMBER}"'",
    "finished": "'"${FINISHED}"'"
    }
  }'

echo
