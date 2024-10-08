#!/bin/bash
set -e

echo "Initializing databases..."

# Создаём базы
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE DATABASE b_db_auth;
    CREATE DATABASE b_db_events;
    CREATE DATABASE b_db_participants;
EOSQL

echo "Databases created successfully."
