require('dotenv').config();
var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = process.env.DATABASE_URL;
var db = pgp(connectionString);

// add query functions

function getMostRecent(req, res, next) {
	db.any('SELECT * FROM threads1 WHERE catalogue_time = (SELECT MAX(catalogue_time) FROM threads1)')
	.then(function (data) {
		res.status(200)
		.json({
			status: 'success',
			data: data,
			message: 'Retrieved the most recent thread info'
		});
	})
	.catch(function (err) {
		return next(err);
	});
}

module.exports = {
  getMostRecent: getMostRecent,
};