until nc -z -v -w30 $SQL_HOST $SQL_PORT
do
  echo "Waiting for database connection..."
  # wait for 5 seconds before check again
  sleep 5
done