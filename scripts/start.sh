git pull origin main
cd database
docker compose up -d

cd redis
docker compose up -d

npm i
npm run db:push
npm run all
