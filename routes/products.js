var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var router = express.Router();
// open the database
var db = new sqlite3.Database('./mydb.db');
// query 
var sql = `SELECT * FROM products`;

/* GET products listing. */
router.get('/', function(req, res, next) {
    db.all(sql, [], function(err, rows) {
    	if (err) {
    		throw err;
    	}
    	res.json(rows);
    });
});

module.exports = router;
