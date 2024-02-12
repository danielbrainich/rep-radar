#!/bin/bash

# Start the FastAPI application
echo "Starting FastAPI application..."
(cd back-end && uvicorn main:app --reload) &

# Start the React application
echo "Starting React application..."
(cd front-end && npm start) &

# Wait for any process to exit
wait
# Kill any remaining child processes on exit
trap "exit" INT TERM
trap "kill 0" EXIT


# to run this script:
#     run ./start-dev.sh from root directory
