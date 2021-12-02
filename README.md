## Service Monitor

### Pre-requitsites

- Docker must be installed on the system
- Java 11 (this is required to build the application)
- Node (required to build the frontend application)

### How to bootstrap the  application?

Run the following command to bootstrap the application:

`sh build.sh`

This command will do the following:
- builds the backend service
- builds the frontend service
- run docker compose to start the frontend server, backend service and  database


Note: if the above script doesn't work for some reason then follow the steps below.

## Manual Bootstrapping

1. Navigate to the monitoring-backend
2. Run: `./gradlew clean build`
3. Navigate to the monitoring-frontend
4. Run `npm run build`
5. Navigate to project root and run `docker-compose up --build --force-recreate --no-deps`








