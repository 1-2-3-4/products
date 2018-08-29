-- 
-- open db file
-- 
.open mydb.db

--
-- import products.csv into table "products"
-- csv is pipe delimited
--

.mode csv
.sep "|"
.import csv/products.csv products

--
-- import inventory.csv into table "inventory"
-- csv is pipe delimited
--

.mode csv
.sep "|"
.import csv/inventory.csv inventory