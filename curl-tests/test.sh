#! /bin/bash

echo "test: returns 200 and text \"HTTP me!\" for /"
OUTPUT=$(curl -vs "http://127.0.0.1:7676/" 2>&1)
grep -qF "200 OK" <<< "$OUTPUT" || { echo 'status not 200' ; exit 1; }
grep -qF "HTTP me!" <<< "$OUTPUT" || { echo 'unexpected response content' ; exit 1; }

echo "test: returns 200 and json including \"newField\": \"newValue\" for /json"
OUTPUT=$(curl -vs "http://127.0.0.1:7676/json" 2>&1)
grep -qF "200 OK" <<< "$OUTPUT" || { echo 'status not 200' ; exit 1; }
grep -qF "\"newField\":\"newValue\"" <<< "$OUTPUT" || { echo 'unexpected response content' ; exit 1; }
