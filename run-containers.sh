#!/bin/bash
stop_container() {
    NAME=$1
    echo "Stopping $NAME..."
    docker stop "$NAME" >/dev/null 2>&1 || echo "$NAME was not running"
    docker rm "$NAME" >/dev/null 2>&1 || echo "$NAME was not present"
}

run_container() {
    NAME=$1
    IMAGE=$2
    ARGS=$3
    echo $ARGS
    echo "Starting $NAME..."
    if docker run -d --name "$NAME" $ARGS "$IMAGE"; then
        echo "$NAME started."
    else
        echo "Failed to start $NAME."
        exit 1
    fi
}

stop_container "grls-api"    
run_container \
    "grls-api" \
    "grls-api" \
    "-e DATABASE_URL=sqlserver://sa:D04v03tD@sql1:1433?encrypt=disable&database=TestDB&instance=sql1 \
    -p 8080:8080 \
    --rm \
    --network grls"

stop_container "grls-frontend"
run_container \
    "grls-frontend" \
    "grls-frontend" \
    "-e MIDDLEWARE_URL=grls-api \
    -v /Users/davidperkins/public/grls-image:/app/images \
    -p 3000:3000 \
    --rm \
    --network grls \
    -d"

echo "All containers running."
