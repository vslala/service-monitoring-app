cd monitoring-backend
./gradlew clean build

cd ..
cd monitoring-frontend
npm run build

cd ..
docker-compose up --build --force-recreate --no-deps
