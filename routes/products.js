var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var router = express.Router();
// open the database
var db = new sqlite3.Database('./mydb.db');
// queries
var sqlGetAllProducts = `SELECT * FROM products`;
var sqlGetProductsById = `SELECT * FROM products WHERE product_id = `;
var sqlGetInventoryById = `SELECT * FROM inventory WHERE product_id = `;

/* GET products listing. */
router.get('/', (req, res, next) => {
    db.all(sqlGetAllProducts, [], (err, rows) => {
    	if (err) {
    		throw err;
    	}
    	res.json(rows);
    });
});

/* GET products by id */
router.get('/:id', (req, res, next) => {
    db.all(sqlGetProductsById + req.params.id, [], (err, rows) => {
    	if (err) {
    		throw err;
    	}
    	res.json(rows);
    });
});

/* GET inventory by id */
router.get('/:id/inventory', (req, res, next) => {
    db.all(sqlGetInventoryById + req.params.id, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
});

module.exports = router;
