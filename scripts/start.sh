git pull origin main
cd ..
cd database
docker compose up -d

cd ..
cd redis
docker compose up -d

cd ..
npm i
npm run db:push
npm run all
