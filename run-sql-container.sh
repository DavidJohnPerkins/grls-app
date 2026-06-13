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

run_container \
    "sql1" \
    "mcr.microsoft.com/mssql/server:2022-latest" \
        "-e 'ACCEPT_EULA=Y' \
        -e 'MSSQL_SA_PASSWORD=D04v03tD' \
        --rm \
        --hostname volinst \
        --name sql1 \
        -p 1433:1433 \
        -v /Users/davidperkins/sqlvolumes/data:/var/opt/mssql/data \
        -v /Users/davidperkins/sqlvolumes/log:/var/opt/mssql/log \
        -v /Users/davidperkins/sqlvolumes/secrets:/var/opt/mssql/secrets \
        --network grls" 
