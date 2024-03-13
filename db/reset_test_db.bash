 $(> db/tests.sqlite) 
 
 cat db/migrate.sql | sqlite3 db/tests.sqlite

echo 'ok'