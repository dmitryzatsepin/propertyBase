# Сброс таблицы locations - в отдельном терминале, подключившись к psql через docker exec
docker exec -it propertybase_postgres_dev psql -U dimpin -d propertybase_dev
TRUNCATE TABLE locations RESTART IDENTITY CASCADE;
\q