#!/bin/bash

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

run_container "grls-api" "grls-api" "-e DATABASE_URL=sqlserver://sa:D04v03tD@sql1:1433?encrypt=disable&database=TestDB&instance=sql1 -p 8080:8080 --rm --network grls"
# run_container "sql1" "mcr.microsoft.com/mssql/server:2022-latest" "-e 'ACCEPT_EULA=Y' -e 'MSSQL_SA_PASSWORD=D04v03tD' \
# --rm \
# --hostname volinst --name sql1 -p 1433:1433 \
# -v ~/sqlvolumes/data:/var/opt/mssql/data \
# -v ~/sqlvolumes/log:/var/opt/mssql/log \
# -v ~/sqlvolumes/secrets:/var/opt/mssql/secrets --network grls"
run_container "grls-frontend" "grls-frontend" "-e MIDDLEWARE_URL=grls-api  -v /Users/davidperkins/public/grls-image:/app/images -p 3000:3000 --rm --network grls -d"

echo "All containers running."
