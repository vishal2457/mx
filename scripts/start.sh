cd database
docker compose up -d
cd ..

cd redis
docker compose up -d

npm i
npm run all
